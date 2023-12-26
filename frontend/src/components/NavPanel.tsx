import { Link } from 'react-router-dom';

type NavProps = {
    active: string;
}

function NavPanel({active}: NavProps) {

    const setActive = (target: string): string => {
        return active === target ? 'nav-active' : '';
    }

    return (
        <div className='standard-layout-panel' id='nav-wrapper'>
            <ul className='nav-list'>
                <li><Link className={`nav-list-option-link ${setActive('home')}`} to={'/home'}>Home</Link></li>
                <li><Link className={`nav-list-option-link ${setActive('login')}`} to={'/search'}>Search</Link></li>
                <li><Link className={`nav-list-option-link ${setActive('profile')}`} to={'/profile'}>Profile</Link></li>
                <li><Link className={`nav-list-option-link ${setActive('settings')}`} to={'/settings'}>Settings</Link></li>
            </ul>
        </div>
    )
}

export default NavPanel;
