const listItems = [
  {
    currencyFrom: "EUR",
    currencyTo: "USD",
    valueFrom: "10",
    valueTo: "12.31",
  }
]

const getConversionsList = () =>  {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(listItems),
    );
  });
}

export {
  getConversionsList,
}