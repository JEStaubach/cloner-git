import { ExecFileException } from 'child_process';
import { ExecResult, Path, FsHelpers } from 'src/types';

function mock(fsHelpers: FsHelpers) {
  return (async (args: string[], cwd?: Path): Promise<ExecResult> => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pathLocal = require(`path`);
    const fullDest = fsHelpers.getAbsolutePath(cwd || args.slice(-1)[0]).value;
    const usePath: string =
      args.filter((cur: string) => {
        return cur === `sparse-checkout`;
      }).length > 0
        ? pathLocal.resolve(fsHelpers.getAbsolutePath(fullDest).value, args.slice(-1)[0].slice(1))
        : fullDest;
    if (!fsHelpers.checkIfDirExists(usePath).value) {
      fsHelpers.createDir(fsHelpers.getAbsolutePath(usePath).value);
      fsHelpers.touchFile(`${usePath}${pathLocal.sep}main.tf`);
    }
    return Promise.resolve({
      error: null,
      stdout: ``,
      stderr: ``,
    });
  });
}

// Mock running a cli command and recieving an error
// useful for actions like `git clone`, etc...
function mockError() {
  return (async (_args: string[], _cwd?: Path): Promise<ExecResult> => {
    return Promise.resolve({
      error: { name: ``, message: `oops!`, code: -1 } as ExecFileException,
      stdout: ``,
      stderr: ``,
    });
  });
}

export default { mock, mockError };
