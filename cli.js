import {mdLinks} from './app.js'
import chalk from 'chalk';

// eslint-disable-next-line no-undef
const document = process.argv[2];
// eslint-disable-next-line no-undef
const isOptionValidate = process.argv.includes('--validate');
// eslint-disable-next-line no-undef
const isOptionStats = process.argv.includes('--stats');

const options = {
    validate: isOptionValidate,
    stats: isOptionStats,
}

mdLinks(document, options)
.then((links)=>{
    if (options.validate && options.stats) {
        console.log(chalk.bold.blue('Total: ' + links.total))
        console.log(chalk.bold.blue('Unique: ' + links.unique))
        console.log(chalk.bold.green('Working: ' + links.working))
        console.log(chalk.bold.red('Broken: ' + links.broken))
    }else if(options.validate){
        links.forEach(link => {
            const linkObject = {
                href: link.href,
                text: link.text,
                file: link.file,
                status: link.status,
                mensaje: link.mensaje
            }
            console.log(linkObject);
        });
    }else if(options.stats) {
        console.log(chalk.bold.green('Total: ' + links.total))
        console.log(chalk.bold.green('Unique: ' + links.unique))
    }else{
        links.forEach(link => {
            const linkObject = {
                href: link.href,
                text: link.text,
                file: link.file,
            }
            console.log(linkObject);
        });
    }
})
.catch((err)=>{
console.log(err)
})