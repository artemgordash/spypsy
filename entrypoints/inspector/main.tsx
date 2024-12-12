import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline/CssBaseline';
import './App.css';

const theme = extendTheme({
  components: {
    JoyTab: {
      styleOverrides: {
        root: {
          '&:hover[aria-selected="false"]': {
            backgroundColor: 'transparent !important',
          },
        },
      },
    },
    JoyButton: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
    },
    JoyModalDialog: {
      defaultProps: {
        variant: 'plain',
      },
    },
    JoySheet: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    JoySelect: {
      defaultProps: {
        variant: 'soft',
        size: 'sm',
      },
    },
    JoyTooltip: {
      defaultProps: {
        variant: 'soft',
      },
      styleOverrides: {
        root: {},
      },
    },
    JoyLink: {
      styleOverrides: {
        root: {
          transition: 'opacity .3s',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
            transition: 'opacity .3s',
            opacity: '.5',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssVarsProvider
    theme={theme}
    defaultMode={'dark'}
    defaultColorScheme={'dark'}
  >
    <CssBaseline />
    <App />
  </CssVarsProvider>
);
