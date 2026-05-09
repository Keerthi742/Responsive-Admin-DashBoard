import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid2 as Grid, 
  TextField, 
  Button, 
  MenuItem,
  Breadcrumbs,
  Link,
  InputAdornment
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { ordersData } from '../data/mockData';

const OrderFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    customer: '',
    total: '',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isEdit) {
      const order = ordersData.find(o => o.id === id);
      if (order) {
        setFormData(order);
      }
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving Order:', formData);
    alert(`Order ${isEdit ? 'updated' : 'created'} successfully! (Simulated)`);
    navigate('/orders');
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/dashboard" underline="hover" color="inherit">Dashboard</Link>
        <Link component={RouterLink} to="/orders" underline="hover" color="inherit">Orders</Link>
        <Typography color="text.primary">{isEdit ? 'Edit Order' : 'New Order'}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {isEdit ? `Edit Order ${id}` : 'Create New Order'}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/orders')}
        >
          Back to List
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Total Amount"
                name="total"
                value={formData.total}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              startIcon={<Save />}
              sx={{ px: 4 }}
            >
              {isEdit ? 'Update Order' : 'Create Order'}
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/orders')}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderFormPage;
