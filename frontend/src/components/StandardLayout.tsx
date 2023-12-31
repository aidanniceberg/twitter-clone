import { ReactNode } from 'react';

import './style.css';
import NavPanel from './NavPanel';
import Loading from './Loading';

type StandardLayoutProps = {
    title: string;
    active?: string;
    children: ReactNode;
    isLoading?: boolean;
}

function StandardLayout({title, active = '', children, isLoading = false}: StandardLayoutProps) {
    return (
        <>
            <div className='standard-layout-container'>
                <NavPanel active={active}/>
                <div className='standard-layout-panel standard-layout-content-panel'>
                    <h1 className='standard-layout-header'>{title}</h1>
                    {isLoading ? <Loading /> : children}
                </div>
            </div>
        </>
    )
}

export default StandardLayout;
