// Express içinde router sistemi kullanıyoruz.
// Slim’de bu yoktu, tüm route’lar genellikle index.php ya da ana controller dosyasındaydı.
// Slim'de örnek: $app->get('/notes', function (...) {...});

const express = require('express');
const router = express.Router();
// Express'in route gruplama sistemi; Slim'de bu doğrudan $app ile yapılır.

const notesController = require('../controllers/notesController');
// Slim'de bu genellikle require_once('Controllers/NotesController.php') şeklinde olur.
// İş mantığı bu dosyada tanımlıdır.

const authMiddleware = require('../middleware/authMiddleware');
// Korumalı endpoint'lerde kullanılacak JWT doğrulayıcı middleware.
// Slim'de bu middleware'ler genellikle $app->add(...) veya route bazlı middleware ile uygulanır.


// ========================
//        ROUTE TANIMLARI
// ========================

// GET /notes → Tüm notları getir (korumalı)
// Slim karşılığı:
// $app->get('/notes', function ($request, $response) {
//     authKontrol(); // middleware mantığı
//     return NotesController::getNotes();
// });
router.get('/', authMiddleware, notesController.getNotes);
// authMiddleware token’ı doğrular, sonra controller fonksiyonu çalışır

// POST /notes → Yeni not ekle
// Slim karşılığı:
// $app->post('/notes', function ($request, $response) {
//     return NotesController::addNote();
// });
router.post('/', notesController.addNote);

// PUT /notes/:id → Notu güncelle
// Slim karşılığı:
// $app->put('/notes/{id}', function ($request, $response, $args) {
//     $id = $args['id'];
//     return NotesController::updateNote($id);
// });
router.put('/:id', notesController.updateNote);

// DELETE /notes/:id → Notu sil
// Slim karşılığı:
// $app->delete('/notes/{id}', function ($request, $response, $args) {
//     return NotesController::deleteNote($args['id']);
// });
router.delete('/:id', notesController.deleteNote);

// Not: Express'te route parametreleri :id ile, Slim'de {id} ile tanımlanır.


// ========================
//       AÇIKLAMA
// ========================
// Bu dosya sadece route tanımlarını içerir.
// Logic kısmı controllers/notesController.js dosyasına paslanır.
// Slim'de genellikle logic doğrudan route içine yazılır.
// Bu yapı, kodun daha okunabilir ve sürdürülebilir olmasını sağlar.

module.exports = router;
// Bu dosyayı dışa aktarıyoruz.
// Slim'de buna karşılık yok, çünkü PHP'de tüm dosyalar require/include ile içeri alınır.
