import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid2 as Grid, 
  TextField, 
  Button, 
  Switch, 
  FormControlLabel, 
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import { Save, Person, Notifications, Security } from '@mui/icons-material';

const SettingsPage = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account settings and preferences.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Settings */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Person color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Profile Information</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
              <Avatar 
                sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              />
              <Box>
                <Button variant="outlined" size="small">Change Avatar</Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="First Name" defaultValue="Admin" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Last Name" defaultValue="User" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Email Address" defaultValue="admin@example.com" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Bio" multiline rows={4} placeholder="Tell us about yourself..." />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" startIcon={<Save />}>Save Changes</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Preferences */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <Notifications color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Notifications</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1}>
                <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
                <FormControlLabel control={<Switch defaultChecked />} label="Order Updates" />
                <FormControlLabel control={<Switch />} label="Marketing Emails" />
              </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <Security color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Security</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>Change Password</Button>
              <Button variant="outlined" color="error" fullWidth>Delete Account</Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
