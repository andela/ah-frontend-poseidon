export const capitalizeWord = (word) => {
  const first = word.charAt(0).toUpperCase();

  return `${first}${word.slice(1)}`;
};
