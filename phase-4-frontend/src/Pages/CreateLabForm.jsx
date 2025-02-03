import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateLabForm = () => {
  const initialValues = { name: '', email: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch('http://127.0.0.1:5000/labs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Lab created successfully!');
        resetForm();
      })
      .catch((error) => {
        console.error('Error creating lab:', error);
        alert('Failed to create lab. Please try again.');
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Lab</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form style={styles.form}>
          <div style={styles.fieldContainer}>
            <Field name="name" type="text" placeholder="Enter name" style={styles.input} />
            <ErrorMessage name="name" component="div" style={styles.error} />
          </div>

          <div style={styles.fieldContainer}>
            <Field name="email" type="email" placeholder="Enter email" style={styles.input} />
            <ErrorMessage name="email" component="div" style={styles.error} />
          </div>

          <button type="submit" style={styles.button}>Create Lab</button>
        </Form>
      </Formik>
    </div>
  );
};

// **Inline CSS Styles**
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  fieldContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1em',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
    marginTop: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '1.1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: 'bold',
    transition: '0.3s',
  },
};

export default CreateLabForm;
