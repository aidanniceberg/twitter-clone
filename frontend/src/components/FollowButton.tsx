import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { follow, getUserFollows, unfollow } from '../services';

type FollowButtonProps = {
    profile: string;
    followCallback: () => void;
    unfollowCallback: () => void;
}

function FollowButton({profile, followCallback, unfollowCallback}: FollowButtonProps) {
    const authContext = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        getUserFollows(authContext.token, authContext.user.username, profile)
            .then((response) => {
                setIsFollowing(response);
            })
    }, [authContext]);

    const toggleFollowing = () => {
        if (!authContext.user) throw new Error("Invalid authentication context");
        if (isFollowing) {
            unfollow(authContext.token, authContext.user.username, profile)
                .then(() => {
                    setIsFollowing(false);
                    unfollowCallback();
                });
        } else {
            follow(authContext.token, authContext.user.username, profile)
            .then(() => {
                setIsFollowing(true);
                followCallback();
            });
        }
    }

    return (
        <button className={`profile-button ${!isFollowing ? 'profile-button-active' : ''}`} onClick={toggleFollowing}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    )
}

export default FollowButton;
