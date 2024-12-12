import { OverviewPage } from '@/entrypoints/inspector/pages/overview';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApiMapPage } from '@/entrypoints/inspector/pages/api-map';
import { RuntimePage } from '@/entrypoints/inspector/pages/runtime';
import { StoragesPage } from '@/entrypoints/inspector/pages/storages';
import { Layout } from '@/entrypoints/inspector/components/layout';
import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping';
import { createContext } from 'react';
import './App.css';

type SpypsyRequest = ProtocolMapping.Events['Network.requestWillBeSent'][0] & {
  spypsyType: 'request';
};

type SpypsyResponse = ProtocolMapping.Events['Network.responseReceived'][0] & {
  spypsyType: 'response';
};

type SpypsyCookie = chrome.cookies.CookieChangeInfo & {
  timestamp: number;
  spypsyType: 'cookie';
};

type TabData = {
  requests: SpypsyRequest[];
  responses: SpypsyResponse[];
  cookies: SpypsyCookie[];
};

export const GlobalContext = createContext<{
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
}>({
  tabData: {
    requests: [],
    responses: [],
    cookies: [],
  },
  setTabData: () => {},
});

function App() {
  const [tabData, setTabData] = useState<TabData>({
    requests: [],
    responses: [],
    cookies: [],
  });

  console.log('🚀 ~ App ~ tabData:', tabData);
  useEffect(() => {
    browser.cookies.onChanged.addListener((changeInfo) => {
      setTabData((prev) => {
        return {
          ...prev,
          cookies: [
            ...prev.cookies,
            {
              ...changeInfo,
              spypsyType: 'cookie',
              timestamp: Date.now(),
            },
          ],
        };
      });
    });

    browser.debugger.onEvent.addListener((message, method, result) => {
      if (method === 'Network.requestWillBeSent') {
        const request =
          result as ProtocolMapping.Events['Network.requestWillBeSent'][0];
        setTabData((prev) => {
          return {
            ...prev,
            requests: [
              ...prev.requests,
              {
                ...request,
                spypsyType: 'request',
              },
            ],
          };
        });
      }

      if (method === 'Network.responseReceived') {
        const response =
          result as ProtocolMapping.Events['Network.responseReceived'][0];

        setTabData((prev) => {
          return {
            ...prev,
            responses: [
              ...prev.responses,
              {
                ...response,
                spypsyType: 'response',
              },
            ],
          };
        });
      }
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ tabData, setTabData }}>
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
    </GlobalContext.Provider>
  );
}

export default App;
