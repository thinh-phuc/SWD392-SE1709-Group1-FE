import { Toaster } from './components/ui/toaster';
import AppProvider from './providers';
import AppRouter from './routes';
import React from 'react';
export default function App() {
  console.log(React);
  return (
    <AppProvider>
      <AppRouter />
      <Toaster />
    </AppProvider>
  );
}
