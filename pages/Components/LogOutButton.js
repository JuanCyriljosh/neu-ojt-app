import { googleLogout } from '@react-oauth/google';

const LogOutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={() => { 
      googleLogout(); 
      onLogout(); 
    }}>
      Log Out
    </button>
  );
};

export default LogOutButton;
