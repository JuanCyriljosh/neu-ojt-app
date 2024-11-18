import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import LogInButton from './Components/LogInButton';  
import LogOutButton from './Components/LogOutButton';  
import './index.css'; // Import the updated CSS file

const LoginPage = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);
    const userData = response?.credential ? JSON.parse(atob(response.credential.split('.')[1])) : null;
    if (userData) {
      setUser({
        name: userData.name,
      });
    }
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed: ", response);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId="141483661606-jblacngl6vp2kqlrgtas8nmmrd6994fu.apps.googleusercontent.com">
      <div className="container">
        <h1>Login with Google</h1>
        {!user ? (
          <LogInButton
            className="login-button"
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        ) : (
          <div>
            <h2>Hello, {user.name}!</h2>
            <LogOutButton className="logout-button" onLogout={handleLogout} />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
