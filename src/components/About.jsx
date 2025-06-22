import React from 'react';

const About = ({ isDarkMode }) => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-primary">NoteVerse</span>
        </h1>
        <p className="lead text-muted">
          Your secure, powerful, and intuitive note-taking solution.
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h3 className="card-title mb-3">📘 What is NoteVerse?</h3>
              <p className="card-text">
                <strong>NoteVerse</strong> is a modern note-taking web application designed to help you easily create,
                edit, and manage your personal notes from anywhere. Built with performance and simplicity in mind, NoteVerse
                ensures that your ideas are captured and organized efficiently.
              </p>
              <p>It includes features such as:</p>
              <ul>
                <li>📝 Add, edit, and delete notes in real-time</li>
                <li>🔐 Secure user authentication (JWT-based)</li>
                <li>📂 Organize notes with tags</li>
                <li>💡 Clean and responsive UI using Bootstrap</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="card-title mb-3">🧱 Tech Stack</h3>
              <p className="card-text">
                NoteVerse is built using the <strong>MERN</strong> stack — a powerful combination for modern web apps:
              </p>
              <ul>
                <li><strong>MongoDB</strong> – for storing user notes securely</li>
                <li><strong>Express.js</strong> – backend API with RESTful services</li>
                <li><strong>React</strong> – dynamic and reactive user interface</li>
                <li><strong>Node.js</strong> – server-side JavaScript runtime</li>
              </ul>
              <p>
                Styled using <strong>Bootstrap 5</strong> to ensure a responsive and professional user experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p style={{ color: isDarkMode ? 'white' : '#6c757d' }}>
          Made with 💙 by the NoteVerse Team
        </p>
      </div>
    </div>
  );
};

export default About;
