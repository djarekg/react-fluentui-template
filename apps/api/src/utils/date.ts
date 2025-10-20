export const getYearRange = (year: number) => {
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
  return { startOfYear, startOfNextYear };
};
