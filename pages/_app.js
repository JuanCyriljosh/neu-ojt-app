import '../styles/globals.css'; // Global styles for the app
import '../pages/index.css';    // Specific styles for the index page or other components
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider
import { UserProvider } from '../pages/Context/UserContext';  // Import your user context

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}> {/* Wrap with GoogleOAuthProvider */}
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
