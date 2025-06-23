// src/context/notes/NoteState.js
import React, { useState } from "react";
import NoteContext from "./NoteContext";

const host = import.meta.env.VITE_APP_API_URL;

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = searchQuery
    ? notes.filter(note =>
      (note.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.tag || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    : notes;

  // ✅ Fetch all notes
  const getNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch notes:", json);
        setNotes([]);
        return;
      }

      setNotes(Array.isArray(json) ? json : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setNotes([]);
    }
  };

  // ✅ Add a note
  const addNote = async (title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token. Please login.");
        return;
      }

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const newNote = await response.json();

      if (!response.ok) {
        console.error("Add note failed:", newNote);
        return;
      }

      setNotes(prev => [...prev, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // ✅ Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      setNotes(prev =>
        prev.map(note => note._id === id ? { ...note, title, description, tag } : note)
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  // ✅ Delete a note
  const deleteNote = async (id) => {
    try {
      setNotes(prev => prev.filter(note => note._id !== id));
      const token = localStorage.getItem("token");
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        filteredNotes,
        setSearchQuery,
        getNotes,
        addNote,
        editNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
