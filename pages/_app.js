import '../styles/globals.css'; // Import your global CSS here
import '../pages/index.css'; // If you want to include index.css globally, do it here
import { UserProvider } from '../pages/Context/UserContext'; 

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
