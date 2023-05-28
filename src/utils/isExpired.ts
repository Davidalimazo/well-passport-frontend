export const isExpired = (date: string) => {
  const getDate = new Date(date);
  const milliseconds = getDate.getTime();
  if (Date.now() - milliseconds > 0) return true;
  return false;
};
