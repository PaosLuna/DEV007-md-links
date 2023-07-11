import fs from "fs";
import path from "path";

// VERIFICA SI LA RUTA EXISTE
export function routeExists(route) {
  if (fs.existsSync(route)) {
    return true;
  } else {
    return false;
  }
}

// VERIFICA SI LA RUTA ES ABSOLUTA
export const routeAbsolute = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  } else {
    return path.resolve(route);
  }
}

// VERIFICAR SI ES UN DIRECTORIO O ARCHIVO
export function fileOrDir(route) {
  let arrayFiles = []
  const stats = fs.statSync(route);
  if (stats.isFile()) {
    arrayFiles.push(route);
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(route, "utf-8");
    files.forEach((file) => {
      const newRoute = path.join(route, file);
      const statsNew = fs.statSync(newRoute);
      if (statsNew.isFile()) {
        arrayFiles.push(newRoute);
      } else if (statsNew.isDirectory()) {
        arrayFiles = arrayFiles.concat(fileOrDir(newRoute));
      }
    });
  }
  return arrayFiles
}

// FILTRAR SOLO LOS DE EXTENSIÓN MD
export function getMdExtension(arrayFiles) {
  const filesMd = arrayFiles.filter(file => path.extname(file) === '.md');
  return filesMd
}

// LEE UN ARCHIVO
export function readFile(filesMd) {
  const filesContent = [];
  filesMd.forEach((file) => {
    filesContent.push(
      new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      })
    );
  });
  return Promise.all(filesContent);
}

// VERIFICAR SI TIENEN LINKS 
export function getLinks(array){
const links = []
array.forEach((link)=>{
  let ruta = path.resolve()
  if(link.match(/[^!]\[.+?\]\(.+?\)/g)){
    let linkMatch = link.match(/[^!]\[.+?\]\(.+?\)/g)
    links.push({
      href: linkMatch[0].match(/https*?:([^"')\s]+)/)[0],
      text: linkMatch[0].match(/\[(.*)\]/)[1],
      file: ruta,
      ok: 'ok', 
      HTTP: 'validate'
    })
  }
})
//console.table(links);
return links;
}


/*function validate() {
  return true;
}*/