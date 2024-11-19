// LogOutButton.js
import { googleLogout } from '@react-oauth/google';

const LogOutButton = ({ onLogout }) => {
  const handleClick = () => {
    googleLogout(); 
    onLogout(); 
  };

  return (
    <button className="logout-button" onClick={handleClick}>
      Log Out
    </button>
  );
};

export default LogOutButton;