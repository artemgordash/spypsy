import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline/CssBaseline';
import './App.css';

const theme = extendTheme({
  components: {
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
        root: {
          maxWidth: 300,
        },
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
  colorSchemes: {
    dark: {
      palette: {
        common: {
          black: '#0f1214',
        },
        primary: {
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
        },
      },
    },
    light: {
      palette: {
        common: {
          black: '#0f1214',
        },
        primary: {
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
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
