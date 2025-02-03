import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PricesSection = () => {
  const [prices, setPrices] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [labs, setLabs] = useState([]);
  const [tests, setTests] = useState([]);

  // Fetch all prices
  useEffect(() => {
    fetch("http://127.0.0.1:5000/prices")
      .then((response) => response.json())
      .then((data) => setPrices(data || []))
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  // Fetch all labs
  useEffect(() => {
    fetch("http://127.0.0.1:5000/labs")
      .then((response) => response.json())
      .then((data) => setLabs(data || []))
      .catch((error) => console.error("Error fetching labs:", error));
  }, []);

  // Fetch all tests
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tests")
      .then((response) => response.json())
      .then((data) => setTests(data || []))
      .catch((error) => console.error("Error fetching tests:", error));
  }, []);

  // Handle Add/Update Price
  const handleSubmit = (values, { resetForm }) => {
    const method = editingPrice ? "PUT" : "POST";
    const url = editingPrice
      ? `http://127.0.0.1:5000/prices/${editingPrice.id}`
      : "http://127.0.0.1:5000/prices";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editingPrice) {
          setPrices(prices.map((price) => (price.id === data.id ? data : price)));
          alert("Price updated successfully!");
        } else {
          setPrices([...prices, data]);
          alert("Price added successfully!");
        }
        resetForm();
        setEditingPrice(null);
      })
      .catch((error) => {
        console.error("Error saving price:", error);
        alert("Error saving price, please try again.");
      });
  };

  // Handle Delete Price
  const handleDeletePrice = (id) => {
    fetch(`http://127.0.0.1:5000/prices/${id}`, { method: "DELETE" })
      .then(() => {
        setPrices(prices.filter((price) => price.id !== id));
        alert("Price deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting price:", error);
        alert("Error deleting price, please try again.");
      });
  };

  // Validation schema for the form
  const validationSchema = Yup.object({
    amount: Yup.number().positive("Price must be a positive number").required("Price amount is required"),
    lab_id: Yup.string().required("Lab selection is required"),
    test_id: Yup.string().required("Test selection is required"),
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Prices</h1>

      {/* List of Prices */}
      {prices.length > 0 ? (
        <div style={styles.pricesGrid}>
          {prices.map((price) => (
            <div key={price.id} style={styles.priceCard}>
              <h3 style={styles.testName}>{price.test?.name || "Unknown Test"}</h3>
              <p style={styles.priceAmount}>Price: ${price.amount}</p>
              <p style={styles.lab}>Lab: {price.lab?.name || "Unknown Lab"}</p>
              <div style={styles.buttonGroup}>
                <button style={styles.editButton} onClick={() => setEditingPrice(price)}>
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => handleDeletePrice(price.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noPrices}>No prices available.</p>
      )}

      {/* Add/Update Price Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>{editingPrice ? "Edit Price" : "Add a New Price"}</h2>
        <Formik
          initialValues={editingPrice || { amount: "", lab_id: "", test_id: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} // Allow initial values to update when editing
        >
          <Form style={styles.form}>
            <label style={styles.label}>Price Amount:</label>
            <Field name="amount" type="number" style={styles.input} />
            <ErrorMessage name="amount" component="div" style={styles.error} />

            <label style={styles.label}>Select Lab:</label>
            <Field as="select" name="lab_id" style={styles.input}>
              <option value="">Select a lab</option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="lab_id" component="div" style={styles.error} />

            <label style={styles.label}>Select Test:</label>
            <Field as="select" name="test_id" style={styles.input}>
              <option value="">Select a test</option>
              {tests.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="test_id" component="div" style={styles.error} />

            <button type="submit" style={styles.submitButton}>
              {editingPrice ? "Update Price" : "Add Price"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

// **CSS Styles**
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  heading: { fontSize: "2em", color: "#333", marginBottom: "20px" },
  pricesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", width: "90%" },
  priceCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" },
  testName: { fontSize: "1.3em", fontWeight: "bold" },
  priceAmount: { fontSize: "1.1em", margin: "10px 0" },
  rating: { fontSize: "1.1em", fontWeight: "bold", color: "#f39c12" },
  lab: { fontSize: "0.9em", color: "#555" },
  buttonGroup: { marginTop: "10px" },
  editButton: { padding: "8px", marginRight: "10px", backgroundColor: "#3498db", color: "#fff", border: "none", borderRadius: "5px" },
  deleteButton: { padding: "8px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: "5px" },
  submitButton: { padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", fontSize: "1.2em" },
};

export default PricesSection;
