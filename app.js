import { routeExists, routeAbsolute, readFile, fileOrDir, getMdExtension, getLinks } from "./index.js";
import chalk from 'chalk'

// eslint-disable-next-line no-undef
const document = process.argv[2];
const isExists = routeExists(document);

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
            getLinks(data);
            console.table(getLinks(data));
        })
        .catch((error) => {
            reject(error); 
            console.log(chalk.bold.bgRed("ERROR de lecturaaaa"));
        });
    } else {
        console.warn(chalk.bold.bgRed("El archivo no fue encontrado"));
    }
    });
};

mdLinks(document);