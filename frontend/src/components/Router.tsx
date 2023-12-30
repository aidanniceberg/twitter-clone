import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import UserPage from './UserPage';
import AuthContextProvider from '../AuthContext';
import EditProfilePage from './EditProfilePage';
import FollowingsPage from './FollowingsPage';
import FollowersPage from './FollowersPage';
import SearchPage from './SearchPage';
import PostPage from './PostPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={
                    <AuthContextProvider>
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/users/:username" element={<UserPage />}/>
                            <Route path="/users/:username/edit" element={<EditProfilePage />}/>
                            <Route path="/users/:username/following" element={<FollowingsPage />}/>
                            <Route path="/users/:username/followers" element={<FollowersPage />}/>
                            <Route path="/post" element={<PostPage />}/>
                            <Route path="*" element={<h1>Page Not Found</h1>} />
                        </Routes>
                    </AuthContextProvider>
                }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
