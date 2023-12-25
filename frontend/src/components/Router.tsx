import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AuthContextProvider from '../AuthContext';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={
                    <AuthContextProvider>
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
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
