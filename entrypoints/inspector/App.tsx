import { OverviewPage } from '@/entrypoints/inspector/pages/overview';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { ApiMapPage } from '@/entrypoints/inspector/pages/api-map';
import { RuntimePage } from '@/entrypoints/inspector/pages/runtime';
import { StoragesPage } from '@/entrypoints/inspector/pages/storages';
import { Layout } from '@/entrypoints/inspector/components/layout';

function App() {
  const tabId = Number(
    new URLSearchParams(window.location.search).get('tabId')
  );

  window.tabId = tabId;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/inspector.html' index element={<OverviewPage />} />
          <Route path='/api-map' element={<ApiMapPage />} />
          <Route path='/runtime' element={<RuntimePage />} />
          <Route path='/storages' element={<StoragesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
