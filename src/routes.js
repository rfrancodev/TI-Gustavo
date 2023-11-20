const express = require('express')
const { leitorDados } = require('./controls/reader')

const rotas = express()

rotas.get('/', leitorDados)

module.exports = rotas