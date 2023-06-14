import { execFile } from 'child_process';
import { ExecResult, Path } from './types';
import mock from './mock';

async function git(args: string[], cwd?: Path): Promise<ExecResult> {
  return new Promise((resolve) => {
    execFile(`git`, [...args], { cwd }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
}

function use(
  cloneLibrary: (_: string[], __?: Path) => Promise<ExecResult>,
): (_args: string[], _cwd?: Path) => Promise<ExecResult> {
  return async function cloner(args: string[], cwd?: Path): Promise<ExecResult> {
    return cloneLibrary(args, cwd);
  };
}

export default { use, default: git, mock: mock.mock, mockError: mock.mockError };
