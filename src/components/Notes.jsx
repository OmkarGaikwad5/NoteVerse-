import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import '../styles/Note.css';

const Notes = ({ showAlert }) => {
  const { filteredNotes, getNotes, addNote, editNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const [newNote, setNewNote] = useState({ title: '', description: '', tag: '' });
  const [editNoteData, setEditNoteData] = useState({ id: '', title: '', description: '', tag: '' });
  const [viewNoteData, setViewNoteData] = useState(null);

  const refCloseView = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getNotes();
    }
  }, [getNotes, navigate]);

  // ────────────────────────────
  // 🔹 View Note Modal
  const viewNote = (note) => {
    setViewNoteData(note);
    const modal = new window.bootstrap.Modal(document.getElementById('viewNoteModal'));
    modal.show();
  };

  // ────────────────────────────
  // 🔹 Add Note Handler
  const handleAddNote = async () => {
    if (newNote.title.trim().length < 5 || newNote.description.trim().length < 5) {
      showAlert('Title and Description must be at least 5 characters', 'warning');
      return;
    }

    try {
      await addNote(newNote.title, newNote.description, newNote.tag);
      setNewNote({ title: '', description: '', tag: '' });
      getNotes();
      showAlert('Note added successfully', 'success');

      const modal = window.bootstrap.Modal.getInstance(document.getElementById('addNoteModal'));
      modal.hide();
    } catch (err) {
      showAlert('Failed to add note', 'danger',err);
    }
  };

  // ────────────────────────────
  // 🔹 Edit Note Setup & Submit
  const handleEditClick = (note) => {
    setEditNoteData({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag || '',
    });
    const modal = new window.bootstrap.Modal(document.getElementById('editNoteModal'));
    modal.show();
  };

  const handleEditNote = async () => {
    if (editNoteData.title.trim().length < 5 || editNoteData.description.trim().length < 5) {
      showAlert('Title and Description must be at least 5 characters', 'warning');
      return;
    }

    try {
      await editNote(editNoteData.id, editNoteData.title, editNoteData.description, editNoteData.tag);
      showAlert('Note updated successfully', 'success');
      getNotes();

      const modal = window.bootstrap.Modal.getInstance(document.getElementById('editNoteModal'));
      modal.hide();
    } catch (err) {
      showAlert('Failed to update note', 'danger',err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">Your Notes</h2>

      {/* 🔘 Add Note Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-gradient fw-semibold px-4 py-2 rounded-pill shadow"
          data-bs-toggle="modal"
          data-bs-target="#addNoteModal"
        >
          <i className="fas fa-plus me-2"></i>Add Note
        </button>
      </div>

     <div className="row">
  {filteredNotes.length > 0 ? (
    filteredNotes.map((note) => (
      <Noteitem
        key={note._id}
        note={note}
        showAlert={showAlert}
        viewNote={viewNote}
        updateNote={handleEditClick}
      />
    ))
  ) : (
    <p className="text-muted">No matching notes found.</p>
  )}
</div>


      {/* 🔍 View Note Modal */}
   <div className="modal fade" id="viewNoteModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-md">
    <div
      className="modal-content border-0 rounded-4"
      style={{
        background: 'linear-gradient(to bottom right, #fdfbfb, #ebedee)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
        color: '#212529',
      }}
    >
      {/* Header */}
      <div
        className="modal-header border-0 rounded-top-4"
        style={{
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          color: 'white',
        }}
      >
        <h5 className="modal-title fw-semibold fs-4">🗒️ View Your Note</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      {/* Body */}
      <div className="modal-body px-4 py-3">
        {viewNoteData ? (
          <>
            <h4 className="fw-bold text-dark">{viewNoteData.title}</h4>
            <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
              {viewNoteData.description}
            </p>
            {viewNoteData.tag && (
              <span
                className="badge rounded-pill"
                style={{
                  background: 'linear-gradient(to right, #ff9966, #ff5e62)',
                  color: 'white',
                  padding: '0.5em 1em',
                  fontSize: '0.9rem',
                }}
              >
                #{viewNoteData.tag}
              </span>
            )}
          </>
        ) : (
          <p className="text-center text-muted">No note selected</p>
        )}
      </div>

      {/* Footer */}
      <div className="modal-footer border-0 px-4 pb-4">
        <button
          type="button"
          className="btn btn-outline-dark rounded-pill px-4"
          data-bs-dismiss="modal"
          ref={refCloseView}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>



      {/* ➕ Add Note Modal */}
      <div className="modal fade" id="addNoteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <div className="modal-header bg-dark text-white border-0 rounded-top-4">
              <h5 className="modal-title">📝 Create a New Note</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-4">
              <input
                type="text"
                className="form-control mb-3 shadow-sm"
                placeholder="Enter Title (min 5 characters)"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                className="form-control mb-3 shadow-sm"
                rows={4}
                placeholder="Enter Description (min 5 characters)"
                value={newNote.description}
                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              ></textarea>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Enter Tag (optional)"
                value={newNote.tag}
                onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
              />
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={handleAddNote}
                disabled={newNote.title.trim().length < 5 || newNote.description.trim().length < 5}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Edit Note Modal */}
 <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div
      className="modal-content border-0 rounded-4"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
        color: '#212529',
      }}
    >
      {/* Header */}
      <div className="modal-header border-0 pb-0 pt-4 px-4">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <h5 className="modal-title fw-semibold fs-4">✏️ Edit Note</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>

      {/* Body */}
      <div className="modal-body px-4 pt-3 pb-2">
        <div className="mb-3">
          <label htmlFor="editTitle" className="form-label fw-medium">
            Title <span className="text-muted">(min 5 characters)</span>
          </label>
          <input
            type="text"
            id="editTitle"
            className="form-control form-control-lg"
            placeholder="Meeting Notes"
            value={editNoteData.title}
            onChange={(e) => setEditNoteData({ ...editNoteData, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="editDescription" className="form-label fw-medium">
            Description <span className="text-muted">(min 5 characters)</span>
          </label>
          <textarea
            id="editDescription"
            className="form-control form-control-lg"
            placeholder="Enter note description"
            rows="4"
            value={editNoteData.description}
            onChange={(e) => setEditNoteData({ ...editNoteData, description: e.target.value })}
          ></textarea>
        </div>

        <div className="mb-2">
          <label htmlFor="editTag" className="form-label fw-medium">Tag <span className="text-muted">(optional)</span></label>
          <input
            type="text"
            id="editTag"
            className="form-control form-control-lg"
            placeholder="e.g. #Work or #Ideas"
            value={editNoteData.tag}
            onChange={(e) => setEditNoteData({ ...editNoteData, tag: e.target.value })}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer border-0 px-4 pb-4 pt-2">
        <button
          type="button"
          className="btn btn-light px-4 py-2 rounded-pill"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn px-4 py-2 rounded-pill text-white"
          style={{
            background: 'linear-gradient(to right, #6366f1, #4f46e5)',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          }}
          onClick={handleEditNote}
          disabled={
            editNoteData.title.trim().length < 5 ||
            editNoteData.description.trim().length < 5
          }
        >
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>



    </div>
  );
};

export default Notes;
