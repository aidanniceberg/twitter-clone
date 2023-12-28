import { API_URL, AUTH_URL } from "./constants"
import { AuthContextUser, Post, SortBy, User } from "./types";

const standardGetJSON = <T> (url: string, token: string): Promise<T> => {
    return fetch(url, {
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

const standardPost = (url: string, token: string, body: string = ""): Promise<boolean> => {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: body,
    })
        .then((response) => {
            if (response.ok) return true;
            throw new Error(`Encountered a ${response.status} error: ${response.json()}`);
        });
}

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
    return standardGetJSON<AuthContextUser>(`${API_URL}/users/me`, token);
}

export const getFeed = (token: string, username: string, sort: SortBy = SortBy.MOST_RECENT): Promise<Post[]> => {
    return standardGetJSON<Post[]>(`${API_URL}/users/${username}/feed`, token);
}

export const getProfile = (token: string, username: string): Promise<User> => {
    return standardGetJSON<User>(`${API_URL}/users/${username}`, token);
}

export const getPosts = (token: string, username: string): Promise<Post[]> => {
    return standardGetJSON<Post[]>(`${API_URL}/users/${username}/posts`, token);
}

export const getUserFollows = (token: string, username: string, followee: string): Promise<boolean> => {
    return standardGetJSON<boolean>(`${API_URL}/users/${username}/following/${followee}`, token);
}

export const follow = (token: string, username: string, followee: string): Promise<boolean> => {
    return standardPost(`${API_URL}/users/${username}/following`, token, followee);
}

export const unfollow = (token: string, username: string, followee: string): Promise<boolean> => {
    return fetch(`${API_URL}/users/${username}/following`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: followee,
    })
        .then((response) => {
            if (response.ok) return true;
            throw new Error(`Encountered a ${response.status} error: ${response.json()}`);
        });
}

export const getFollowings = (token: string, username: string): Promise<User[]> => {
    return standardGetJSON<User[]>(`${API_URL}/users/${username}/following`, token);
}

export const getFollowers = (token: string, username: string): Promise<User[]> => {
    return standardGetJSON<User[]>(`${API_URL}/users/${username}/followers`, token);
}

export const searchUsers = (token: string, query: string): Promise<User[]> => {
    return standardGetJSON<User[]>(`${API_URL}/users?query=${query}`, token);
}
