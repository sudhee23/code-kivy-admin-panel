import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "../CourseForm";
import { Modal, Button } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";

const API_URL = "http://localhost:5000/api/course/";

const CourseOperations = () => {
  const [courses, setCourses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDeleteCourse = async (course, e) => {
    e.stopPropagation(); // Prevent the row click from opening the modal
    setDeleteCourse(course);
  };

  const confirmDeleteCourse = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/${deleteCourse.courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCourses();
      setDeleteCourse(null);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCreateCourse = () => {
    setSelectedCourse(null); // Reset the form for creating a new course
    setIsFormOpen(!isFormOpen); // Toggle the form visibility
  };

  const handleEditCourse = (course, e) => {
    e.stopPropagation(); // Prevent the row click from opening the modal
    setSelectedCourse(course); // Pass the course data to the form for editing
    setIsFormOpen(true); // Open the form
  };

  const handleRowClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true); // Show modal with course details
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchCourses(); // Refresh the list after creating/updating
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="course-operations">
      <div className="header">
        <h2>Manage Courses</h2>
        <button className="btn btn-accent" onClick={handleCreateCourse}>
          {isFormOpen ? "Close" : "Create New Course"}
        </button>
      </div>

      {isFormOpen && (
        <CourseForm course={selectedCourse} onClose={handleFormClose} />
      )}

      <table className="course-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.courseId} onClick={() => handleRowClick(course)}>
                <td>{course.courseId}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={(e) => handleEditCourse(course, e)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={(e) => handleDeleteCourse(course, e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No courses available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for showing full course details */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Details</Modal.Title>
        </Modal.Header>
        {selectedCourse && (
          <Modal.Body>
            <p>
              <strong>Course ID:</strong> {selectedCourse.courseId}
            </p>
            <p>
              <strong>Title:</strong> {selectedCourse.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedCourse.description}
            </p>
            <p>
              <strong>Cost:</strong> {selectedCourse.cost}
            </p>
            <p>
              <strong>Duration:</strong> {selectedCourse.duration}
            </p>
            <p>
              <strong>Rating:</strong> {selectedCourse.rating}
            </p>
            <p>
              <strong>Number of Students Enrolled:</strong>{" "}
              {selectedCourse.numberOfStudentsEnrolled}
            </p>
            {selectedCourse.pdfUrl && (
              <p>
                <strong>PDF URL:</strong>{" "}
                <a href={selectedCourse.pdfUrl}>Download PDF</a>
              </p>
            )}
            {selectedCourse.imageString && (
              <img src={selectedCourse.imageString} alt="Course" width="100%" />
            )}
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        isOpen={deleteCourse}
        onClose={() => setDeleteCourse(null)}
        onConfirm={confirmDeleteCourse}
        title="Confirm Delete Course"
        message="Are you sure you want to delete this course?"
      />
    </div>
  );
};

export default CourseOperations;
