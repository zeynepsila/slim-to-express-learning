# Slim PHP to Express.js Transition – Learning Project

This repository documents my learning process while transitioning from Slim PHP (a micro PHP framework) to Node.js + Express.js for backend API development.

## 🎯 Goal

As a developer already experienced in Slim PHP, my aim was to adopt Express.js by comparing the concepts I'm familiar with in Slim and implementing their equivalents in Express.

## ✅ What I Learned

- ✅ **Routing System**  
  Reproduced `GET`, `POST`, `PUT`, `DELETE` routes in Express.  
  Compared Slim's `$app->get('/path')` to `app.get('/path')`.

- ✅ **Controller & Middleware Separation**  
  Separated route definitions and business logic using controllers.  
  Adopted Express's modular `require/export` structure instead of Slim's monolithic routing.

- ✅ **JWT Authentication**  
  Learned to use `jsonwebtoken` to create and verify tokens.  
  Compared it to Slim's `JWT::encode()` / `JWT::decode()` structure.

- ✅ **Request Body & Headers**  
  Used `req.body` and `req.headers['authorization']` in Express.  
  Compared to Slim's `getParsedBody()` and `getHeaderLine()` methods.

- ✅ **Modular Structure**  
  Organized the project into folders like `routes/`, `controllers/`, and `middleware/`.  
  Replaced Slim’s single-file logic with a clean, scalable architecture.

## 🛠 Technologies Used

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs

## 📁 Project Structure

```
project/
├── controllers/
│   └── notesController.js
│   └── usersController.js
├── routes/
│   └── notes.js
│   └── users.js
├── middleware/
│   └── authMiddleware.js
└── server.js
```

## 💡 Why This Project?

To move from PHP to JS-based backend development without losing architectural clarity. I wanted to mirror what I already know in Slim and apply it in the JS ecosystem.

## 📚 Note

This project is for learning purposes only. Data is stored in memory. MongoDB/MySQL support may be added in future versions.

---

A good reference for developers switching from Slim PHP to Express.js.

---

# Slim PHP'den Express.js'e Geçiş – Öğrenme Projesi

Bu proje, Slim PHP ile REST API geliştirmiş bir backend geliştirici olarak Node.js + Express.js'e geçiş sürecimi belgelemektedir.

## 🎯 Amaç

Slim PHP'deki alışık olduğum backend yapılarını Express.js'e birebir karşılaştırarak yeniden oluşturmak, yeni teknolojiyi özümseyerek kullanabilir hale gelmekti.

## ✅ Öğrendiklerim

- ✅ **Routing Sistemi**  
  `GET`, `POST`, `PUT`, `DELETE` route'larını Express’te yeniden oluşturdum  
  `$app->get('/path')` yapısını `app.get('/path')` ile kıyasladım

- ✅ **Controller-Middleware Ayrımı**  
  Route tanımı ile iş mantığını ayırdım  
  Monolitik Slim yapısından modüler Express yapısına geçtim

- ✅ **JWT ile Kimlik Doğrulama**  
  `jsonwebtoken` kullanarak token üretme/doğrulama işlemlerini öğrendim  
  Slim'deki `JWT::encode()` / `JWT::decode()` yapılarına denk gelen mantığı uyguladım

- ✅ **Request Body ve Header İşlemleri**  
  `req.body` ve `req.headers['authorization']` kullanımını öğrendim  
  Slim’deki `getParsedBody()` ve `getHeaderLine()` fonksiyonlarıyla karşılaştırdım

- ✅ **Modüler Yapı Kurma**  
  `routes/`, `controllers/`, `middleware/` klasörleriyle düzenli yapı kurdum  
  Slim’in tek dosyalı sisteminden, okunabilirliği yüksek yapıya geçtim

## 🛠 Kullanılan Teknolojiler

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs

## 📁 Proje Yapısı

```
project/
├── controllers/
│   └── notesController.js
│   └── usersController.js
├── routes/
│   └── notes.js
│   └── users.js
├── middleware/
│   └── authMiddleware.js
└── server.js
```

## 💡 Neden Bu Çalışma?

PHP'den JavaScript'e backend geçişi yaparken mantıksal alışkanlıklarımı kaybetmeden aynı yapıları JS ile üretmek istedim. Slim'de bildiğim her şeyi Express ile yeniden kurguladım.

## 📚 Not

Bu proje tamamen öğrenme amaçlıdır. Veriler bellekte tutulmaktadır. İlerleyen çalışmalarda MongoDB veya MySQL desteği eklenecektir.
