import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

function Home() {
  return (
    <div className="container py-4">
      {/* AddNote Section */}
      <section className="mb-4 p-4 rounded shadow-sm bg-body-tertiary">
        <h2 className="mb-3 fw-semibold text-success">Add a New Note</h2>
        <AddNote />
      </section>

      {/* Notes Section */}
      <section className="p-4 rounded shadow-sm bg-body-tertiary">
        <h2 className="mb-3 fw-semibold text-primary">Your Notes</h2>
        <Notes />
      </section>
    </div>
  );
}

export default Home;
