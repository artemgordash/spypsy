import { Tabs, TabList, tabClasses, Tab, Box } from '@mui/joy';
import { useNavigate } from 'react-router';

const tabs = [
  {
    label: 'Overview',
    href: '/inspector.html',
  },
  {
    label: 'Storages',
    href: '/storages',
  },
  {
    label: 'Runtime',
    href: '/runtime',
  },
  {
    label: 'API',
    href: '/api-map',
  },
];

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Tabs
      onChange={(e, valueIndex) => {
        navigate(tabs[valueIndex as number].href);
      }}
      aria-label='tabs'
      sx={{ bgcolor: 'transparent', flexGrow: 1 }}
    >
      <TabList
        size='sm'
        sx={{
          px: 2,
          py: 1,
          gap: 1,
          [`& .${tabClasses.root}`]: {
            borderRadius: 'sm',
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab variant='outlined' key={tab.href}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
