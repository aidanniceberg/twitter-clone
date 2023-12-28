import './style.css';
import { User } from '../types';
import { useState } from 'react';
import ProfileDisplay from './ProfileDisplay';

type ProfileListDisplayProps = {
    users: User[];
}

function ProfileListDisplay({users}: ProfileListDisplayProps) {
    const [query, setQuery] = useState('');

    const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value.trim());
    }

    const filterUsers = (user: User): boolean => {
        if (query === '') return true;
        const lowercaseQuery = query.toLowerCase();
        const values: string[] = [user.username, user.first_name, user.last_name, `${user.first_name} ${user.last_name}`];
        for (const val of values) {
            if (val.toLowerCase().includes(lowercaseQuery)) {
                return true;
            }
        }
        return false;
    }

    return (
        <>
            <input className='auth-text-input' type='text' name='filter' placeholder='Filter' onInput={updateQuery}/>
            {users.filter(filterUsers).map((user) => {
                return <ProfileDisplay user={user} />
            })}
        </>
    )
}

export default ProfileListDisplay;
