import { Link } from 'react-router-dom';
import { LiaHomeSolid, LiaUser } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

type NavProps = {
    active?: string;
}

function NavPanel({ active = '' }: NavProps) {
    const authContext = useContext(AuthContext);

    const setActive = (target: string): string => {
        return active === target ? 'nav-active' : '';
    }

    return (
        <div className='standard-layout-panel' id='nav-wrapper'>
            <ul className='nav-list'>
                <li>
                    <Link className={`nav-list-option-link ${setActive('home')}`} to={'/home'}><LiaHomeSolid />Home</Link>
                </li>
                <li>
                    <Link className={`nav-list-option-link ${setActive('login')}`} to={'/search'}><IoIosSearch />Search</Link>
                </li>
                <li>
                    <Link className={`nav-list-option-link ${setActive('profile')}`} to={`/users/${authContext?.user?.username}`}><LiaUser />Profile</Link>
                </li>
                <li>
                    <Link className={`nav-list-option-link ${setActive('settings')}`} to={'/settings'}>< IoSettingsOutline/>Settings</Link>
                </li>
                {active !== 'post' &&
                    <li className='nav-list-option-button-wrapper'>
                        <Link className={`nav-list-option-link nav-list-option-button`} to={'/post'}>Post</Link>
                    </li>
                }
            </ul>
        </div>
    )
}

export default NavPanel;
