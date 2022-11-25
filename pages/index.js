import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './login';
import ImportFile from './importFile';

export default function index() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Kanit',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>
          <ImportFile />
        </div>
      </ThemeProvider>
    </div>
  )
}

