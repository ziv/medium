# Cancellation

In software development, there are many cases in which we keep a handler or descriptor to cancel an operation or close a
resource. Maybe the most familiar example is keeping the timeout object returned by the `setTimeout` function to clear
it.

Let’s start with an example. Somewhere in my code, I created a timeout trap:

```ts
const timer = setTimeout(() => {
    throw new Error('timeout');
}, 5000);
```

The trap will throw an exception in 5 seconds. Later, if my process went well, and I want to cancel the trap, I need:

1. Access the `timer` object.
2. Implement the cancellation

While the first requirement is mostly mandatory, the second one requires knowledge about creating the timer—and,
therefore, a coupling.

To remove this coupling, a function that creates a side effect should return a cancellation handler.

Consider the following timeout function:

```ts
function timeout(seconds: number): void {
    const timer = setTimeout(() => {
        throw new Error('timeout');
    }, seconds * 1000);
    return () => timer && clearTimeout(timer);
}
```

This implementation creates the timer and returns a cancellation function. Cancelling a timeout created by this function
requires no more than calling a function.

Let’s take a look at a “real world” example for this timer:

```ts
function fetchData(url: string, seconds: number) {
    const cancel = timeout(seconds); // creating a timeout trap
    return fetch(url)
        .then(res => res.json())
        .finaly(cancel); // cancel the trap if everything is OL
}
```

Another use of cancellation functions is to gracefully terminate applications. We can use the same concept for any
resource that needs to be “canceled” (closing file handler, closing database connection, etc.).

