import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Dashboard = () => {
  const { notes, getNotes } = useContext(NoteContext);
  const [tagCounts, setTagCounts] = useState({});
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    // Count tags
    const tags = {};
    notes.forEach(note => {
      const tag = note.tag || 'General';
      tags[tag] = (tags[tag] || 0) + 1;
    });
    setTagCounts(tags);

    // Get recent 5 notes
    const sorted = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentNotes(sorted.slice(0, 5));
  }, [notes]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📊 Dashboard</h2>

      <div className="row g-4">
        {/* Total Notes */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center">
            <h5>Total Notes</h5>
            <h2 className="text-success">{notes.length}</h2>
          </div>
        </div>

        {/* Tag Summary */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h5>Tags Summary</h5>
            <ul className="list-group list-group-flush">
              {Object.entries(tagCounts).map(([tag, count]) => (
                <li key={tag} className="list-group-item d-flex justify-content-between">
                  <span>#{tag}</span>
                  <span className="badge bg-primary">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4">
            <h5>Recent Notes</h5>
            {recentNotes.length === 0 ? (
              <p className="text-muted">No recent notes found.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {recentNotes.map(note => (
                  <li key={note._id} className="list-group-item">
                    <strong>{note.title}</strong> – {note.tag || 'General'}<br />
                    <small className="text-muted">{new Date(note.date).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
