import { ExecFileException } from 'child_process';

type FsHelpers = {
  getAbsolutePath: (_:string) => RetPath,
  checkIfFileExists: (_:string) => RetBool,
  checkIfDirExists: (_:string) => RetBool,
  createDir: (_:string) => RetPath,
  renameDir: (_:string, __:string) => RetVal,
  rimrafDir: (_:string) => RetVal,
  readFile: (_:string) => RetString,
  copyDirAbs: (_:string, __:string) => RetVal,
  touchFile: (_:string) => RetVal,
}

type ExecResult = {
  error?: ExecFileException;
  stdout?: string;
  stderr?: string;
};

type Path = string;

type RetVal = {
  success: boolean;
  error?: string;
};

interface RetString extends RetVal {
  value?: string;
}

interface RetBool extends RetVal {
  value?: boolean;
}

interface RetPath extends RetVal {
  value?: Path;
}

export {
  Path,
  RetBool,
  RetString,
  RetVal,
  RetPath,
  ExecResult,
  FsHelpers,
};
