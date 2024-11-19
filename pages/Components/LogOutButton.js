// LogOutButton.js
import { googleLogout } from '@react-oauth/google';

const LogOutButton = ({ onLogout, className = '' }) => {
  const handleClick = () => {
    googleLogout(); 
    onLogout(); 
  };

  return (
    <button className={`logout-button ${className}`} onClick={handleClick}>
      Log Out
    </button>
  );
};

export default LogOutButton;