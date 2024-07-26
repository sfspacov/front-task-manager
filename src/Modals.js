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
      style={{ position: 'absolute', top: 0, right: 0 }}
    >
      <Toast.Header>
        <strong className="mr-auto">Success</strong>
      </Toast.Header>
      <Toast.Body>Task saved successfully.</Toast.Body>
    </Toast>
  </>
);

export default Modals;
