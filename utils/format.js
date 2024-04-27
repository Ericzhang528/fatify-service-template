const formatTime = (time, format) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return format.replace(/yyyy/, year)
      .replace(/MM/, month < 10 ? `0${month}` : month)
      .replace(/dd/, day < 10 ? `0${day}` : day)
      .replace(/HH/, hour < 10 ? `0${hour}` : hour)
      .replace(/mm/, minute < 10 ? `0${minute}` : minute)
      .replace(/ss/, second < 10 ? `0${second}` : second);
}
module.exports = {
  formatTime
}