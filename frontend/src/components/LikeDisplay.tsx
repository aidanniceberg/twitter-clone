import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { getUserLikes, like, unlike } from '../services';
import { Link } from 'react-router-dom';

type LikeDisplayProps = {
    id: number;
    likes: number;
}

function LikeDisplay({id, likes}: LikeDisplayProps) {
    const authContext = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(likes);

    const toggleLike = () => {
        if (isLiked) {
            unlike(authContext.token, id, authContext?.user?.username ?? '')
                .then(() => {
                    setIsLiked(false);
                    setCurrentLikes(currentLikes - 1);
                });
        } else {
            like(authContext.token, id, authContext?.user?.username ?? '')
                .then(() => {
                    setIsLiked(true);
                    setCurrentLikes(currentLikes + 1)
                });
        }
    }

    useEffect(() => {
        if (!authContext.isAuthenticated || !authContext.user) return;
        getUserLikes(authContext.token, id, authContext.user.username)
            .then((response) => {
                setIsLiked(response);
            })
    }, [authContext, id]);

    return (
        <button className='flex-vertical-align like-display-wrapper'>
            <button className='flex-vertical-align' onClick={toggleLike}>
                {isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
            </button>
            <Link to={`http://localhost:3000/posts/${id}/likes`}>{currentLikes}</Link>
        </button>
    )
}

export default LikeDisplay;
