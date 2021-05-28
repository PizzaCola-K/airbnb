export const addCommaToNumber = (number: number): string =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
