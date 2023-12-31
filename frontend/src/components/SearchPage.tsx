import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { IoIosSearch } from "react-icons/io";
import ProfileDisplay from './ProfileDisplay';
import StandardLayout from './StandardLayout';
import { useSearchParams } from 'react-router-dom';
import { searchUsers } from '../services';
import { User } from '../types';
import Loading from './Loading';

function HomePage() {
    const authContext = useContext(AuthContext);

    const [params] = useSearchParams();
    const query = params.get('query');

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        if (query) {
            searchUsers(authContext.token, query)
                .then((response) => {
                    setUsers(response);
                    setIsLoading(false);
                })
        } else {
            setIsLoading(false);
        }
    }, [authContext]);

    return (
        <StandardLayout active='search' title='Search'>
            <form className='search-bar-wrapper'>
                <input id='search-bar-input' className='auth-text-input' type='text' name='query' placeholder='Search' defaultValue={query ? query : ''}/>
                <button type='submit' className='search-bar-submit'><IoIosSearch /></button>
            </form>
            {
                isLoading ?
                <Loading />
                :
                users.length > 0 ?
                users.map((user) => {
                    return <ProfileDisplay key={user.username} user={user} />
                })
                :
                <p className='profile-medium-text'>No results</p>
            }
        </StandardLayout>
    )
}

export default HomePage;
