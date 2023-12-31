import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import StandardLayout from './StandardLayout';
import { getFollowers } from '../services';
import { User } from '../types';
import { useParams } from 'react-router-dom';
import ProfileListDisplay from './ProfileListDisplay';

function FollowersPage() {
    const authContext = useContext(AuthContext);
    const { username } = useParams();
    const [followers, setFollowers] = useState<User[]>([]);

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user || !username) return;
        getFollowers(authContext.token, username)
            .then((response) => {
                setFollowers(response);
            })
    }, [authContext]);

    return (
        <StandardLayout active='' title={`@${username}'s followers`}>
            <ProfileListDisplay users={followers} />
        </StandardLayout>
    )
}

export default FollowersPage;
