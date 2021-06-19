---
sidebar_position: 1
---

# Constructing IO

### Type
```typescript
IO<R, E, A> // R => Runtime, E => Error, A => Value
```

### Using monet's Either

```typescript
const func = (input: number) => Either.Right(input + 1);

const io = new IO(func);
```

### Convert function to Either.Right

```typescript
const func = (input: number) => input + 1;

const io = IO.fromFunction(func);
```
