import './style.css';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import StandardLayout from './StandardLayout';
import { useParams } from 'react-router-dom';
import { getPost, createPost } from '../services';
import { Post } from '../types';
import PostDisplay from './PostDisplay';

function ViewPostPage() {
    const authContext = useContext(AuthContext);

    const { id } = useParams();

    const [post, setPost] = useState<Post>();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const updateContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const comment = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!post) throw new Error("No post to comment on");

        createPost(authContext?.token, authContext?.user?.username ?? '', content, post.id)
            .then(() => {
                window.location.reload();
            });
    }

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        if (!id) return;
        getPost(authContext.token, Number(id))
            .then((response) => {
                setPost(response);
                setIsLoading(false);
            })
    }, [authContext]);

    return (
        <StandardLayout active='' title='View Post' isLoading={isLoading}>
            <div>
                {post && <PostDisplay key={post.id} post={post} showChildren={true}/>}
            </div>
            <form className='comment-form-wrapper' onSubmit={comment}>
                <input className='auth-text-input' type='text' name='comment' placeholder='Comment' onChange={updateContent}/>
                <button type='submit' className='submit comment-submit'>Comment</button>
            </form>
        </StandardLayout>
    )
}

export default ViewPostPage;
