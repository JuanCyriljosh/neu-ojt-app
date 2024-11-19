import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useUser } from './Context/UserContext'; 
import LogInButton from './Components/LogInButton';
import './index.css';

const LoginPage = () => {
  const { setUser } = useUser(); 
  const router = useRouter();

  // Handle successful login
  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);
    
    // Decode the JWT to get user information
    const userData = response?.credential ? JSON.parse(atob(response.credential.split('.')[1])) : null;
    
    if (userData) {
      // Extract user data like name, email, and profile picture
      const { name, email, picture } = userData;
      
      // Set user details into the context or state
      setUser({
        name,
        email,
        profilePicture: picture, // Store profile picture URL
      });
      
      // Redirect to the main UI page after login
      router.push('/Views/MainUI');
    }
  };

  // Handle login failure
  const handleLoginFailure = (response) => {
    console.log("Login Failed: ", response);
    // Optionally, you can show a failure message or redirect
  };

  return (
    <GoogleOAuthProvider clientId="141483661606-jblacngl6vp2kqlrgtas8nmmrd6994fu.apps.googleusercontent.com">
      <div className="container">
        <div className="card">
          <h1>Login with School Email</h1>
          <LogInButton
            className="login-button"
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
