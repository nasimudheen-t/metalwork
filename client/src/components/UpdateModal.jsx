import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateModal = ({ id, onClose ,onUpdate}) => {
  const [formData, setFormData] = useState({
    metal: '',
    purity: '',
    rate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing data
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/purity/${id}`);
        const { metal, purity, rate } = response.data.purity;
        setFormData({ metal, purity, rate });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch purity by ID:', err);
        setError('Failed to load purity data.');
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle update
  const handleUpdate = async () => {
    const {metal,purity,rate,rateDate} = formData
    try {

      if(!metal || !purity || !rate || !rateDate){
        toast.warn("Please fill in all required fields")
      }
      await axios.put(`/api/update-purity/${id}`, formData);
      if(onUpdate) onUpdate();
      toast.success('Purity updated successfully!');
      onClose(); // close modal after update
    } catch (err) {
      toast.error('Failed to update purity:', err);
      alert('Error updating purity');
    }
  };



  if (loading) return <div style={styles.overlay}><div style={styles.modal}>Loading...</div></div>;
  if (error) return <div style={styles.overlay}><div style={styles.modal}>{error}</div></div>;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Update Purity</h2>

        <div style={styles.field}>
          <label>Metal:</label>
          <input name="metal" value={formData.metal} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.field}>
          <label>Purity:</label>
          <input name="purity" value={formData.purity} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.field}>
          <label>Rate:</label>
          <input name="rate" value={formData.rate} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.actions}>
          <button onClick={handleUpdate} style={{ ...styles.button, backgroundColor: '#3498db' }}>Save</button>
          <button onClick={onClose} style={{ ...styles.button, backgroundColor: '#95a5a6' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '400px'
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  field: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  button: {
    flex: 1,
    padding: '10px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0 5px'
  }
};

export default UpdateModal;
