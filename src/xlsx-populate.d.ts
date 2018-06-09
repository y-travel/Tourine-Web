export = XlsxPopulate;

declare namespace XlsxPopulate {
  class FormulaError {
    constructor(...args: any[]);

    static getError(error: any): any;

    error(...args: any[]): void;

  }

  class Promise {
    constructor(p0: any);

    static all(p0: any): any;

    static race(p0: any): any;

    static reject(p0: any): any;

    static resolve(p0: any): any;

    // Native method; no parameter or return type inference available
    catch(p0: any): any;

    // Native method; no parameter or return type inference available
    then(p0: any, p1: any): any;

  }

  const MIME_TYPE: string;

  const prototype: {};

  function dateToNumber(...args: any[]): void;

  function fromBlankAsync(...args: any[]): void;

  function fromDataAsync(...args: any[]): void;

  function fromFileAsync(...args: any[]): void;

  function numberToDate(...args: any[]): void;

  namespace FormulaError {
    namespace DIV0 {
      function error(...args: any[]): void;

    }

    namespace NA {
      function error(...args: any[]): void;

    }

    namespace NAME {
      function error(...args: any[]): void;

    }

    namespace NULL {
      function error(...args: any[]): void;

    }

    namespace NUM {
      function error(...args: any[]): void;

    }

    namespace REF {
      function error(...args: any[]): void;

    }

    namespace VALUE {
      function error(...args: any[]): void;

    }

  }

}

