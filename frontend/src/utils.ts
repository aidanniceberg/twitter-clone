export const getCookie = (name: string): string | null => {
    for (const cookie of document.cookie.split(';')) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}
