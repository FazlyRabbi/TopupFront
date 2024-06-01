// utils/timeDifference.js
export function getTimeDifference(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    
    const differenceInMilliseconds = now - createdDate;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
  
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minute(s) ago`;
    } else if (differenceInHours < 24) {
      return `${differenceInHours} hour(s) ago`;
    } else {
      return `${differenceInDays} day(s) ago`;
    }
  }
  