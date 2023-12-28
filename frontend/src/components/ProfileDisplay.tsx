import { Link } from "react-router-dom";
import { User } from "../types";

type ProfileDisplayProps = {
    user: User;
}

function ProfileDisplay({user}: ProfileDisplayProps) {
    return (
        <Link to={`/users/${user.username}`} className='post-display-wrapper'>
            <div className='profile-medium-text'>@{user.username} ({user.first_name} {user.last_name})</div>
        </Link>
    )
}

export default ProfileDisplay;
