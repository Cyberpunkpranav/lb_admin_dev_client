import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <DndProvider backend={HTML5Backend}>
    <QueryClientProvider client={queryClient}>
    <Toaster/>
    <Routes>
      <Route path='/*' element={<App />}/>
    </Routes>
    <ReactQueryDevtools/>
    </QueryClientProvider>
    </DndProvider>
    </Router>
  </React.StrictMode>
);

