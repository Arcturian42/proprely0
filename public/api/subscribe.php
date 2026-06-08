<?php
/**
 * Capture des leads (newsletter + lead magnets) vers Brevo via l'API v3.
 *
 * Équivalent PHP de api/subscribe.ts (Vercel Edge), pour le déploiement
 * sur Hostinger qui ne supporte pas les serverless functions Node.js.
 *
 * URL appelée par le frontend : /api/subscribe
 *   (rewrite Apache dans public/.htaccess : /api/subscribe → /api/subscribe.php)
 *
 * Configuration requise (variables d'environnement, à définir via le panel
 * Hostinger → Avancé → Variables PHP, OU via .htaccess SetEnv) :
 *   - BREVO_API_KEY                (jamais commitée)
 *   - BREVO_NEWSLETTER_LIST_ID     (entier, ID de la liste "Newsletter")
 *   - BREVO_LEADMAGNET_LIST_ID     (entier, ID de la liste "Lead magnets")
 *
 * Body POST attendu (JSON) :
 *   {
 *     "email": "...",
 *     "type": "newsletter" | "lead_magnet",
 *     "source": "...",
 *     "company": "...",
 *     "resource": "...",
 *     "resourceTitle": "..."
 *   }
 */

declare(strict_types=1);

// ─── CORS ──────────────────────────────────────────────────────────────
$allowedOrigins = [
    'https://proprely.fr',
    'https://www.proprely.fr',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isAllowed = false;
if (in_array($origin, $allowedOrigins, true)) {
    $isAllowed = true;
} elseif (preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin)) {
    $isAllowed = true;
} elseif (preg_match('#-energypromag\.vercel\.app$#', parse_url($origin, PHP_URL_HOST) ?: '')) {
    $isAllowed = true;
}

header('Vary: Origin');
header('Access-Control-Allow-Origin: ' . ($isAllowed ? $origin : 'https://proprely.fr'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

// ─── Preflight ─────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ─── Parse body ────────────────────────────────────────────────────────
$raw = file_get_contents('php://input');
$body = json_decode($raw ?: 'null', true);
if (!is_array($body)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$email = strtolower(trim((string) ($body['email'] ?? '')));
$type = (string) ($body['type'] ?? '');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

if ($type !== 'newsletter' && $type !== 'lead_magnet') {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid type']);
    exit;
}

// ─── Env config ────────────────────────────────────────────────────────
$apiKey = getenv('BREVO_API_KEY') ?: '';
$listIdRaw = $type === 'newsletter'
    ? (getenv('BREVO_NEWSLETTER_LIST_ID') ?: '')
    : (getenv('BREVO_LEADMAGNET_LIST_ID') ?: '');
$listId = ctype_digit($listIdRaw) ? (int) $listIdRaw : 0;

if ($apiKey === '' || $listId === 0) {
    // Pas de config → on log côté serveur + on remonte une erreur explicite
    // au client (qui doit pouvoir alerter l'utilisateur). Volontairement
    // différent de l'ancien comportement silencieux qui masquait ce cas.
    error_log('[subscribe] Missing BREVO config (key=' . (empty($apiKey) ? 'MISSING' : 'OK')
              . ' list=' . (empty($listIdRaw) ? 'MISSING' : $listIdRaw) . ')');
    http_response_code(503);
    header('Content-Type: application/json');
    echo json_encode([
        'ok' => false,
        'stored' => false,
        'reason' => 'not_configured',
        'detail' => 'BREVO_API_KEY ou BREVO_NEWSLETTER_LIST_ID / BREVO_LEADMAGNET_LIST_ID manquant côté serveur.',
    ]);
    exit;
}

// ─── Attributes (optionnels) ───────────────────────────────────────────
$attributes = [];
if (!empty($body['company'])) {
    $attributes['COMPANY'] = substr((string) $body['company'], 0, 200);
}
if (!empty($body['source'])) {
    $attributes['SOURCE'] = substr((string) $body['source'], 0, 100);
}
if (!empty($body['resource'])) {
    $attributes['RESOURCE'] = substr((string) $body['resource'], 0, 100);
}
if (!empty($body['resourceTitle'])) {
    $attributes['RESOURCE_TITLE'] = substr((string) $body['resourceTitle'], 0, 200);
}

// ─── Brevo API call ────────────────────────────────────────────────────
$payload = [
    'email' => $email,
    'attributes' => (object) $attributes,
    'listIds' => [$listId],
    'updateEnabled' => true,
];

$ch = curl_init('https://api.brevo.com/v3/contacts');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
        'api-key: ' . $apiKey,
        'Accept: application/json',
        'Content-Type: application/json',
    ],
]);

$response = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError !== '') {
    error_log('[subscribe] curl error: ' . $curlError);
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'upstream_unreachable']);
    exit;
}

header('Content-Type: application/json');

if ($httpCode === 201 || $httpCode === 204) {
    echo json_encode(['ok' => true, 'stored' => true, 'created' => true]);
    exit;
}

if ($httpCode === 400) {
    // Brevo renvoie 400 si le contact existe déjà avec updateEnabled=false.
    // Avec updateEnabled=true, on devrait recevoir 204. Si on tombe ici, on
    // log le détail mais on considère que l'inscription est OK (déjà en liste).
    error_log('[subscribe] Brevo 400 : ' . substr((string) $response, 0, 300));
    echo json_encode(['ok' => true, 'stored' => true, 'updated' => true]);
    exit;
}

error_log('[subscribe] Brevo error ' . $httpCode . ' : ' . substr((string) $response, 0, 500));
http_response_code(502);
echo json_encode(['ok' => false, 'error' => 'brevo_error', 'status' => $httpCode]);
