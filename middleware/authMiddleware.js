const jwt = require('jsonwebtoken'); 
// Slim'de: use \Firebase\JWT\JWT;

const SECRET_KEY = 'gizli_anahtar';
// Slim'de bu genelde bir config dosyasından veya .env'den alınır: $secret = $_ENV['JWT_SECRET'];

// Express'te bir middleware fonksiyonu export ediyoruz
// Slim'de middleware'ler genelde sınıf şeklinde yazılır ve `$app->add()` ile eklenir

module.exports = function (req, res, next) {
  // Bu fonksiyon her istek geldiğinde çalışır. 
  // Slim'de karşılığı: public function __invoke($request, $handler) { ... }

  const authHeader = req.headers['authorization'];
  // Slim'de: $request->getHeaderLine('Authorization');

  if (!authHeader) 
    return res.status(401).json({ message: 'Token gerekli.' });
    // Slim karşılığı:
    // return $response->withStatus(401)->withJson(['message' => 'Token gerekli']);

  const token = authHeader.split(' ')[1];
  // Header şu formatta gelmeli: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..."
  // split(' ')[1] → "Bearer" kelimesini atlayıp token kısmını alıyoruz

  if (!token) 
    return res.status(401).json({ message: 'Token bulunamadı.' });
    // Slim karşılığı yine 401: Token eksikse istek reddedilir

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) 
      return res.status(403).json({ message: 'Token geçersiz.' });
      // Slim'de:
      // try { JWT::decode($token, $secret, ['HS256']); } catch (...) { return 403; }

    req.user = user;
    // Token geçerliyse çözümlenmiş kullanıcı bilgisi req.user içine yazılır
    // Slim'de bu genelde `$request = $request->withAttribute('user', $decodedUser);` ile yapılır

    next();
    // Express’te bu middleware başarılıysa bir sonraki işlem (route) çalışsın demek
    // Slim'de return $handler->handle($request); ile devam edilir
  });
};
