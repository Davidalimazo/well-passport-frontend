export const formatAmount = (amount: string) =>
  amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;

export const convertFirstLetterToUpperCase = (value: string) => {
  let firstLetter = value[0].toUpperCase();
  let rest = value.slice(1);
  return firstLetter.concat(rest);
};

export const convertToNaira = (amount: string) => {
  const naira = '&#8358;';
  return naira + formatAmount(amount);
};
