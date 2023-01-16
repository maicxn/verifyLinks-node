import fs from 'fs';
import chalk from "chalk";


function HandleError(erro){
    throw new Error(chalk.red(erro.code, 'erro ao buscar arquivo.'))
}

// PROMISES WITH THEN()
// function GetArchive(pathArchive) {
//     const encoding = 'utf-8'
//     fs.promises
//         .readFile(pathArchive, encoding)
//         .then(text => console.log((chalk.green(text))))
//         .catch(HandleError)

// }

function GetLink(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const matchs = [...text.matchAll(regex)]
    const result = matchs.map(match => ({[match[1]]: match[2]}))
    return result.length !== 0 ? result : "Não há links no arquivo."
}

async function GetArchive(pathArchive) {
    try {
        const encoding = 'utf-8'
        const text = await fs.promises.readFile(pathArchive, encoding)
        return (GetLink(text))
    } catch (erro) {
        HandleError(erro)
    }
}

export default GetArchive;


