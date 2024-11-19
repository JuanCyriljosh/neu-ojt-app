// LogOutButton.js
import { googleLogout } from '@react-oauth/google';

const LogOutButton = ({ onLogout }) => {
  const handleClick = () => {
    googleLogout(); // Call the Google logout function
    onLogout(); // Call the onLogout function passed as a prop
  };

  return (
    <button className="logout-button" onClick={handleClick}>
      Log Out
    </button>
  );
};

export default LogOutButton;