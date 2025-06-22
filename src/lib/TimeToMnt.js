export const TimeToMnt = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const MntToTime = (time) => {
  if (time > 0) {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}`;
  }
};
