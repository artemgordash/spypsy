import { Navbar } from '@/entrypoints/inspector/components/navbar';
import { Box } from '@mui/joy';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <Box>
      <Navbar />
      <Box px={2} py={2} component={'main'}>
        <Outlet />
      </Box>
    </Box>
  );
}
