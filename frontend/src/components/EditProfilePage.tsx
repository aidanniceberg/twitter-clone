import './style.css';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { IoIosSearch } from "react-icons/io";
import ProfileDisplay from './ProfileDisplay';
import StandardLayout from './StandardLayout';
import { useParams } from 'react-router-dom';
import { getCurrentUser, editProfile } from '../services';
import { User } from '../types';

function EditProfilePage() {
    const authContext = useContext(AuthContext);

    const { username } = useParams();

    const [authorized, setAuthorized] = useState(false);
    const [user, setUser] = useState<User>();

    const updateProfile = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: FormData = new FormData(event.currentTarget);
        let first_name = data.get('first_name')?.toString() ?? null;
        let last_name = data.get('last_name')?.toString() ?? null;
        let email = data.get('email')?.toString() ?? null;
        let birthday = data.get('birthday')?.toString() ?? null;
        let bio = data.get('bio')?.toString() ?? null;

        if (first_name === user?.first_name) first_name = null;
        if (last_name === user?.last_name) last_name = null;
        if (email === user?.email) email = null;
        if (bio === user?.bio) bio = null;
        if (birthday === user?.birthday?.toString()) bio = null;

        editProfile(authContext.token, first_name, last_name, email, birthday, bio)
            .then(() => {
                window.location.href = `http://localhost:3000/users/${authContext.user?.username}`;
            })

    }

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        if (username !== authContext.user.username) {
            setAuthorized(false);
            return;
        }
        setAuthorized(true);
        getCurrentUser(authContext.token)
            .then((response) => {
                setUser(response);
            })
    }, [authContext]);

    return (
        authorized ?
        <StandardLayout active='' title='Edit Profile'>
            <form className='post-form-wrapper' onSubmit={updateProfile}>
                <div className='edit-profile-flex-row'>
                    <div>
                        <label className='auth-label'>First Name</label>
                        <input className='auth-text-input' type='text' name='first_name' placeholder='First Name' defaultValue={user?.first_name} />
                    </div>
                    <div>
                        <label className='auth-label'>Last Name</label>
                        <input className='auth-text-input' type='text' name='last_name' placeholder='Last Name' defaultValue={user?.last_name} />
                    </div>
                </div>

                <div className='edit-profile-flex-row'>
                    <div>
                        <label className='auth-label'>Email</label>
                        <input className='auth-text-input' type='text' name='email' placeholder='Email' defaultValue={user?.email} />
                    </div>
                    <div>
                        <label className='auth-label'>Birthday</label>
                        <input className='auth-text-input date-input' type='date' name='birthday' defaultValue={user?.birthday?.toString()} />
                    </div>
                </div>

                <label className='auth-label'>Bio</label>
                <textarea className='form-textarea edit-profile-textarea' name='bio' placeholder='Bio' defaultValue={user?.bio}></textarea>

                <button type='submit' className='submit submit-edit-profile'>Save</button>
            </form>
        </StandardLayout>
        :
        <h1>Cannot edit page</h1>
    )
}

export default EditProfilePage;
