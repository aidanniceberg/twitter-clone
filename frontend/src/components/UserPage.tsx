import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import PostDisplay from './PostDisplay';
import StandardLayout from './StandardLayout';
import { getProfile, getPosts, follow, unfollow } from '../services';
import { Post, User } from '../types';
import { Link, useParams } from 'react-router-dom';
import { IoCalendarClearOutline } from "react-icons/io5";
import { dateToString } from '../utils';
import FollowButton from './FollowButton';

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
            });
        
    }, [authContext, username]);

    const updateFollow = () => {
        if (!profile) throw new Error("Profile not defined");
        let newProfile = {...profile};
        if (newProfile.followers !== undefined) {
            newProfile.followers++;
        }
        setProfile(newProfile);
    }

    const updateUnfollow = () => {
        if (!profile) throw new Error("Profile not defined");
        let newProfile = {...profile};
        if (newProfile.followers !== undefined) {
            newProfile.followers--;
        }
        setProfile(newProfile);
    }

    return (
        <StandardLayout active={isCurrentUser ? 'profile' : ''} title={username ?? 'Error'}>
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
                        <Link className='profile-button' to={`/users/${username}/edit`}>
                            <button>Edit Profile</button>
                        </Link>
                        :
                        <FollowButton profile={username ?? ''} followCallback={updateFollow} unfollowCallback={updateUnfollow}/>
                    }
                </div>
                <h2 className='profile-medium-text profile-buffer-bottom'>
                    {(posts && posts.length > 0) ? 'Posts' : 'No Posts'}
                </h2>
                {posts && posts.map((post) => {
                    return <PostDisplay key={post.id} post={post}/>
                })}
            </div>
        </StandardLayout>
    )
}

export default UserPage;
