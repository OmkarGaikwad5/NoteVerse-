import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import "../styles/Note.css"

const Noteitem = ({ note, updateNote, viewNote, showAlert }) => {
  const { deleteNote } = useContext(NoteContext);

  const handleDelete = () => {
    deleteNote(note._id);
    showAlert("Note deleted successfully", "success");
  };

  const handleDownload = () => {
  const content = `Title: ${note.title}\n\nDescription:\n${note.description}\n\nTag: ${note.tag || 'None'}`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${note.title || 'note'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
  <div className="card h-100 shadow-sm border-0 rounded-4">
    <div className="card-body d-flex flex-column justify-content-between">
      {/* Title & Icons */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5
          className="card-title text-truncate mb-0"
          style={{ maxWidth: '65%' }}
          title={note.title}
        >
          {note.title}
        </h5>
        <div className="d-flex">
          <i
            className="far fa-eye text-success mx-1"
            style={{ cursor: 'pointer' }}
            title="View"
            onClick={() => viewNote(note)}
          ></i>
          <i
            className="far fa-edit text-primary mx-1"
            style={{ cursor: 'pointer' }}
            title="Edit"
            onClick={() => updateNote(note)}
          ></i>
          <i
            className="far fa-trash-alt text-danger mx-1"
            style={{ cursor: 'pointer' }}
            title="Delete"
            onClick={handleDelete}
          ></i>
          <i
  className="fas fa-download text-success ms-2"
  title="Download"
  role="button"
  onClick={handleDownload}
/>

        </div>
      </div>

      {/* Description */}
      <p className="card-text mt-2" style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>
        {note.description.length > 120
          ? note.description.slice(0, 120) + '...'
          : note.description}
      </p>

      {/* Tag Badge */}
      {note.tag && (
        <div className="mt-3">
          <span
            className="badge rounded-pill"
            style={{
              background: 'linear-gradient(to right, #ff6a00, #ee0979)',
              color: '#fff',
              fontSize: '0.75rem',
              padding: '0.45em 0.8em',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}
          >
            #{note.tag}
          </span>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default Noteitem;
