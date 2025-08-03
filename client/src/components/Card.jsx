import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateModal from './UpdateModal';
import { toast } from 'react-toastify';

const Card = () => {
  const [item, setItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [metalSearch, setMetalSearch] = useState('');
  const [puritySearch, setPuritySearch] = useState('');

  const getItem = async (filters = {}) => {
    try {

      const params = {};
      if (filters.metal) params.metal = filters.metal;
      if (filters.purity) params.purity = filters.purity;

      const response = await axios.get('/api/get-purity', { params });
      setItem(response.data.purity);
      console.log('response:', response.data.purity);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch purity data');
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      toast.success('Purity deleted successfully!');
      await getItem({ metal: metalSearch, purity: puritySearch });
    } catch (err) {
      toast.error('Failed to delete purity');
    }
  };

  const handleUpdateClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleSearch = () => {
    getItem({ metal: metalSearch, purity: puritySearch });
  };

  const handleClear = () => {
    setMetalSearch('');
    setPuritySearch('');
    getItem(); // Load all data again
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Search UI */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Metal"
          value={metalSearch}
          onChange={(e) => setMetalSearch(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Search Purity"
          value={puritySearch}
          onChange={(e) => setPuritySearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
        <button onClick={handleClear} style={styles.clearButton}>Clear</button>
      </div>

      {/* Cards */}
      {item.map((data, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.title}>Metal: {data.metal}</h3>
          <p>Purity: {data.purity}</p>
          <p>Rate: ₹{data.rate}</p>
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, backgroundColor: '#3498db' }}
              onClick={() => handleUpdateClick(data._id)}
            >
              Update
            </button>
            <button
              style={{ ...styles.button, backgroundColor: '#e74c3c' }}
              onClick={() => handleDelete(data._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {openModal && (
        <UpdateModal
          id={selectedId}
          onClose={() => setOpenModal(false)}
          onUpdate={() => getItem({ metal: metalSearch, purity: puritySearch })}
        />
      )}
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  input: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '150px',
  },
  searchButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  clearButton: {
    backgroundColor: '#888',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '300px',
    margin: '20px auto',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 10px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  button: {
    flex: 1,
    padding: '10px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Card;
