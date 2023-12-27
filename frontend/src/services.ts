import { API_URL, AUTH_URL } from "./constants"
import { AuthContextUser, Post, SortBy } from "./types";

export const getToken = (username: string, password: string): Promise<boolean> => {
    return fetch(`${AUTH_URL}/token`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
    })
        .then((response) => {
            return response.ok;
        });
}

export const getAuthContextUser = (token: string): Promise<AuthContextUser> => {
    return fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: "include",
    })
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error(`Encountered a ${response.status} error: ${response.json()}`);
        });
}

export const getFeed = (token: string, username: string, sort: SortBy = SortBy.MOST_RECENT): Promise<Post[]> => {
    return fetch(`${API_URL}/users/${username}/feed`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: "include",
    })
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error(`Encountered a ${response.status} error: ${response.json()}`);
        });
}
