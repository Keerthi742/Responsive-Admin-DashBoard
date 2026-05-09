import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  TextField, 
  InputAdornment,
  Button,
  Chip,
  Drawer,
  Divider,
  Stack,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  Visibility, 
  MoreVert, 
  Add,
  Close,
  Email,
  Phone,
  LocationOn,
  CalendarMonth,
  Edit,
  Delete
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usersData } from '../data/mockData';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your team members and their account permissions.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => navigate('/users/add')}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <TextField
            size="small"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="All">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterList />} color="inherit">
            Filters
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Joined Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.role}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        size="small" 
                        color={getStatusColor(user.status)}
                        sx={{ fontWeight: 600, borderRadius: 1.5 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.joined}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleViewDetails(user)} color="primary">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/users/edit/${user.id}`)} color="info">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => alert('Delete clicked (Simulated)')} color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                      <Search sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                      <Typography variant="h6">No users found</Typography>
                      <Typography variant="body2">Try adjusting your search or filters</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, p: 0 }
        }}
      >
        {selectedUser && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>User Details</Typography>
              <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </Box>
            
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Avatar 
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.light', fontSize: '2rem' }}
              >
                {selectedUser.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{selectedUser.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{selectedUser.role}</Typography>
              <Chip 
                label={selectedUser.status} 
                color={getStatusColor(selectedUser.status)}
                sx={{ fontWeight: 600 }}
              />
            </Box>

            <Divider />

            <Box sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main' }}>
                    <Email />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Email Address</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedUser.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main' }}>
                    <Phone />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>+1 (555) 000-0000</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main' }}>
                    <LocationOn />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Location</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>New York, USA</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main' }}>
                    <CalendarMonth />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Joined Date</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedUser.joined}</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ mt: 'auto', p: 4, display: 'flex', gap: 2 }}>
              <Button variant="contained" fullWidth>Edit User</Button>
              <Button variant="outlined" color="error" fullWidth>Delete</Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default UsersPage;
