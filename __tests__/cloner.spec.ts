import lib from '../src/index';
import fsHelpers from '@jestaubach/fs-helpers';
import { ExecResult } from '../src/types';
import { beforeAll, afterAll, beforeEach, describe, it, expect, vi, afterEach } from 'vitest';

const fsh = fsHelpers.use(fsHelpers.default);

// create all test directories and files inside one root directory for easy cleanup
const rootTestDirs = [`.testDir1`, `.testDir2`, `.testDir3`, `.testDir4`];

// iterate over mocked and unmocked versions of the library
const libraryVariations = {
  errored: {
    mocked: lib.use(lib.mockError()),
    unmocked: lib.use(lib.default),
  },
  success: {
    mocked: lib.use(lib.mock(fsh) as (_:string[],__?:string) => Promise<ExecResult>),
    unmocked: lib.use(lib.default),
  },
}

// setup
beforeAll(async () => {
  await fsh.rimrafDirs(rootTestDirs);
});

beforeEach( () => {
  vi.resetAllMocks();
});


// teardown
afterAll(async () => {
  await fsh.rimrafDirs(rootTestDirs);
});


for (const [key2, status] of Object.entries(libraryVariations)) {

  for (const [key, variation] of Object.entries(status)) {
    if (key2 === `success`) {
      
      describe(`[${key}] success group ...`, async () => {

        it(`clone something successfully`, async () => {
          const { error, stdout, stderr } = await variation([`clone`, `https://github.com/terraform-aws-modules/terraform-aws-vpc.git`, `${rootTestDirs[0]}/${key2}/${key}`]);
          expect(error).toBe(null);
        }, 30000);

        it(`clone something with sparse-checkout`, async () => {
          let { error, stdout, stderr } = await variation([`clone`, `--depth`, `1`, `--no-checkout`, `--branch`, `v2.78.0`, `https://github.com/terraform-aws-modules/terraform-aws-vpc.git`, `${rootTestDirs[1]}/${key2}/${key}`]);
          expect(error).toBe(null);
          ({ error, stdout, stderr } = await variation([`sparse-checkout`, `set`, `--no-cone`, `examples/simple-vpc`], `${rootTestDirs[1]}/${key2}/${key}`));
          expect(error).toBe(null);
          ({ error, stdout, stderr } = await variation([`checkout`, `@`], `${rootTestDirs[1]}/${key2}/${key}`));
          expect(error).toBe(null);
        });

        it(`clone something to an existing dir`, async () => {
          fsh.createDir(`${rootTestDirs[2]}/${key2}/${key}`);
          const { error, stdout, stderr } = await variation([`clone`, `https://github.com/terraform-aws-modules/terraform-aws-vpc.git`, `${rootTestDirs[2]}/${key2}/${key}`]);
          expect(error).toBe(null);
        }, 30000);

      });
    } else {
      describe(`[${key}] error group ...`, async () => {

        it(`clone something unsuccessfully`, async () => {
          const {error, stdout, stderr} = await variation([`cloneErr`, `https://github.com/terraform-aws-modules/terraform-aws-vpc.git`, `${rootTestDirs[3]}/${key2}/${key}`]);
          expect(error).not.toBe(null);
        }, 30000);

      });
    }
  }
};
