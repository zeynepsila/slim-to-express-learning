// Uygulamanın Giriş Noktası

const express = require('express'); 
// Slim'de: use Slim\App; → $app = new App();

const app = express(); 
// Slim'deki: $app = new \Slim\App();

const PORT = 3000;
// Slim'de genelde `php -S localhost:3000` komutu ile port belirlenir.


// ===========================
//         MIDDLEWARE
// ===========================

app.use(express.json());
// Slim'de: $request->getParsedBody();
// Express'te gelen JSON veriyi req.body ile alabilmek için bu middleware gereklidir.


// ===========================
//           ROUTES
// ===========================

const notesRoutes = require('./routes/notes');
const usersRoutes = require('./routes/users');

// Slim'de: tüm route tanımları ya doğrudan bu dosyada yapılır
// ya da `require 'routes/notes.php';` gibi dosya içeri aktarılır

app.use('/notes', notesRoutes);
// Slim karşılığı: $app->group('/notes', function() { ... });

app.use('/users', usersRoutes);
// Slim karşılığı: $app->group('/users', function() { ... });


// ===========================
//         GİRİŞ ENDPOINT
// ===========================

app.get('/', (req, res) => {
  res.send('API is running...');
});
// Slim karşılığı: 
// $app->get('/', function ($request, $response) {
//     return $response->write('API is running...');
// });


// ===========================
//        SUNUCUYU BAŞLAT
// ===========================

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// Slim'de sunucu terminalden `php -S localhost:3000` komutu ile başlatılır.
// Express'te ise node ile başlatılır: `node server.js`
