import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import "./styles/index.scss";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProviderCustom } from './utils/ThemeContext.tsx';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <QueryClientProvider client={queryClient}>
         <ThemeProviderCustom>
        {/* 👈 wraps App in your MUI + localStorage theme */}
        <CssBaseline />
        {/* 👈 resets body background, font, etc. according to theme */}
        <App />
        </ThemeProviderCustom>
    </QueryClientProvider>
  </StrictMode>,
)
