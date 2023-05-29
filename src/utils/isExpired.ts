export const isExpired = (date: number) => {
  const milliseconds = Date.now();
  if (milliseconds - date > 0) return true;
  return false;
};
