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
  it('deberia retorna true si la ruta existe', async() => {
    expect(routeExists('files')).toBe(true)
  })
  it('deberia retorna false si la ruta no existe', async() => {
    expect(routeExists('./test/prueb/archivo1.md')).toBe(false)
  })
});


describe('routeAbsolute', () => {
  it('retorna la ruta absoluta', async() => {
    const absoluta = path.resolve('files\pruebaTres.md')
    expect(routeAbsolute('files\pruebaTres.md')).toEqual(absoluta)
  });
  it('retorna la misma ruta si esta ya es absoluta',async() => {
    const archivo = '/Users/lunap/OneDrive/Escritorio/Proyectos Laboratoria/DEV007-md-links/files/pruebaTres.md'
    expect(routeAbsolute(archivo)).toEqual(archivo)
  });
});

describe('readFile', () => {
  const filesMd = [ 'files\\pruebaTres.md' ]
  it('Es una función', () => {
    expect(typeof readFile).toBe('function');
  });
  it('should read the contents of all files', async () => {
    const arrayFiles = ['files\\pruebaTres.md'];
    const expectedResults = [
      "Archivo de prueba FALSE [Markdown](https://es.wikipedia.org/wiki/Markdown)",
    ];
    const actualResults = await readFile(arrayFiles);
    expect(actualResults).toEqual(expectedResults);
  });
});

describe('fileOrDir', () => {
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
  it("should return a Promise of an array of objects", async () => {
    const arrObject = [
      { href: "https://www.google.com" },
      { href: "https://www.facebook.com" },
      { href: "https://www.twitter.com" },
    ];
    const results = await peticionHTTP(arrObject);
    expect(results).toBePromise().then(res => {
      expect(res).toEqual([
        {
          href: "https://www.google.com",
          status: 200,
          mensaje: "OK",
        },
        {
          href: "https://www.facebook.com",
          status: 200,
          mensaje: "OK",
        },
        {
          href: "https://www.twitter.com",
          status: 200,
          mensaje: "OK",
        },
      ]);
    });
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
