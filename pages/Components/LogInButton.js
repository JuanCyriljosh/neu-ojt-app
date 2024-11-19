import dynamic from 'next/dynamic';

// Dynamically import GoogleLogin with no SSR
const GoogleLogin = dynamic(() => import('@react-oauth/google').then(mod => mod.GoogleLogin), { ssr: false });

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
