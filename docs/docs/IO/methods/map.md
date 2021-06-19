---
sidebar_position: 2
---

# map

map function on IO allows you to change the value in the IO (from type `A` to `B`).

### Type

```typescript
// IO<R, E, A>
type: map<B>(f: (val: A) => B): IO<R, E, B>
```

### Usage

```typescript
io[IO<R, E, number>].map((value) => value + 1) // from number to number
io[IO<R, E, number>].map((value) => `Index: ${value}`) // from number to string

io[IO<R, E, string>].map((value) => value.length) // from string to number
```

### Example

```typescript
import { IO, Runtime, Either } from "ziojs";

const func = (input: number) => Either.Right(input);

const addOne = (val: number) => val + 1;

const io = new IO(func);

Runtime.unsafeRunSync(io.map(addOne).provide(4)) // 5
```