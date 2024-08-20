export const toEn = (n: any) =>
  n.replace(/[০-৯]/g, (d: any) => "০১২৩৪৫৬৭৮৯".indexOf(d));

// utils/timeAgo.js

export const timeAgo = (date: any) => {
  const now: any = new Date();
  const past: any = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals: any = {
    year: 365 * 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  for (const interval in intervals) {
    const seconds = intervals[interval];
    const value = Math.floor(diffInSeconds / seconds);
    if (value > 0) {
      return `${value} ${interval}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

export default timeAgo;
