import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useUser } from './Context/UserContext'; 
import LogInButton from './Components/LogInButton';
import './index.css';

const LoginPage = () => {
  const { setUser } = useUser(); 
  const router = useRouter();

  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);
    const userData = response?.credential ? JSON.parse(atob(response.credential.split('.')[1])) : null;
    if (userData) {
      setUser({ name: userData.name });
      router.push('/Views/MainUI'); // Redirect to MainUI on successful login
    }
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed: ", response);
  };

  return (
    <GoogleOAuthProvider clientId="141483661606-jblacngl6vp2kqlrgtas8nmmrd6994fu.apps.googleusercontent.com">
      <div className="container">
        <h1>Login with Google</h1>
        <LogInButton
          className="login-button"
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
