import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Autocomplete, Typography } from '@mui/material';
import { metalOptions } from './Autocomplte';
import { toast } from 'react-toastify';
import MetalRateViewer from './MetalRateViewer';

export default function RateForm() {
  const [purity, setPurity] = useState('');
  const [metal, setMetal] = useState('');
  const [rate, setRate] = useState('');
  const [rateDate, setRateDate] = useState('');
  const [latestRate, setLatestRate] = useState(null);


  useEffect(() => {
    if (metal && purity) {
      console.log(' useEffect triggered with:', metal, purity);

      axios
        .get(`/api/latest-rate?metal=${metal}&purity=${purity}`)
        .then((res) => {
          console.log(' Latest rate fetched:', res.data);
          setLatestRate(res.data.rate);
        })
        .catch((err) => {
          console.warn('Failed to fetch latest rate', err);
          setLatestRate(null);
        });
    }
  }, [metal, purity]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!metal || !purity || !rate || !rateDate) {
      toast.warn('All fields are required');
      return;
    }

    try {
      await axios.post('/api/create-purity', { metal, purity, rate, rateDate });
      toast.success('Rate saved');

      setRate('');
      setRateDate('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save rate');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        options={metalOptions}
        value={metal}
        onChange={(e, val) => {
          console.log('Selected metal:', val);
          setMetal(val || '')}}
        renderInput={(params) => <TextField {...params} label="Metal" />}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Purity"
        value={purity}
        onChange={(e) => setPurity(e.target.value)}
        fullWidth
        margin="normal"
      />

  
      {latestRate && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Last rate: ₹{latestRate.rate} on{' '}
          {new Date(latestRate.rateDate).toLocaleDateString()}
        </Typography>
      )}

      <TextField
        label="New Rate"
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Rate Date"
        type="date"
        value={rateDate}
        onChange={(e) => setRateDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save Rate
      </Button>

   
      {metal && purity && <MetalRateViewer metal={metal} purity={purity} />}
    </form>
  );
}
