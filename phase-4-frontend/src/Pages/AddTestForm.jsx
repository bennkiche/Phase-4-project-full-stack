import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddTestForm = ({ setTests }) => {
  const initialValues = {
    name: "",
    initial: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    initial: Yup.string().required("Initial is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch("http://127.0.0.1:5000/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Test added successfully!");
        resetForm();
        setTests((prevTests) => [...prevTests, data]);
      })
      .catch((error) => console.error("Error adding test:", error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add a New Test</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={styles.form}>
          <label style={styles.label}>Name:</label>
          <Field name="name" type="text" style={styles.input} />
          <ErrorMessage name="name" component="div" style={styles.error} />

          <label style={styles.label}>Initial:</label>
          <Field name="initial" type="text" style={styles.input} />
          <ErrorMessage name="initial" component="div" style={styles.error} />

          <button type="submit" style={styles.button}>Add Test</button>
        </Form>
      </Formik>
    </div>
  );
};

// **Inline CSS Styles**
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", 
  },
  heading: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    fontSize: "1em",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "1.1em",
    color: "#fff",
    backgroundColor: "#28a745", 
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default AddTestForm;
