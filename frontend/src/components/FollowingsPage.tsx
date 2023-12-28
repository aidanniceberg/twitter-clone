import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import StandardLayout from './StandardLayout';
import { getFollowings } from '../services';
import { User } from '../types';
import { useParams } from 'react-router-dom';
import ProfileListDisplay from './ProfileListDisplay';

function FollowingsPage() {
    const authContext = useContext(AuthContext);
    const { username } = useParams();
    const [followings, setFollowings] = useState<User[]>([]);

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user || !username) return;
        getFollowings(authContext.token, username)
            .then((response) => {
                setFollowings(response);
            })
    }, [authContext]);

    return (
        <StandardLayout active='' title={`@${username}'s followings`}>
            <ProfileListDisplay users={followings} />
        </StandardLayout>
    )
}

export default FollowingsPage;
