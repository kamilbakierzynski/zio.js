import { Either } from "monet";

export type ZIORunFunc<R, E, A> = (input: R) => Promise<Either<E, A>>;

class ZIO<R, E, A> {
  run: ZIORunFunc<R, E, A>;

  constructor(run: ZIORunFunc<R, E, A>) {
    this.run = run;
  }

  map<B>(f: (val: A) => B): ZIO<R, E, B> {
    return new ZIO((input: R) => this.run(input).then((val) => val.map(f)));
  }

  leftMap<L>(f: (left: E) => L): ZIO<R, L, A> {
    return new ZIO((input: R) => this.run(input).then((val) => val.leftMap(f)));
  }

  flatMap<R1 extends R, E1 extends E, B>(f: (val: A) => ZIO<R1, E1, B>) {
    return new ZIO((input: R1) =>
      this.run(input).then(async (value) => {
        if (value.isLeft()) return value as unknown as Either<E1, B>;
        return f(value.right()).run(input);
      })
    );
  }

  chain<E1, B>(zio: ZIO<A, E1, B>) {
    return this.flatMap((value) => zio.provide(value));
  }

  get either() {
    return new ZIO<R, never, Either<E, A>>((input: R) =>
      this.run(input).then((x) => Either.right(x))
    );
  }

  provide(r: R) {
    return new ZIO<any, E, A>(() => this.run(r));
  }
}

export default ZIO;
