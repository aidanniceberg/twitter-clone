import './style.css';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import StandardLayout from './StandardLayout';
import { createPost } from '../services';
import { Post } from '../types';

function PostPage() {
    const authContext = useContext(AuthContext);

    const [content, setContent] = useState('');

    const updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const post = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createPost(authContext?.token, authContext?.user?.username ?? '', content)
            .then(() => {
                window.location.href = `http://localhost:3000/users/${authContext?.user?.username}`
            });
    }

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
    }, [authContext]);

    return (
        <StandardLayout active='post' title='Create'>
            <form className='post-form-wrapper' onSubmit={post}>
                <textarea className='form-textarea' placeholder='Create post here' name='content' onChange={updateContent}></textarea>
                <button type='submit' className={`submit submit-post ${content === '' ? 'submit-inactive' : ''}`}>Post</button>
            </form>
        </StandardLayout>
    )
}

export default PostPage;
