import { Path, RetBool, RetPath, RetString, RetVal, } from 'src/types';
import mock from 'src/mock';

function use(library: any): any {

  function doSomething(): void {
    library.doSomething();
  }  

  return {
    doSomething,
  };
}

export default { use, default: mock /*TODO: change*/, mock };