import './style.css';
import { FormEvent, useState } from 'react';
import { getToken } from '../services';

function LoginPage() {
    const [failedLogin, setFailedLogin] = useState(false);
    const invalidInput = 'input-invalid';
    const invalidLabel = 'label-invalid';

    const authenticate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: FormData = new FormData(event.currentTarget);
        const username = data.get('username') ?? '';
        const password = data.get('password') ?? '';

        if (await getToken(`${username}`, `${password}`)) {
            window.location.href = 'http://localhost:3000/home';
        } else {
            setFailedLogin(true);
            setTimeout(() => { setFailedLogin(false) }, 500);
        }
    }

    return (
        <div className='auth-wrapper'>
            <h1 className='auth-title'>Login</h1>
            <form onSubmit={authenticate} className='input-wrapper'>
                <label className={'auth-label ' + (failedLogin ? invalidLabel : '')}>Username</label>
                <input className={'auth-text-input ' + (failedLogin ? invalidInput : '')} type='text' name='username' />
                <label className={'auth-label ' + (failedLogin ? invalidLabel : '')}>Password</label>
                <input className={'auth-text-input ' + (failedLogin ? invalidInput : '')} type='password' name='password' />
                <input type='submit' className='submit' value='Log In'></input>
            </form>
        </div>
    );
}

export default LoginPage;
