# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Guía de instalación y uso](#3-guía-de-instalación-y-uso)
* [4. Test](#4-test)
* [5. Flujo de trabajo](#5-flujo-de-trabajo)
* [6. Checklist](#6-checklist)

***

## 1. PREÁMBULO

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de 
la información que se quiere compartir.

Es precisamente este problema lo que busca solucionar este proyecto, ya que se trata de una herramienta que lee y analiza archivos en formato `Markdown`, para verificar los links que 
contengan y reportar estadísticas.

![diagrama](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/MD%20LINKS4%20-%20PAOS.jpg)

## 2. RESUMEN DEL PROYECTO

Desarrollado en NodeJS y Javascript, este módulo es una biblioteca que se puede usar para recuperar todos los enlaces dentro de una ruta específica; permitiendo consultar el estado de todos 
los enlaces encontrados y enviar un resumen con las estadísticas encontradas en el análisis. 


## 3. GUÍA DE INSTALACIÓN Y USO

Puede utilizar esta biblioteca como aplicación CLI o como API.


### 1) JavaScript API


#### Instalación

Para utilizar la biblioteca como una API, siga estos pasos:

1. Clonar este repositorio
2. Abra su terminal y use el comando cd para ir a la carpeta donde desea guardar el proyecto.
3. Ejecute el siguiente comando: git clone https://github.com/PaosLuna/DEV007-md-links.git
4. Abra la carpeta en su software de edición de código.
5. Abre la terminal y podrás comenzar a usar la API.


#### Usabilidad

Deberás usar el siguiente comando en tu terminal: 

node cli.js path [options]

path: es la ruta al archivo o directorio que deseas analizar.
options: --validate, --stats o ambas.


##### `Solo path` 

Si se usa el siguiente comando: node cli.js path

Se mostrarán todos los enlaces que se encuentran en esa ruta.

![path](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/path.jpeg)

Si la ruta no es válida o no se encuentra ningún archivo .md, aparecerá un error.
![path-fail](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/path%20fail.jpeg)


##### `--validate`

Si se usa el siguiente comando: node cli.js path --validate

Se mostrarán todos los enlaces encontrados y comprobará si son válidos o no enviando un mensaje de ok/fail de acuerdo al caso.

![--validate](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/--validate.jpeg)


##### `--stats`

Si se usa el siguiente comando: node cli.js path --stats

Se mostrará un mensaje con el total de enlaces encontrados y cuantos de ellos son únicos.

![--stats](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/--stats.jpeg)


##### `--validate --stats` 

Si se usa el siguiente comando: node cli.js path --validate --stats

Se mostrará un mensaje diciendo la cantidad total de enlaces encontrados, cuántos de ellos son únicos y cuántos están rotos.

![--validate--stats](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/--validate%20--stats.jpeg)


### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

#### Instalación

Abre tu terminal y ejecuta el siguiente comando:

npm i md-links-paos-luna


#### Usabilidad

Una vez completada la instalación, ejecute el siguiente comando en su terminal:

npx md-links-paos-luna path [options]


##### `Solo path` 

Si se usa el siguiente comando: npx md-links-paos-luna path

Se mostrarán todos los enlaces que se encuentran en esa ruta.

![path](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/path.jpeg)

Si la ruta no es válida o no se encuentra ningún archivo .md, aparecerá un error.
![path-fail](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/path%20fail.jpeg)


##### `--validate`

Si se usa el siguiente comando: npx md-links-paos-luna path --validate

Se mostrarán todos los enlaces encontrados y comprobará si son válidos o no enviando un mensaje de ok/fail de acuerdo al caso.

![--validate](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/--validate.jpeg)


##### `--stats`

Si se usa el siguiente comando: npx md-links-paos-luna path --stats

Se mostrará un mensaje con el total de enlaces encontrados y cuantos de ellos son únicos.

![--stats](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/--stats.jpeg)


##### `--validate --stats` 

Si se usa el siguiente comando: npx md-links-paos-luna path --validate --stats

Se mostrará un mensaje diciendo la cantidad total de enlaces encontrados, cuántos de ellos son únicos y cuántos están rotos.

![--validate--stats](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/--validate%20--stats.jpeg)


## 4. TEST

Las 23 pruebas unitarias se ejecutaron usando Jest.

![test](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/test.jpeg)


## 5. FLUJO DE TRABAJO

El tiempo para desarrollar este proyecto fue de 3 strings, durante este tiempo la organización del proyecto se realizó en GitHub Projects.

![test](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/projects.jpeg)


## 6. CHECKLIST

### General

* [👍] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [👍] Un board con el backlog para la implementación de la librería.
* [👍] Documentación técnica de la librería.
* [👍] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [👍] El módulo exporta una función con la interfaz (API) esperada.
* [👍] Implementa soporte para archivo individual
* [👍] Implementa soporte para directorios
* [👍] Implementa `options.validate`

### CLI

* [👍] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [👍] Se ejecuta sin errores / output esperado
* [👍] Implementa `--validate`
* [👍] Implementa `--stats`

### Pruebas / tests

* [👍] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [👍] Pasa tests (y linters) (`npm test`).

![gracias](https://github.com/PaosLuna/DEV007-md-links/blob/7682740b4977280cb87fe9450d7c57e090e118c8/imagenes/gracias.jpg)
