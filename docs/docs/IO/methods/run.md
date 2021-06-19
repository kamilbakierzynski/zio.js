---
sidebar_position: 1
---

# run

:::danger
You should never directly call `run` function on IO
:::

### Type
```typescript
type: IORunFunc<R, E, A> = (input: R) => Either<E, A>
```
