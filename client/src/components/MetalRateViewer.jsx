import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const MetalRateViewer= ({ metal, purity }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (metal && purity) {
      axios
        .get(`/api/rate-history?metal=${metal}&purity=${purity}`)
        .then((res) => setHistory(res.data.history))
        .catch(() => setHistory([]));
    }
  }, [metal, purity]);

if (!history.length) return <p style={{ color: 'red' }}> </p>;

  return (
    <div style={{ marginTop: '2rem' }}>
    <Typography variant="h6" className="text-dark">Rate History</Typography>
    {!history.length ? (
      <p style={{ color: 'red' }}> No rate history found</p>
    ) : (
      <List dense>
        {history.map((item) => (
          <ListItem key={item._id}>
            <ListItemText
              primary={`₹${item.rate}`}
              secondary={new Date(item.rateDate).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    )}
  </div>
  );
};

export default MetalRateViewer;
