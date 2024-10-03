import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RegisteredStudents.module.css'; // Assuming you're using CSS Modules

const API_URL = 'http://localhost:5000/api/course/';

const RegisteredStudents = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

 
  useEffect(() => {
    // Fetch the list of courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get(API_URL);
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = async (courseId,courseName) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_URL}${courseId}/students`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setSelectedCourse(courseName);
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className={styles['students-container']}>
      <h2>Registered Students</h2>

      {/* Display available courses */}
      <div className={styles['course-buttons']}>
        {courses.map((course) => (
          <button
            key={course.courseId}
            onClick={() => handleCourseClick(course.courseId,course.name)}
            className={styles['course-btn']}
          >
            {course.name}
          </button>
        ))}
      </div>

      {/* Display students for the selected course */}
      {selectedCourse && (
        <div className={styles['students-table']}>
          <h3>Students Registered in {selectedCourse}</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No students registered in this course.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisteredStudents;