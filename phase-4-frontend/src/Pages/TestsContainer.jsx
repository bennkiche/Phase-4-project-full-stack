import React, { useEffect, useState } from "react";
import AddTestForm from "./AddTestForm";  // Assuming AddTestForm is in the same directory

const TestsContainer = () => {
  const [tests, setTests] = useState([]);
  const [editingTest, setEditingTest] = useState(null);
  const [updatedTest, setUpdatedTest] = useState({ name: "", initial: "" });

  // Fetch all tests from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tests")
      .then((response) => response.json())
      .then((data) => setTests(data))
      .catch((error) => console.error("Error fetching tests:", error));
  }, []);

  // Handle delete test
  const handleDeleteTest = (id) => {
    fetch(`http://127.0.0.1:5000/tests/${id}`, { method: "DELETE" })
      .then(() => {
        setTests(tests.filter((test) => test.id !== id));
        alert("Test deleted successfully!");
      })
      .catch((error) => console.error("Error deleting test:", error));
  };

  // Handle edit button click
  const handleEditClick = (test) => {
    setEditingTest(test);
    setUpdatedTest({ name: test.name, initial: test.initial });
  };

  // Handle update test
  const handleUpdateTest = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/tests/${editingTest.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTest),
    })
      .then((response) => response.json())
      .then((updatedTestData) => {
        setTests(
          tests.map((test) => (test.id === updatedTestData.id ? updatedTestData : test))
        );
        setEditingTest(null);
        alert("Test updated successfully!");
      })
      .catch((error) => console.error("Error updating test:", error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>All Tests</h1>

      {tests.length === 0 ? (
        <p style={styles.noTestsText}>No tests available. Add one from the form below!</p>
      ) : (
        <div style={styles.gridContainer}>
          {tests.map((test) => (
            <div key={test.id} style={styles.card}>
              <div style={styles.cardContent}>
                <h3 style={styles.testName}>{test.name}</h3>
                <p style={styles.testInitial}>by {test.initial}</p>
              </div>

              <div style={styles.buttonContainer}>
                <button onClick={() => handleEditClick(test)} style={styles.updateButton}>Update</button>
                <button onClick={() => handleDeleteTest(test.id)} style={styles.deleteButton}>Delete</button>
              </div>

              {editingTest && editingTest.id === test.id && (
                <form onSubmit={handleUpdateTest} style={styles.editForm}>
                  <input
                    type="text"
                    value={updatedTest.name}
                    onChange={(e) => setUpdatedTest({ ...updatedTest, name: e.target.value })}
                    placeholder="Name"
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={updatedTest.initial}
                    onChange={(e) => setUpdatedTest({ ...updatedTest, initial: e.target.value })}
                    placeholder="Initial"
                    style={styles.input}
                  />
                  <button type="submit" style={styles.saveButton}>Save Changes</button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Test Form */}
      <AddTestForm setTests={setTests} />
    </div>
  );
};

// Inline CSS Styles (same as in your previous component)
const styles = {
  container: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "20px",
  },
  noTestsText: {
    fontSize: "1.2em",
    color: "#666",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
  },
  cardContent: {
    marginBottom: "10px",
  },
  testName: {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#333",
  },
  testInitial: {
    fontSize: "1.1em",
    fontStyle: "italic",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  updateButton: {
    padding: "8px 12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editForm: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  saveButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TestsContainer;
