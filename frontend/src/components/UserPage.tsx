import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import PostDisplay from './PostDisplay';
import StandardLayout from './StandardLayout';
import { getProfile, getPosts } from '../services';
import { Post, User } from '../types';
import { Link, useParams } from 'react-router-dom';
import { IoCalendarClearOutline } from "react-icons/io5";
import { dateToString } from '../utils';

function UserPage() {
    const authContext = useContext(AuthContext);

    const { username } = useParams();
    
    const [profile, setProfile] = useState<User>();
    const [posts, setPosts] = useState<Post[]>();
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    useEffect(() => {
        if (!username) throw new Error('Username not found');
        if (!authContext.isAuthenticated || !authContext.user) return;
        setIsCurrentUser(username === authContext.user.username);
        getProfile(authContext.token, username)
            .then((response) => {
                setProfile(response);
            });
        getPosts(authContext.token, username)
            .then((response) => {
                setPosts(response);
            })
    }, [authContext, username]);

    return (
        <StandardLayout active={isCurrentUser ? 'profile' : ''} title={`@${username}` ?? 'Error'}>
            <div className='profile-wrapper'>
                <h2 className='profile-medium-text'>{`${profile?.first_name} ${profile?.last_name}`}</h2>
                <h3 className='profile-small-text'>
                    <IoCalendarClearOutline />
                    Member since {`${profile ? dateToString(new Date(profile?.created_at)) : 'error'}`}
                </h3>
                <h3 className='profile-small-text'>{profile?.bio}</h3>
                <div className='profile-followings-wrapper'>
                    <Link to={`/users/${username}/followers`} className='profile-small-text'>Followers: {profile?.followers}</Link>
                    <Link to={`/users/${username}/following`} className='profile-small-text'>Following: {profile?.following}</Link>
                    {
                        isCurrentUser ?
                        <button className='profile-button'>Edit Profile</button>
                        :
                        <button className='profile-button button-important'>Follow</button>
                    }
                </div>
                <h2 className='profile-medium-text'>
                    {(posts && posts.length > 0) ? 'Posts' : 'No Posts'}
                </h2>
                {posts && posts.map((post) => {
                    return <PostDisplay key={post.id} post={post} showAuthor={false}/>
                })}
            </div>
        </StandardLayout>
    )
}

export default UserPage;
