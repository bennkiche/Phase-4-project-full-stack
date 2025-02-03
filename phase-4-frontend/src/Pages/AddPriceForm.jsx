import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddPriceForm = ({ testId }) => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    fetch('https://phase-4-project-c37g.onrender.com/labs')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Labs:", data);
        setLabs(data);
      })
      .catch((error) => console.error('Error fetching labs:', error));
  }, []);

  const initialValues = {
    amount: '',
    rating: '',
    lab_id: '',
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required('Amount is required'),
    rating: Yup.number().min(1).max(5).required('Rating is required'),
    lab_id: Yup.string().required('Lab selection is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch('http://127.0.0.1:5000/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, test_id: testId }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Price added successfully!');
        resetForm();
      })
      .catch((error) => console.error('Error adding price:', error));
  };

  return (
    <div>
      <h2>Add Price</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label>Price Amount:</label>
            <Field name="amount" type="number" />
            <ErrorMessage name="amount" component="div" />
          </div>
          <div>
            <label>Select Lab:</label>
            <Field as="select" name="lab_id">
              <option value="">Select a lab</option>
              {labs.map(lab=> (
                <option key={lab.id} value={lab.id}>{lab.name}</option>
              ))}
            </Field>
            <ErrorMessage name="lab_id" component="div" />
          </div>
          <div>
            <label>Select Test:</label>
            <Field as="select" name="test_id">
              <option value="">Select a test</option>
              {tests.map(test=> (
                <option key={test.id} value={test.id}>{test.name}</option>
              ))}
            </Field>
            <ErrorMessage name="test_id" component="div" />
          </div>
          <button type="submit">Submit Price</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddPriceForm;