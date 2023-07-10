import { routeExists, routeAbsolute, readFile, fileOrDir, getMdExtension, getLinks } from "./index.js";
import chalk from 'chalk'

// eslint-disable-next-line no-undef
const document = process.argv[2];
const isExists = routeExists(document);

const mdLinks = () => {
    return new Promise((resolve, reject) => {
        // console.log("isExists:", isExists);
    if (isExists) {
        const absolute = routeAbsolute(document);
        console.log(chalk.bold.bgGreen(absolute));
        const archivos = fileOrDir(document);
        // console.log(archivos, 12);
        const filesMd = getMdExtension(archivos);
        // console.log(filesMd, 15);
        readFile(filesMd)
        // console.log(readFile(filesMd), 34)
        .then((data) => {
            console.log(data, '***');
            console.log("documento leído");
            resolve(data); // Resuelve la promesa
            getLinks(data);
        })
        .catch((error) => {
            reject(error); // Rechaza la promesa
            console.log("ERROR de lectura")
        });
    } else {
        // reject(new Error("ERROR"));
        console.log("ERROR2")
    }
    });
};

mdLinks(document);