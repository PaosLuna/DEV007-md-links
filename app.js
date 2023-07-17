import { routeExists, routeAbsolute, readFile, fileOrDir, getMdExtension, getLinks, validateTrue, peticionHTTP, getStats } from "./index.js";
import chalk from 'chalk'

export const mdLinks = (document, options) => {
    return new Promise((resolve, reject) => {
        const isExists = routeExists(document);
    if (isExists) {
        const absolute = routeAbsolute(document);
        console.log(chalk.bold.bgYellow(absolute), 14);
        const archivos = fileOrDir(document);
        const filesMd = getMdExtension(archivos);
        readFile(filesMd)
        .then((data) => {
            const links = getLinks(data);
            const objsLinks = validateTrue(links);
    if (options.validate && options.stats) {
    peticionHTTP(objsLinks).then((validatedLinks) => {
        getStats(validatedLinks, options.validate).then((res) => resolve(res));
    });
    }else if(options.validate){
    peticionHTTP(objsLinks).then((res) => resolve(res));
    }else if(options.stats) {
        getStats(objsLinks, options.validate).then((res) => resolve(res));
    }else{
    resolve(objsLinks)
    }
})
.catch((err) => {
    reject(err);
});
} else {
console.log(chalk.bold.red('La ruta ingresada no existe'))
}
});
};