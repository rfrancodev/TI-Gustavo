const express = require('express')
const { leitorDados } = require('./controls/reader')


const rotas = express()


rotas.get('/', (req, res) => {
    res.json('Tudo Certo')
})

rotas.get('/leitor', leitorDados)

module.exports = rotas