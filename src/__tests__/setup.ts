import fs from 'fs';
import path from 'path';

const cacheFolder = path.resolve(__dirname, '.cache');

jest.mock('../goodreads');

const goodreads = {
  mock: jest.requireMock('../goodreads'),
  actual: jest.requireActual('../goodreads'),
};

type GoodreadsFn = (...args: any[]) => Promise<string>;

function withCache(fnName: string, fn: GoodreadsFn): GoodreadsFn {
  return async (...args: any[]): Promise<string> => {
 // make sure the filename is valid
    const filename = `${fnName}_${args.join('_')}`.replace(/[^A-Za-z0-9._-]/g, '_');
    const cachePath = path.resolve(cacheFolder, filename);
    if (fs.existsSync(cachePath)) {
      return fs.readFileSync(cachePath, 'utf8').toString();
    }

    const result = await fn(...args);
    fs.writeFileSync(cachePath, result);

    return result;
  };
}

for (let fnName in goodreads.actual) {
  goodreads.mock[fnName].mockImplementation(withCache(fnName, goodreads.actual[fnName]));
}

afterEach(() => {
  for (let fnName in goodreads.actual) {
    goodreads.mock[fnName].mockClear();
  }
});
