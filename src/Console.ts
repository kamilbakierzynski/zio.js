import { Either } from "monet";
import IO from "./IO";
import ZIO from "./ZIO";

class Console {
  static passthroughLog<A>(val: A) {
    console.log(val);
    return val;
  }
  static flatIOLog<A>(val: A) {
    return new IO(() => Either.Right(console.log(val)));
  }
  static flatZIOLog<A>(val: A) {
    return new ZIO(() => Promise.resolve(Either.Right(console.log(val))));
  }
  static logEither(either: Either<any, any>) {
    either.cata(console.log, console.log);
  }
}

export default Console;
