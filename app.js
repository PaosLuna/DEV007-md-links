import { routeExists, routeAbsolute, readFile, fileOrDir, getMdExtension, getLinks, validateTrue, validateFalse } from "./index.js";
import chalk from 'chalk'

// eslint-disable-next-line no-undef
//const document = process.argv[2];

export const mdLinks = (document, options) => {
    return new Promise((resolve, reject) => {
        const isExists = routeExists(document);
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
            const links = getLinks(data)
            if(options.validate){
            const validatedLlinks = validateTrue(links);
            resolve(validatedLlinks)
            } 
            resolve(links)
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
