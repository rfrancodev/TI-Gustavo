const express = require('express');
const rotas = require('./routes');

const app = express()

rotas.use(express.json())


app.listen(3000, () => { console.log('Server running'); })
