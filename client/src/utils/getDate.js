const getDate = (timestamp) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];    
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = parseInt(String(date.getUTCMonth() + 1).padStart(2, "0"));
  const day = parseInt(String(date.getUTCDate()).padStart(2, "0"));

  return {
    "year": year,
    "month": months[month],
    "day": day
  };
};

export default getDate;