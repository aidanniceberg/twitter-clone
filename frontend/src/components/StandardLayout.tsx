import { ReactNode } from 'react';

import './style.css';
import NavPanel from './NavPanel';

type StandardLayoutProps = {
    title: string;
    active: string;
    children: ReactNode;
}

function StandardLayout({title, active, children}: StandardLayoutProps) {
    return (
        <>
            <div className='standard-layout-container'>
                <NavPanel active={active}/>
                <div className='standard-layout-panel'>
                    <h1 className='standard-layout-header'>{title}</h1>
                    {children}
                </div>
            </div>
        </>
    )
}

export default StandardLayout;
