export const reformatDate = (date: string): string => {
  const [day, month, year] = date.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
