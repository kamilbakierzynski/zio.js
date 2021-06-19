import { Either } from "monet";

export type IORunFunc<R, E, A> = (input: R) => Either<E, A>;

class IO<R, E, A> {
  run: IORunFunc<R, E, A>;

  constructor(run: IORunFunc<R, E, A>) {
    this.run = run;
  }

  map<B>(f: (val: A) => B): IO<R, E, B> {
    return new IO((input: R) => this.run(input).map(f));
  }

  flatMap<R1 extends R, E1 extends E, B>(
    f: (val: A) => IO<R1, E1, B>
  ): IO<R1, E, B> {
    return new IO((input: R1) =>
      this.run(input).flatMap((x) => f(x).run(input))
    );
  }

  chain<E1 extends E, B>(io: IO<A, E1, B>) {
    return new IO((input: R) =>
      this.run(input).flatMap((value) => io.run(value))
    );
  }

  get either() {
    return new IO<R, never, Either<E, A>>((input: R) =>
      Either.right(this.run(input))
    );
  }

  provide(r: R) {
    return new IO<any, E, A>(() => this.run(r));
  }

  static fromFunction = <R1, A1>(f: (val: R1) => A1) =>
    new IO<R1, any, A1>((input) => Either.Right(f(input)));
}

export default IO;
