import { UserProvider } from '../pages/Context/UserContext'; // Import UserProvider for global state
import '../styles/globals.css'; // Your global styles

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
