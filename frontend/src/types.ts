export type AuthContextUser = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export enum SortBy {
    MOST_RECENT = 'most_recent'
}

export type Post = {
    id: number;
    author: string;
    content: string;
    created_at?: Date;
    response_to?: number;
    responses?: Post[];
    likes: number;
}

export type User = {
    username: string;
    email?: string;
    birthday?: Date;
    bio: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    followers?: number;
    following?: number;
}
