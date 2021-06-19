---
sidebar_position: 4
---

# chain

chain function on IO allows you to chain consecutive IO's.

### Type

```typescript
// IO<R, E, A>
type: chain<E1 extends E, B>(io: IO<A, E1, B>): IO<A, E, B>
```

### Usage

```typescript
io[IO<R, E, number>].chain(addOneIO)
io[IO<R, E, number>].chain(IO.fromFunction((val) => val + 1))
```

### Example

```typescript
import { IO, Runtime, Either } from "ziojs";

const passInput = (input: number) => Either.Right(input);
const addOne = (input: number) => Either.Right(input + 1);

const io = new IO(func);
const addOneIO = new IO(addOne);

Runtime.unsafeRunSync(io.chain(addOne).provide(4)) // 5
```