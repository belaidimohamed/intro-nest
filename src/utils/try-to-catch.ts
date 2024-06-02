
type AsyncFunction = (...args: any[]) => Promise<any>;


export async function tryToCatch(fn:AsyncFunction, ...args:any[]) {  
    try {
      return [null, await fn(...args)];
    } catch (error) {
      return [error, null];
    };
  };