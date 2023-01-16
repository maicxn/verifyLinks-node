import chalk from 'chalk'
import fs from 'fs'
import GetArchive from './index.js'
import ValidationLinks from './valida.js'

const path = process.argv

async function ArchiveProcess(argument) {
    const path = argument[2]
    const valida = argument[3] === '--valida'
    
  async  function ListPrint(valida, result, id = '') {
        if(valida) {
            console.log(chalk.yellow('VALIDATED LINKS'),
            chalk.black.bgGreen(id),
           await ValidationLinks(result));
        } else  {
            console.log(chalk.yellow('LIST OF LINKS'),
            chalk.black.bgGreen(id),
             result);
        }
    }
    
    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou Diretório não existe.'));
            return;
        }
    }
    
    if (fs.lstatSync(path).isFile()) {
        const result = await GetArchive(argument[2])
        ListPrint(valida, result, id)
    } else if (fs.lstatSync(path).isDirectory()) {
        const archive = await fs.promises.readdir(path)
        console.log(archive)
        archive.forEach(async (archiveName) => {
            const list = await GetArchive(`${path}/${archiveName}`)
            ListPrint(valida, list, archiveName)
        })
    }

}
ArchiveProcess(path)
