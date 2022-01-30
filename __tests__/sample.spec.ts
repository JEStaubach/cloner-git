import lib from 'src/index';
import { spy } from '__tests__/testUtils';

// create all test directories and files inside one root directory for easy cleanup
//const rootTestDir = `.testDir`;

// iterate over mocked and unmocked versions of the library
const libraryVariations = {
  mocked: lib.use(lib.mockError()),
  // unmocked: lib.use(lib.default),
}
Object.entries(libraryVariations).forEach(([key, variation]) => {

  // setup
  beforeEach(() => {
    spy.clear();
  });

  describe(`[${key}] test group ...`, () => {
    it(`sucessfully returns true ...`, () => {
      const res: any = undefined; 
      expect(res).toBe(undefined);
    });
  });
});
