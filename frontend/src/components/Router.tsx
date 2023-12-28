import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import UserPage from './UserPage';
import AuthContextProvider from '../AuthContext';
import FollowingsPage from './FollowingsPage';
import FollowersPage from './FollowersPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={
                    <AuthContextProvider>
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/users/:username" element={<UserPage />}/>
                            <Route path="/users/:username/following" element={<FollowingsPage />}/>
                            <Route path="/users/:username/followers" element={<FollowersPage />}/>
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
