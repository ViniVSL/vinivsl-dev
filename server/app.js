require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const publicPath = path.join(__dirname, '..', 'public');

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(express.static(publicPath));

app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 SERVIDOR VINICIUS.DEV ATIVO`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
    console.log(`📂 Pasta Pública: ${publicPath}`);
    console.log(`==========================================\n`);
});