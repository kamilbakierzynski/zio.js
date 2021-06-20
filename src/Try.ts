import { Either } from "monet";
import IO from "./IO";
import ZIO from "./ZIO";

export type TryRunFunc<R, A> = (input: R) => A;

class Try<R, E, A> {
  private run: TryRunFunc<R, A>;

  constructor(run: TryRunFunc<R, A>) {
    this.run = run;
  }

  toIO() {
    return new IO<R, E, A>((input: R) => {
      try {
        return Either.Right(this.run(input));
      } catch (error) {
        return Either.Left(error);
      }
    });
  }

  toZIO() {
    return new ZIO<R, E, A>((input: R) => {
      try {
        return Promise.resolve(Either.Right(this.run(input)));
      } catch (error) {
        return Promise.resolve(Either.Left(error));
      }
    });
  }
}

export default Try;
