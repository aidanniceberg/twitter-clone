import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';

function HomePage() {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [authContext.isLoading]);

    return (
        <>
            <h1>{!isLoading && authContext.user?.username}</h1>
        </>
    )
}

export default HomePage;
