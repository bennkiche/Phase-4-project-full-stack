import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddLabForm = ({ setLabs }) => {
  const initialValues = {
    name: '',
    email: '',
  };

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
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert('Lab added successfully!');
          setLabs((prevLabs) => [...prevLabs, data]); // Update state
          resetForm();
        }
      })
      .catch((error) => console.error('Error adding lab:', error));
  };
  

  return (
    <div>
      <h2>Add a New Lab</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <label>Name:</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />

          <label>Email:</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />

          <button type="submit">Add Lab</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddLabForm;