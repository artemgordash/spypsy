import { HomePage } from '@/entrypoints/inspector/pages/home';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/inspector.html' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
