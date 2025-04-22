// Bu dosya sadece "notlar" ile ilgili iş mantığını (logic) içerir.
// Her bir fonksiyon, bir HTTP endpoint'e (GET, POST, PUT, DELETE) karşılık gelir.
// Slim'de bu tarz logic genellikle route içine direkt yazılır veya Controller class'ı oluşturularak çağrılır.

let notes = [
    { id: 1, title: 'İlk Not', content: 'Bu benim ilk notum' }
  ];
  // Slim'de notlar genellikle veritabanından çekilir: SELECT * FROM notes
  
  // ========================
  //      GET /notes
  // ========================
  exports.getNotes = (req, res) => {
    res.json(notes); 
    // Slim karşılığı: return $response->withJson($notes);
  };
  
  // ========================
  //     POST /notes
  // ========================
  exports.addNote = (req, res) => {
    const { title, content } = req.body; 
    // Slim karşılığı: $data = $request->getParsedBody(); $title = $data['title'];
  
    if (!title || !content) {
      return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });
      // Slim karşılığı: return $response->withStatus(400)->withJson(['message' => 'Başlık ve içerik zorunludur']);
    }
  
    const newNote = {
      id: notes.length + 1, // Auto-increment taklidi
      title,
      content
    };
  
    notes.push(newNote); 
    // Slim'de: INSERT INTO notes (title, content) VALUES (?, ?);
  
    res.status(201).json(newNote); 
    // Slim'de: return $response->withJson($newNote, 201);
  };
  
  // ========================
  //     PUT /notes/:id
  // ========================
  exports.updateNote = (req, res) => {
    const noteId = parseInt(req.params.id); 
    // Slim karşılığı: $noteId = (int) $args['id'];
  
    const { title, content } = req.body;
    // Slim karşılığı: $data = $request->getParsedBody();
  
    const note = notes.find(n => n.id === noteId);
    // Slim'de: SELECT * FROM notes WHERE id = ?;
  
    if (!note) {
      return res.status(404).json({ message: 'Not bulunamadı.' });
      // Slim'de: return $response->withStatus(404)->withJson(['message' => 'Not bulunamadı']);
    }
  
    // Gelen veriye göre alanları güncelle
    if (title) note.title = title;
    if (content) note.content = content;
  
    res.json(note);
    // Slim'de: UPDATE notes SET title = ?, content = ? WHERE id = ?;
    // return $response->withJson($updatedNote);
  };
  
  // ========================
  //     DELETE /notes/:id
  // ========================
  exports.deleteNote = (req, res) => {
    const noteId = parseInt(req.params.id);
    // Slim karşılığı: $noteId = (int) $args['id'];
  
    const index = notes.findIndex(n => n.id === noteId);
    // Slim'de: SELECT COUNT(*) WHERE id = ?; yoksa 404
  
    if (index === -1) {
      return res.status(404).json({ message: 'Not bulunamadı.' });
      // Slim'de: return $response->withStatus(404)->withJson(['message' => 'Not bulunamadı']);
    }
  
    notes.splice(index, 1); 
    // Slim'de: DELETE FROM notes WHERE id = ?;
  
    res.json({ message: 'Not silindi.' }); 
    // Slim'de: return $response->withJson(['message' => 'Not silindi']);
  };
  