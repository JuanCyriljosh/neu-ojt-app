import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useUser } from './Context/UserContext'; 
import LogInButton from './Components/LogInButton';
import './index.css';
import '../styles/globals.css';


const LoginPage = () => {
  const { setUser } = useUser(); 
  const router = useRouter();

  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);
    
    const userData = response?.credential ? JSON.parse(atob(response.credential.split('.')[1])) : null;
    
    if (userData) {
      const { name, email, picture } = userData;
      
      setUser({
        name,
        email,
        profilePicture: picture, 
      });
      
      router.push('/Views/MainUI');
    }
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed: ", response);
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
