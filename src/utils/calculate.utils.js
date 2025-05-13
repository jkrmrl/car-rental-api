export const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
  if (!startDate || !endDate || !pricePerDay) {
    return 0;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = Math.abs(end.getTime() - start.getTime());
  const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return days * pricePerDay;
};
