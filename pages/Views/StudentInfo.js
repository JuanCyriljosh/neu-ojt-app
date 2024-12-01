// pages/Views/StudentInfo.js
import { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext'; 
import styles from '../../styles/Home.module.css'; 
import { useRouter } from 'next/router';

const StudentInfo = () => {
  const { user, updateUser } = useUser(); 
  const [formData, setFormData] = useState({
    name: '',
    studentID: '',
    course: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        studentID: user.studentID || '',
        course: user.course || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert('Student information updated successfully!');
    router.push('/Views/MainUI'); // Navigate back to MainUI
  };

  return (
    <div className={styles.container}>
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label>
          Student ID:
          <input
            type="text"
            name="studentID"
            value={formData.studentID}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label>
          Course:
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
};

export default StudentInfo;
