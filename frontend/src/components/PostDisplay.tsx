import './style.css';
import { Post } from '../types';
import { Link } from 'react-router-dom';
import { dateToAgo } from '../utils'
import LikeDisplay from './LikeDisplay';

type PostDisplayProps = {
    post: Post;
    showChildren?: boolean;
    depth?: number;
}

function PostDisplay({post, showChildren = false, depth = 0}: PostDisplayProps) {

    const generateBuffer = () => {
        const buffers = [];
        for (let i = 0; i < depth; i++) {
            buffers.push(<div key={`${depth}-${i}`} className='post-response-buffer'></div>);
        }
        return buffers;
    }

    return (
        <>
            <div className='post-display-wrapper'>
                {generateBuffer()}
                <div className='post-display-content-wrapper'>
                    <div className='post-display-header'>
                        <Link to={`/users/${post.author}`} className='post-display-author'>@{post.author}</Link>
                        <p className='post-header-fill'>{post.created_at && dateToAgo(new Date(post.created_at))}</p>
                    </div>
                    {
                        depth === 0 ?
                        <Link to={`/posts/${post.id}`}>{post.content}</Link>
                        :
                        <p>{post.content}</p>
                    }
                </div>
                <div className='flex-break'></div>
                {generateBuffer()}
                <div className='post-meta-wrapper'>
                    <LikeDisplay id={post.id} likes={post.likes} />
                </div>
            </div>
            {
                showChildren &&
                post.responses &&
                post.responses.length > 0 &&
                <div className='post-display-response-wrapper'>
                    {post.responses.map((response) => {
                        return <PostDisplay key={response.id} post={response} showChildren={showChildren} depth={depth+1}/>
                    })}
                </div>
            }
        </>
    )
}

export default PostDisplay;
