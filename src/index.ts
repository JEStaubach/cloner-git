import { execFile } from "node:child_process";
import { ExecResult } from "./types";
import mock from "./mock";

async function git(args: string[], cwd?: string): Promise<ExecResult> {
  return new Promise((resolve) => {
    execFile(`git`, [...args], { cwd }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
}

function use(
  cloneLibrary: (_: string[], __?: string) => Promise<ExecResult>,
): (_args: string[], _cwd?: string) => Promise<ExecResult> {
  return async function cloner(
    args: string[],
    cwd?: string,
  ): Promise<ExecResult> {
    return cloneLibrary(args, cwd);
  };
}

export default {
  use,
  default: git,
  mock: mock.mock,
  mockError: mock.mockError,
};
