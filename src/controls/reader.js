const fs = require("fs")
const csv = require("csv-parser")
const xlsx = require('xlsx')


const pastaUsuariosBloqueados = "./ARQUIVOS-SERVIDOR/usuarios-BLOQUEADOS/"

// LER O ARQUIVO CSV
function lerArquivoCsv(caminhoArquivo) {
    return new Promise((resolve, reject) => {
        const resultados = []

        fs.createReadStream(caminhoArquivo)
            .pipe(csv())
            .on("data", (data) => resultados.push(data))
            .on("end", () => resolve(resultados))
            .on("error", (error) => reject(error))
    })
}

// CRIAR EXCEL
function escreverExcel(dados) {
    const ws = xlsx.utils.json_to_sheet(dados, { header: ["nome", "email", "setor"], skipHeader: true })

    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, "Controle_Usuarios_Bloqueados")
    xlsx.writeFile(wb, "Controle_Usuarios_Bloqueados.xlsx")
}


async function lerTabelasUsuarios() {
    const informacoesUsuarios = []

    // LER ARQUIVOS
    const arquivos = fs.readdirSync(pastaUsuariosBloqueados)

    for (const arquivo of arquivos) {
        if (arquivo.endsWith(".csv")) {
            const setor = arquivo.replace("usuarios_de_", "").replace(".csv", "")
            const caminhoArquivo = pastaUsuariosBloqueados + arquivo
            const informacoes = await lerArquivoCsv(caminhoArquivo)

            informacoes.shift()

            informacoes.forEach(info => {
                delete info.name;
                delete info.UserPrincipalName;
                info.setor = setor
            })

            informacoesUsuarios.push(...informacoes)
        }
    }
    escreverExcel(informacoesUsuarios)
}

lerTabelasUsuarios().then(() => {
    console.log("'Arquivo Excel criado com sucesso: Controle_Usuarios_Bloqueados.xlsx'");

}).catch((error) => {
    console.error("Ocorreu um erro", error)
})



const leitorDados = async (req, res) => {

    return res.send('No ar')
}

module.exports = {
    leitorDados
}