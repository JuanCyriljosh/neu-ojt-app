import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useUser } from './Context/UserContext'; // Import the useUser hook
import LogInButton from './Components/LogInButton';
import LogOutButton from './Components/LogOutButton';
import './index.css';

const LoginPage = () => {
  const { user, setUser } = useUser(); // Access user state and setUser function
  const router = useRouter();

  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);
    const userData = response?.credential ? JSON.parse(atob(response.credential.split('.')[1])) : null;
    if (userData) {
      setUser({ name: userData.name });
      router.push('/Views/MainUI'); // Navigate to MainUI
    }
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed: ", response);
  };

  const handleLogout = () => {
    setUser(null);
    router.push('/'); // Redirect to the login page after logout
  };

  return (
    <GoogleOAuthProvider clientId="141483661606-jblacngl6vp2kqlrgtas8nmmrd6994fu.apps.googleusercontent.com">
      <div className="container">
        {!user ? (
          <>
            <h1>Login with Google</h1>
            <LogInButton
              className="login-button"
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </>
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
