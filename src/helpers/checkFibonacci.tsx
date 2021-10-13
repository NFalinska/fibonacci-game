export function checkFibonacci(arr: Array<{ id: number; value: number }>) {
  const fibonacciNumbers = [];
  const idsFibonacci = [];
  const reqiuredLength = 3;
  const previous = 1;
  const penultimate = 2;

  for (let i = 2; i < arr.length; i++) {
    const sumFibonacci =
      fibonacciNumbers[fibonacciNumbers.length - previous] +
      fibonacciNumbers[fibonacciNumbers.length - penultimate];

    const isFibonacci =
      arr[i].value === arr[i - previous].value + arr[i - penultimate].value;

    if (fibonacciNumbers.length < reqiuredLength && isFibonacci) {
      fibonacciNumbers.push(
        arr[i - penultimate].value,
        arr[i - previous].value,
        arr[i].value
      );
      idsFibonacci.push(
        arr[i - penultimate].id,
        arr[i - previous].id,
        arr[i].id
      );
    }
    if (sumFibonacci === arr[i].value && isFibonacci) {
      fibonacciNumbers.push(arr[i].value);
      idsFibonacci.push(arr[i].id);
    }
  }
  return idsFibonacci;
}
