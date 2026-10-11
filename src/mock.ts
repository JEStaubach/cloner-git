import { ExecFileException } from "node:child_process";
import { ExecResult, FsHelpers } from "./types";

function mock(fsHelpers: FsHelpers) {
  return (args: string[], cwd?: string): Promise<ExecResult> =>
    new Promise((resolve) => {
      const pathLocal = require(`path`);
      const destination = cwd ?? args.at(-1);
      if (destination === undefined) {
        throw new Error(`A destination path is required`);
      }
      const fullDest = fsHelpers.getAbsolutePath(destination).value;
      if (fullDest === undefined) {
        throw new Error(`Could not resolve destination path '${destination}'`);
      }
      const lastArgument = args.at(-1);
      const usePath: string =
        lastArgument !== undefined && args.includes(`sparse-checkout`)
          ? pathLocal.resolve(fullDest, lastArgument.slice(1))
          : fullDest;
      if (
        args[0] !== `clone` ||
        args.filter((cur: string) => {
          return cur === `--sparse`;
        }).length === 0
      ) {
        //if (!fsHelpers.checkIfDirExists(usePath).value) {
        const absoluteUsePath = fsHelpers.getAbsolutePath(usePath).value;
        if (absoluteUsePath === undefined) {
          throw new Error(`Could not resolve mock path '${usePath}'`);
        }
        fsHelpers.createDir(absoluteUsePath);
        fsHelpers.touchFile(`${usePath}${pathLocal.sep}main.tf`);
        //}
      }
      resolve({
        error: null,
        stdout: ``,
        stderr: ``,
      });
    });
}

// Mock running a cli command and recieving an error
// useful for actions like `git clone`, etc...
function mockError(): (_args: string[], _cwd?: string) => Promise<ExecResult> {
  return (): Promise<ExecResult> => {
    return Promise.resolve({
      error: { name: ``, message: `oops!`, code: -1 } as ExecFileException,
      stdout: ``,
      stderr: ``,
    });
  };
}

export default { mock, mockError };
