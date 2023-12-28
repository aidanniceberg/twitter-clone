export const getCookie = (name: string): string | null => {
    for (const cookie of document.cookie.split(';')) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

export const dateToAgo = (d: Date): string => {
    const utcNowStr = new Date().toLocaleString('en-US', {timeZone: 'UTC'})
    const t = new Date(utcNowStr).getTime() - d.getTime();
    const seconds = Math.floor(t / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(weeks / 52);

    if (years > 0) {
        return `${years} ${years > 1 ? 'years' : 'year'} ago`;
    } else if (weeks > 0) {
        return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
    } else if (days > 0) {
        return `${days} ${days > 1 ? 'days' : 'day'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
    }
    return 'now';
}

export const dateToString = (d: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
    
      return d.toLocaleDateString('en-US', options);
}
