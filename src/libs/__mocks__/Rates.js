const rates = [
  {currency:"USD",rate:"1.2309"},
  {currency:"JPY",rate:"132.41"}
];

const getRates = () => {
  return new Promise((resolve) => {
    process.nextTick(() => resolve(rates));
  });
}

export {
  getRates,
};