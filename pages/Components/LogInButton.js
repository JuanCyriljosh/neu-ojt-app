import { GoogleLogin } from '@react-oauth/google';

const LogInButton = ({ onSuccess, onError }) => {
  return (
    <div className="login-button-container">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default LogInButton;
