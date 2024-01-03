import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { IoIosSearch } from "react-icons/io";
import ProfileDisplay from './ProfileDisplay';
import StandardLayout from './StandardLayout';
import { useParams } from 'react-router-dom';
import { getLikes } from '../services';
import { User } from '../types';
import Loading from './Loading';

function LikesPage() {
    const authContext = useContext(AuthContext);

    const { id } = useParams();

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        if (id) {
            getLikes(authContext.token, Number(id))
                .then((response) => {
                    setUsers(response);
                    setIsLoading(false);
                })
        }
    }, [authContext]);

    return (
        <StandardLayout title='Likes' isLoading={isLoading}>
            {
                users.length > 0 ?
                users.map((user) => {
                    return <ProfileDisplay key={user.username} user={user} />
                })
                :
                <p className='profile-medium-text'>No likes</p>
            }
        </StandardLayout>
    )
}

export default LikesPage;
