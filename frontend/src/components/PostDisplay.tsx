import './style.css';
import { Post } from '../types';
import { Link } from 'react-router-dom';
import { dateToAgo } from '../utils'

type PostDisplayProps = {
    post: Post;
    showAuthor?: boolean;
}

function PostDisplay({post, showAuthor = true}: PostDisplayProps) {
    return (
        <>
            <div className='post-display-wrapper'>
                <div className='post-display-header'>
                    {showAuthor && <Link to={`/users/${post.author}`} className='post-display-author'>@{post.author}</Link>}
                    <p className='post-header-fill'>{post.created_at && dateToAgo(new Date(post.created_at))}</p>
                </div>
                <Link to={`/posts/${post.id}`}>{post.content}</Link>
            </div>
        </>
    )
}

export default PostDisplay;
