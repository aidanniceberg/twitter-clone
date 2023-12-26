import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import StandardLayout from './StandardLayout';

function HomePage() {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [authContext.isLoading]);

    return (
        <StandardLayout active='home' title='Home'>
            <p>placeholder</p>
        </StandardLayout>
    )
}

export default HomePage;
