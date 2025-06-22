import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext.js';

const AddNote = () => {
  const { addNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="mb-4 text-center text-primary">Add a New Note</h3>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
              placeholder="Enter a short title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
              placeholder="Describe the note..."
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label fw-semibold">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              placeholder="Optional tag"
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={note.title.length < 5 || note.description.length < 5}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
