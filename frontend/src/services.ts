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
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
        },
        credentials: "include",
        body: body,
    })
        .then((response) => {
            if (response.ok) return true;
            throw new Error(`Encountered a ${response.status} error: ${response.json()}`);
        });
}

const standardDelete = (url: string, token: string, body: string = ""): Promise<boolean> => {
    return fetch(url, {
        method: 'DELETE',
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

export const getCurrentUser = (token: string): Promise<User> => {
    return standardGetJSON<User>(`${API_URL}/users/me`, token);
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
    return standardPost(`${API_URL}/users/${username}/following`, token, JSON.stringify(followee));
}

export const unfollow = (token: string, username: string, followee: string): Promise<boolean> => {
    return standardDelete(`${API_URL}/users/${username}/following`, token, followee);
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

export const createPost = (token: string, author: string, content: string, response_to?: number, created_at?: Date): Promise<boolean> => {
    const body = {
        "author": author,
        "content": content,
        "created_at": created_at ?? new Date().toISOString(),
        "response_to": response_to
    };
    return standardPost(`${API_URL}/posts`, token, JSON.stringify(body));
}

export const editProfile = (token: string, first_name: string | null = null, last_name: string | null = null, email: string | null = null, birthday: string | null = null, bio: string | null = null): Promise<boolean> => {
    return fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "birthday": birthday,
            "bio": bio
        })
    })
        .then((response) => {
            if (response.ok) return true;
            throw new Error(`Encountered a ${response.status} error: ${response.json()}`);
        });
}

export const getPost = (token: string, id: number): Promise<Post> => {
    return standardGetJSON<Post>(`${API_URL}/posts/${id}`, token);
}

export const getUserLikes = (token: string, id: number, username: string): Promise<boolean> => {
    return standardGetJSON<boolean>(`${API_URL}/posts/${id}/likes/${username}`, token);
}

export const getLikes = (token: string, id: number): Promise<User[]> => {
    return standardGetJSON<User[]>(`${API_URL}/posts/${id}/likes`, token);
}

export const like = (token: string, id: number, username: string): Promise<boolean> => {
    return standardPost(`${API_URL}/posts/${id}/likes`, token);
}

export const unlike = (token: string, id: number, username: string): Promise<boolean> => {
    return standardDelete(`${API_URL}/posts/${id}/likes`, token);
}
