import { routeExists, routeAbsolute, readFile, fileOrDir, getMdExtension, getLinks, validateTrue, validateFalse } from "./index.js";
import chalk from 'chalk'

// eslint-disable-next-line no-undef
const document = process.argv[2];
const isExists = routeExists(document);
// eslint-disable-next-line no-undef
const isOptionValidate = process.argv.includes('--validate');
// eslint-disable-next-line no-undef
const isOptionStats = process.argv.includes('--stats');


const mdLinks = () => {
    return new Promise((resolve, reject) => {
        console.log("¿Existe la ruta?", isExists);
    if (isExists) {
        console.log(chalk.bold.bgGreen("El archivo fue encontrado"));
        const absolute = routeAbsolute(document);
        console.log(chalk.bold.bgYellow(absolute), 14);
        const archivos = fileOrDir(document);
        console.log(archivos, 16);
        const filesMd = getMdExtension(archivos);
        console.log(filesMd, 18);
        readFile(filesMd)
        .then((data) => {
            console.log(data, 21);
            resolve(data); 
            const links = getLinks(data)
            console.table(links);
            if(isOptionValidate && !isOptionStats){
                validateTrue(links);
                console.log('Stats: ', isOptionStats)
                console.log('Validate: ', isOptionValidate)
            } 
            if (isOptionValidate && isOptionStats){
                console.log('ejecuta validate y states');
                console.log('Stats: ', isOptionStats)
                console.log('Validate: ', isOptionValidate)
                validateTrue(links);                
            }
            if (isOptionStats && !isOptionValidate){
                console.log('ejecuta states');
                console.log('Stats: ', isOptionStats)
                console.log('Validate: ', isOptionValidate)
                validateFalse(links);
            } 
        })
        .catch((error) => {
            reject(error); 
            console.log(chalk.bold.bgRed("ERROR de lecturaaaa", 55));
        });
    } else {
        console.warn(chalk.bold.bgRed("El archivo no fue encontrado"));
    }
    });
};

mdLinks(document);
