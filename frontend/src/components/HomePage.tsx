import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import PostDisplay from './PostDisplay';
import StandardLayout from './StandardLayout';
import { getFeed } from '../services';
import { Post } from '../types';

function HomePage() {
    const authContext = useContext(AuthContext);
    const [feed, setFeed] = useState<Post[]>();

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        getFeed(authContext.token, authContext.user?.username)
            .then((response) => {
                setFeed(response);
            })
    }, [authContext]);

    return (
        <StandardLayout active='home' title='Home'>
            {feed && feed.map((post) => {
                return <PostDisplay key={post.id} post={post}/>
            })}
        </StandardLayout>
    )
}

export default HomePage;
