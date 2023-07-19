import { 
  routeExists, 
  routeAbsolute, 
  readFile, 
  fileOrDir, 
  getMdExtension, 
  getLinks, 
  validateTrue, 
  peticionHTTP, 
  getStats
} from "../index.js";
import path from 'path';

describe('routeExists', () => {
  it('deberia ser una funcion', () => {
    expect(typeof routeExists).toBe('function');
  });
  it('deberia retornar true si la ruta existe', async() => {
    expect(routeExists('files')).toBe(true)
  })
  it('deberia retornar false si la ruta no existe', async() => {
    expect(routeExists('./test/prueb/archivo1.md')).toBe(false)
  })
});


describe('routeAbsolute', () => {
  it('retorna la ruta absoluta', async() => {
    const absoluta = path.resolve('files\pruebaTres.md')
    expect(routeAbsolute('files\pruebaTres.md')).toEqual(absoluta)
  });
  it('retorna la misma ruta si ya es absoluta',async() => {
    const archivo = '/Users/lunap/OneDrive/Escritorio/Proyectos Laboratoria/DEV007-md-links/files/pruebaTres.md'
    expect(routeAbsolute(archivo)).toEqual(archivo)
  });
});

describe('readFile', () => {
  const filesMd = [ 'files\\pruebaTres.md' ]
  it('Es una función', () => {
    expect(typeof readFile).toBe('function');
  });
  it('Retorna el cotenido de los archivos', async () => {
    const arrayFiles = ['files\\pruebaTres.md'];
    const expectedResults = [
      "Archivo de prueba FALSE [Markdown](https://es.wikipedia.org/wiki/Markdown)",
    ];
    const actualResults = await readFile(arrayFiles);
    expect(actualResults).toEqual(expectedResults);
  });
  it('Retorna error porque no hay contenido', async () => {
    const arrayFiles = ['files\\pruebaDos.md']; 
    const expectedResults = [
      "",
    ];
    const actualResults = await readFile(arrayFiles);
    expect(actualResults).toEqual(expectedResults);
  });
});

describe('fileOrDir', () => {
  it('Es una función', () => {
    expect(typeof fileOrDir).toBe('function');
  });
  it('deberia decir true si es un archivo', async () => {
    const archivo = 'files\\pruebaTres.md'
    const result = fileOrDir(archivo)
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe(archivo);
  })
})

describe('getMdExtension', () => {
  it('Es una función', () => {
    expect(typeof getMdExtension).toBe('function');
  });
  it ('Es un archivo MD', () => {
    const arrayFiles = ['files\pruebaTres.md', 'files\pruebaTres.js']
    const result = getMdExtension(arrayFiles)
    expect(result).toEqual(["filespruebaTres.md"])
  })
  it ('Retorna un array vacio porque no hay archivos .md', () => {
    const arrayFiles = ['files\pruebaTres.ms', 'files\pruebaTres.js']
    const result = getMdExtension(arrayFiles)
    expect(result).toEqual([])
  })
});

describe('getLinks', () => {
  it('Es una función', () => {
    expect(typeof getLinks).toBe('function');
  });
  it("retorna un array con los links de un archivo", async () => {
    const archivos = [
      'hola, soy una prueba\n' +
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)\n'    
    ];
    const result = [
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
      ];
    expect(getLinks(archivos)).toStrictEqual(result);
  });
});


describe('validateTrue', () => {
  it('Es una función', () => {
    expect(typeof validateTrue).toBe('function');
  });
  it('deberia retorna un array con los links validados', async() => {
    const archivos = [
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
    ]
    const result = [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: 'Markdown',
        file: "C:\\Users\\lunap\\OneDrive\\Escritorio\\Proyectos Laboratoria\\DEV007-md-links"
      },  
    ]
    expect(validateTrue(archivos)).toStrictEqual(result)
  })
});

describe('peticionHTTP', () => {
  it('Es una función', () => {
    expect(typeof peticionHTTP).toBe('function');
  });
  it("Debe retornar una promesa con un array de objetos", async () => {
    const url = [
      { href: "https://www.google.com" },
      ]
    const results = await peticionHTTP(url).then(result => result);
    expect(results).toEqual([
      {
        href: "https://www.google.com",
        status: 200,
        mensaje: "OK",
      }
    ]);
  });
  it("Debería arrojar error", async () => {
    const url = [
      { href: "https://www.google.com" },
      { href: "https://www.example.com/404" },
    ];
    const results = await peticionHTTP(url);
    expect(results[0].status).toBe(200);
    expect(results[0].mensaje).toBe("OK");
    expect(results[1].status).toBe(404);
    expect(results[1].mensaje).toBe("Fail");
  });
});


describe('getStats', () => {
  it('Es una función', () => {
    expect(typeof getStats).toBe('function');
  });
  it('debe devolver estadísticas correctas sin validación', async () => {
    const arrObjs = [
      { href: 'https://example.com/page1', mensaje: 'OK' },
      { href: 'https://example.com/page2', mensaje: 'OK' },
      { href: 'https://example.com/page3', mensaje: 'OK' },
    ];
    const isOptionValidate = false;
    const expectedStats = {
      total: 3,
      unique: 3,
    };
    const actualStats = await getStats(arrObjs, isOptionValidate);
    expect(actualStats).toEqual(expectedStats);
  });
  it('debe devolver estadísticas correctas con validación', async () => {
    const arrObjs = [
      { href: 'https://example.com/page1', mensaje: 'OK' },
      { href: 'https://example.com/page2', mensaje: 'Fail' },
      { href: 'https://example.com/page3', mensaje: 'OK' },
      { href: 'https://example.com/page4', mensaje: 'OK' },
    ];
    const isOptionValidate = true;
    const expectedStats = {
      total: 4,
      unique: 4,
      working: 3,
      broken: 1,
    };
    const actualStats = await getStats(arrObjs, isOptionValidate);
    expect(actualStats).toEqual(expectedStats);
  });
});
