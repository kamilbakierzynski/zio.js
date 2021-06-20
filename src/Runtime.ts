import { Either } from "monet";
import IO from "./IO";
import ZIO from "./ZIO";

const throwError = (error: any) => {
  if (error instanceof Error) throw error;
  if (typeof error === "string") throw Error(error);
  throw Error("ZIO.js error");
};
const identity = <A>(x: A) => x;

class Runtime {
  static unsafeRunSync<E, A>(io: IO<undefined, E, A>): A {
    return io.run(undefined).cata(throwError, identity);
  }

  static unsafeRunProvideSync<R, E, A>(runtime: R): (io: IO<R, E, A>) => A {
    return (io: IO<R, E, A>) => io.run(runtime).cata(throwError, identity);
  }

  static safeRunSync<A>(io: IO<any, any, A>): Either<any, A> {
    return io.run(undefined);
  }

  static safeRunProvideSync<R, E, A>(
    runtime: R
  ): (io: IO<R, E, A>) => Either<E, A> {
    return (io) => io.run(runtime);
  }

  static safeRunSyncLogError<E, A>(io: IO<undefined, E, A>): A | void {
    return io.run(undefined).cata(console.log, identity);
  }

  static unsafeRunAsync<E, A>(zio: ZIO<undefined, E, A>) {
    return zio.run(undefined).then((x) => x.cata(throwError, identity));
  }

  static safeRunAsync<A>(zio: ZIO<undefined, any, A>) {
    return zio.run(undefined).then((x) => x.cata(console.log, identity));
  }
}

export default Runtime;
