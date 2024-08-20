const express = require('express');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const cors = require('cors');

const app = express();
const PORT = 3003;

// Разрешаем запросы с других доменов
app.use(cors());

// Отправка простого сообщения при запросе к корню
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Обработка запроса к /api/csv для получения данных из CSV файла
app.get('/api/csv', (req, res) => {
  const filePath = path.join(__dirname, 'article_def_v_orig.csv');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read the file:', err);
      res.status(500).json({ error: 'Failed to read the file' });
      return;
    }

    // Парсим csv данные
    const parsedData = Papa.parse(data, { header: true });

    // Преобразование и отправка в json
    res.json(parsedData.data);
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
