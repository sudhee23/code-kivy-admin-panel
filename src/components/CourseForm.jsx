import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CourseForm.module.css';  

  const CourseForm = ({ course, onClose }) => {
    const initialFormData = {
      name: '',
      description: '',
      pdfUrl: '',
      cost: '',
      duration: '',
      rating: '',
      courseId: '',
      numberOfStudentsEnrolled: '',
      imageString: ''
    };
  
    const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (course) {
      setFormData({ ...course });
    }
  }, [course]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (course) {
        await axios.put(`http://localhost:5000/api/course/${course.courseId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/course/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setFormData(initialFormData);  // Clear form
      onClose();  // Close the form after submit
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h2 className={styles['form-header']}>
        {course ? 'Edit Course' : 'Create New Course'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter course name"
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="description">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Enter course description"
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
            placeholder="Enter course cost"
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="Enter course duration (e.g., 6 weeks)"
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter course rating (optional)"
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="pdfUrl">PDF URL</label>
          <input
            type="text"
            name="pdfUrl"
            value={formData.pdfUrl}
            onChange={handleChange}
            placeholder="Enter PDF URL (optional)"
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="imageString">Image URL</label>
          <input
            type="text"
            name="imageString"
            value={formData.imageString}
            onChange={handleChange}
            placeholder="Enter image URL (optional)"
          />
        </div>

        <div className={styles['button-group']}>
          <button type="submit" className={`${styles.btn} ${styles['btn-submit']}`}>
            Submit
          </button>
          <button type="button" className={`${styles.btn} ${styles['btn-cancel']}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
