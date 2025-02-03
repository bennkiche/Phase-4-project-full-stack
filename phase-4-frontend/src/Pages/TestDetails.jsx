import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddPriceForm from './AddPriceForm';

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Test, setTest] = useState(null);
  const [prices, setPrices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedTest, setUpdatedTest] = useState({ name: '', initials: '' });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/tests/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTest(data);
        setPrices(data.prices || []);
        setUpdatedTest({ name: data.name, initials: data.initials });
      })
      .catch((error) => console.error('Error fetching Test details:', error));
  }, [id]);

  // UPDATE Test details
  const handleUpdateTest = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/tests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTest),
    })
      .then((response) => response.json())
      .then((updatedTest) => {
        setTest(updatedTest);
        setEditMode(false);
      })
      .catch((error) => console.error('Error updating Test:', error));
  };

  // DELETE Test
  const handleDeleteTest = () => {
    fetch(`http://127.0.0.1:5000/tests/${id}`, { method: 'DELETE' })
      .then(() => navigate('/'))
      .catch((error) => console.error('Error deleting Test:', error));
  };

  if (!Test) return <p>Loading Test details...</p>;

  return (
    <div>
      <h1>{Test.name}</h1>
      <p>Author: {Test.initials}</p>

      <button onClick={() => setEditMode(!editMode)}>Update Test</button>
      <button onClick={handleDeleteTest} style={{ marginLeft: '10px', color: 'red' }}>
        Delete Test
      </button>

      {editMode && (
        <form onSubmit={handleUpdateTest}>
          <input
            type="text"
            value={updatedTest.name}
            onChange={(e) => setUpdatedTest({ ...updatedTest, name: e.target.value })}
            placeholder="Test Name"
          />
          <input
            type="text"
            value={updatedTest.initials}
            onChange={(e) => setUpdatedTest({ ...updatedTest, initials: e.target.value })}
            placeholder="Author Initials"
          />
          <button type="submit">Save Changes</button>
        </form>
      )}

      <h2>Prices</h2>
      {prices.length > 0 ? (
        <ul>
          {prices.map((price) => (
            <li key={price.id}>
              <p>{price.content}</p>
              <p>Rating: {price.rating} / 5</p>
              <p>By: {price.lab.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No prices yet.</p>
      )}

      <h2>Add a Price</h2>
      <AddPriceForm testId={id} setPrices={setPrices} />
    </div>
  );
};

export default TestDetails;
