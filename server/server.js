const express = require('express');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const cors = require('cors');
const app = express();
const PORT = 8085;
// Разрешаем запросы с других доменов
app.use(cors());

// Обслуживание статических файлов фронтенда
app.use(express.static(path.join(__dirname, '..', 'build')));

// Обработка запроса к /api/csv для получения данных из CSV файла
app.get('/api/csv', (req, res) => {
  const filePath = path.join(__dirname, 'article_def_v_orig.csv');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).json({ error: 'Ошибка чтения файла' });
      return;
    }
    // Парсим csv данные
    const parsedData = Papa.parse(data, { header: true });
    // Преобразование и отправка в json
    res.json(parsedData.data);
  });
});

// Обработка всех остальных запросов - отдаем index.html фронтенда
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${PORT}`);
});