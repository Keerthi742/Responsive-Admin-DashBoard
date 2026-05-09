import React from 'react';
import { 
  Grid2 as Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Avatar
} from '@mui/material';
import { 
  PeopleAlt as PeopleIcon, 
  ShoppingCart as OrdersIcon, 
  AttachMoney as RevenueIcon, 
  Assignment as TasksIcon,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { summaryData } from '../data/mockData';

const StatCard = ({ title, value, icon, color, trend }) => {
  const isPositive = trend.startsWith('+');
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'users': return <PeopleIcon />;
      case 'shopping-cart': return <OrdersIcon />;
      case 'dollar-sign': return <RevenueIcon />;
      case 'clock': return <TasksIcon />;
      default: return <PeopleIcon />;
    }
  };

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {value}
            </Typography>
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: `${color}15`, 
              color: color, 
              width: 56, 
              height: 56,
              borderRadius: 3
            }}
          >
            {getIcon(icon)}
          </Avatar>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: isPositive ? 'success.main' : 'error.main',
              bgcolor: isPositive ? 'success.light' : 'error.light',
              px: 1,
              py: 0.25,
              borderRadius: 1,
              mr: 1,
              opacity: 0.2,
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          >
            {isPositive ? <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} /> : <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />}
            {trend}
          </Box>
          <Typography variant="caption" color="text.secondary">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {summaryData.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.id}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">
              Activity Chart Placeholder (Coming Soon)
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Recent Activities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[1, 2, 3, 4].map((i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      New order #12{i}4
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {i * 5} minutes ago
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
