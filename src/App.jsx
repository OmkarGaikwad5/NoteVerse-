// App.jsx
import './styles/App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Landing from './components/Landing';

// ✅ Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />

        {/* ✅ Toast Container at global level */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />

        <Routes>
          <Route
            path="/"
            element={
              <DndProvider backend={HTML5Backend}>
                <Notes />
              </DndProvider>
            }
          />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Navigate to="/landing" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
