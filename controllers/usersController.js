const jwt = require('jsonwebtoken');        // Slim'de: use \Firebase\JWT\JWT;
const bcrypt = require('bcryptjs');         // Slim'de: password_hash(), password_verify()

let users = []; // Geçici kullanıcı listesi  // Slim'de veriler genellikle veritabanından çekilir

const SECRET_KEY = 'gizli_anahtar'; // Gerçek projede .env dosyasından alınmalı (Slim'de de .env kullanılır)

// ============ KAYIT ==============
exports.register = (req, res) => {
  const { username, password } = req.body; // Slim'de: $data = $request->getParsedBody();

  if (!username || !password)
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre gerekli.' });
    // Slim'de: return $response->withStatus(400)->withJson([...]);

  const userExists = users.find(u => u.username === username);
  if (userExists)
    return res.status(409).json({ message: 'Kullanıcı zaten var.' });
    // Slim'de: kullanıcıyı SELECT ile kontrol eder, varsa 409 döner

  const hashedPassword = bcrypt.hashSync(password, 8);
  // Slim'de: $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser); // Slim'de: INSERT INTO users (...) VALUES (...)

  res.status(201).json({ message: 'Kayıt başarılı.' });
  // Slim'de: return $response->withJson(["message" => "Kayıt başarılı"], 201);
};

// ============ GİRİŞ ==============
exports.login = (req, res) => {
  const { username, password } = req.body; // Slim'de: $data = $request->getParsedBody();

  const user = users.find(u => u.username === username);
  if (!user)
    return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    // Slim'de: if (!$user) return $response->withStatus(404)->withJson(...)

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  // Slim'de: if (!password_verify($password, $user['password']))

  if (!isPasswordValid)
    return res.status(401).json({ message: 'Şifre yanlış.' });
    // Slim'de: return $response->withStatus(401)->withJson(...)

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  // Slim'de: $token = JWT::encode(["id" => $user['id']], $secretKey);

  res.json({ message: 'Giriş başarılı', token });
  // Slim'de: return $response->withJson(["message" => "Giriş başarılı", "token" => $token]);
};
