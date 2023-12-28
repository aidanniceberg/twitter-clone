import { API_URL, AUTH_URL } from "./constants"
import { AuthContextUser, Post, SortBy, User } from "./types";

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

export const getProfile = (token: string, username: string): Promise<User> => {
    return fetch(`${API_URL}/users/${username}`, {
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

export const getPosts = (token: string, username: string): Promise<Post[]> => {
    return fetch(`${API_URL}/users/${username}/posts`, {
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

export const getUserFollows = (token: string, username: string, followee: string): Promise<boolean> => {
    return fetch(`${API_URL}/users/${username}/following/${followee}`, {
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

export const follow = (token: string, username: string, followee: string): Promise<boolean> => {
    return fetch(`${API_URL}/users/${username}/following`, {
        method: 'POST',
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
    return fetch(`${API_URL}/users/${username}/following`, {
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

export const getFollowers = (token: string, username: string): Promise<User[]> => {
    return fetch(`${API_URL}/users/${username}/followers`, {
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

export const searchUsers = (token: string, query: string): Promise<User[]> => {
    return fetch(`${API_URL}/users?query=${query}`, {
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
