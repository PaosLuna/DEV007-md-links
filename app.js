import { routeExists, routeAbsolute, readFile, fileOrDir, fileExtension } from "./index.js";
import chalk from 'chalk'

const document = process.argv[2];
const isExists = routeExists(document);

const mdLinks = () => {
if (isExists) {
    const absolute = routeAbsolute(document);
    console.log(chalk.bold.bgGreen(absolute));
    fileOrDir(document);
    readFile(document);
    fileExtension(document);
} else {
    console.error("ERROR");
}
};

mdLinks(document);