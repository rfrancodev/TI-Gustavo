const express = require('express');
const rotas = require('./routes');

const app = express()
app.use(express.json())

app.use(rotas)


const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ${port}`);
});