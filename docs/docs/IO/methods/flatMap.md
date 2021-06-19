---
sidebar_position: 3
---

# flatMap

flatMap function on IO allows you to change the IO to new IO.

### Type

```typescript
// IO<R, E, A>
type: flatMap<R1 extends R, E1 extends E, B>(f: (val: A) => IO<R1, E1, B>): IO<R1, E, B>
```

### Usage

```typescript
io[IO<R, E, number>].flatMap((input) => new IO((value) => Either.Right(value + 1)))
io[IO<R, E, number>].flatMap((input) => IO.fromFunction((value) => value + 1))
io[IO<R, E, number>].flatMap(Console.flatIOLog)
```

### Example

```typescript
import { IO, Runtime, Either } from "ziojs";

const passInput = (input: number) => Either.Right(input);
const addOne = (input: number) => Either.Right(input + 1);

const io = new IO(func);
const addOneIO = new IO(addOne);

Runtime.unsafeRunSync(io.flatMap((input) => addOneIO.provide(input)).provide(4)) // 5
Runtime.unsafeRunSync(io.flatMap(Console.flatIOLog).provide(4))
```

:::tip
Using `chain` method can reduce boilerplate code
:::