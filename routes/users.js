const express = require('express');
const router = express.Router(); 
// Slim'de: Tüm route'lar doğrudan $app nesnesiyle tanımlanır.
// Örnek: $app->post('/users/register', function ($request, $response) {...});

// Bu yapı Express'te modüler route dosyaları oluşturmak için kullanılır.
// Her route grubu (users, notes vs.) kendi dosyasında yazılır.

const usersController = require('../controllers/usersController'); 
// Slim'de genelde controller fonksiyonları ya route içinde olur ya da ayrıca include edilir.
// Örnek: require_once('../Controllers/UserController.php');

// ========== ROTALAR ==========

router.post('/register', usersController.register);
// Slim karşılığı:
// $app->post('/users/register', function ($request, $response) {
//     return UserController::register($request, $response);
// });

// Burada POST /users/register endpoint'i tanımlanıyor.
// Gelen istek doğrudan register fonksiyonuna yönlendiriliyor.

router.post('/login', usersController.login);
// Slim karşılığı:
// $app->post('/users/login', function ($request, $response) {
//     return UserController::login($request, $response);
// });

// POST /users/login endpoint’i tanımlanır. Login işlemini ilgili fonksiyon yönetir.

module.exports = router;
// Slim'de export/import yapısı yoktur. Bu satır Express’in modüler sistemine özgüdür.
// Bu dosya, server.js içinde şöyle kullanılır: 
// const usersRoutes = require('./routes/users');
// app.use('/users', usersRoutes);
