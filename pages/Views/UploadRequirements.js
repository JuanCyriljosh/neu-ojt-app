import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../Context/UserContext';
import '../../styles/UploadRequirement.css';

const UploadRequirements = () => {
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleFileUpload = async (event, key) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        // Send file to API route
        const response = await fetch('/api/uploadFile', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          setFiles((prevFiles) => ({
            ...prevFiles,
            [key]: { file, url: data.blobUrl },
          }));
        } else {
          alert('File upload failed.');
        }
      } catch (error) {
        alert('Error uploading file: ' + error.message);
      } finally {
        setUploading(false);
      }
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleBackClick = () => {
    router.push('/Views/MainUI');
  };

  useEffect(() => {
    // Prevent any mismatches during SSR
  }, []);

  return (
    <div className="container">
      {/* Header bar with Back button */}
      <div className="headerBar">
        <div className="leftHeaderContent">
          <div className="profile">
            <div className="profileImagePlaceholder">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="profileImage" />
              ) : (
                <div className="profileImagePlaceholderText">U</div>
              )}
            </div>
            <span className="profileName">{user.name || 'Guest'}</span>
          </div>
        </div>

        <div className="centerHeaderContent">
          <h1 className="headingTitle">Upload Requirements</h1>
        </div>

        <button className="backButton" onClick={handleBackClick}>
          Back to Main UI
        </button>
      </div>

      <div className="boxContainer">
        {['PDF Document 1', 'PDF Document 2', 'PDF Document 3', 'PDF Document 4'].map((label) => (
          <div className="box" key={label}>
            <span className="label">{label}:</span>
            <label htmlFor={`fileInput-${label}`} className="uploadBox">
              {files[label] ? files[label].file.name : 'Click to Upload'}
            </label>
            <input
              id={`fileInput-${label}`}
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={(e) => handleFileUpload(e, label)}
            />
            {files[label] && (
              <span className="fileName"> - {files[label].file.name}</span>
            )}
            {uploading && <div className="uploadingIndicator">Uploading...</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadRequirements;
