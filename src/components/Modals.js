// src/Modal.js
import React from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';

const Modals = ({
  showDeleteModal,
  handleCloseDeleteModal,
  handleConfirmDelete,
  showErrorModal,
  handleCloseErrorModal,
  showSuccessToast,
  handleCloseSuccessToast
}) => (
  <>
    {/* Delete Confirmation Modal */}
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
        <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>

    {/* Error Modal */}
    <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>An error occurred while processing your request. Please try again later.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseErrorModal}>Close</Button>
      </Modal.Footer>
    </Modal>

    {/* Success Toast */}
    <Toast
      onClose={handleCloseSuccessToast}
      show={showSuccessToast}
      delay={3000}
      autohide
      style={{
        position: 'absolute',
        top: '10px', // Adjust the vertical position
        left: '50%',
        transform: 'translateX(-50%)', // Center horizontally
        zIndex: 1050, // Ensure it appears above other elements
        backgroundColor: '#28a745', // Green background for the whole toast
        color: '#fff', // White text
      }}
    >
      <Toast.Header
        style={{
          backgroundColor: '#1c7430', // Dark green background for the header
          color: '#fff', // White text
        }}
      >
        <strong className="mr-auto">Success</strong>
      </Toast.Header>
      <Toast.Body
        style={{
          backgroundColor: '#28a745', // Green background for the body
          color: '#e6f9e6', // Light green text
        }}
      >
        Task saved successfully.
      </Toast.Body>
    </Toast>

  </>
);

export default Modals;
