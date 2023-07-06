import fs, { Stats, stat } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { error } from 'console';

// VERIFICA SI LA RUTA EXISTE
export function routeExists(route){ 
  if(fs.existsSync(route)){
    console.log(chalk.bold.bgGreen('El archivo fue encontrado'));
    return true;
  } else {
    console.warn(chalk.bold.red("El archivo no fue encontrado"))
    return false;
  }
}

// VERIFICA SI LA RUTA ES ABSOLUTA
export function routeAbsolute(route){
  if (path.isAbsolute(route)) {
    return route;
  } else {
    return path.resolve(route);
  }
}

// VERIFICAR SI ES UN DIRECTORIO O ARCHIVO
export function fileOrDir(file) {
fs.stat(file, (error, Stats) => {
  if (Stats.isFile()) {
    console.log('Es un archivo')
  } else if (Stats.isDirectory()) {
    console.log('Es un directorio')
    fs.promises.readdir(file, 'utf-8')
    .then(files => {
      console.log(typeof files)
      files.forEach((file) => {
        console.log(`Los archivos del directorio son: ${file}`);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }  
});
}

// LEE UN ARCHIVO
export function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// CONOCER LA EXTENSIÓN DE UN ARCHIVO
export function fileExtension(file){
  const extension = path.extname(file)
  console.log(extension);
}