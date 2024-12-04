import { OverviewPage } from '@/entrypoints/inspector/pages/overview';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApiMapPage } from '@/entrypoints/inspector/pages/api-map';
import { RuntimePage } from '@/entrypoints/inspector/pages/runtime';
import { StoragesPage } from '@/entrypoints/inspector/pages/storages';
import { Layout } from '@/entrypoints/inspector/components/layout';
import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping';
import './App.css';
import { createContext } from 'react';

type TabData = {
  origin: string;
  requests: ProtocolMapping.Events['Network.requestWillBeSent'][0][];
  responses: ProtocolMapping.Events['Network.responseReceived'][0][];
  cookies: chrome.cookies.CookieChangeInfo[];
};

export const GlobalContext = createContext<{
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
}>({
  tabData: {
    origin: '',
    requests: [],
    responses: [],
    cookies: [],
  },
  setTabData: () => {},
});

function App() {
  const tabId = Number(
    new URLSearchParams(window.location.search).get('tabId')
  );
  const [tabData, setTabData] = useState<TabData>({
    origin: '',
    requests: [],
    responses: [],
    cookies: [],
  });

  window.tabId = tabId;

  useEffect(() => {
    browser.tabs.get(tabId).then((tab) => {
      const origin = new URL(tab.url!).origin;
      setTabData((prev) => ({
        ...prev,
        origin,
      }));

      document.title = `Spypsy - ${origin}`;
    });

    browser.tabs.onUpdated.addListener((id, changeInfo) => {
      if (id === tabId) {
        browser.tabs.get(tabId).then((tab) => {
          const origin = new URL(tab.url!).origin;
          setTabData((prev) => ({
            ...prev,
            origin,
          }));

          document.title = `Spypsy - ${origin}`;
        });
      }
    });

    browser.cookies.onChanged.addListener((changeInfo) => {
      setTabData((prev) => {
        return {
          ...prev,
          cookies: [...prev.cookies, changeInfo],
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
            requests: [...prev.requests, request],
          };
        });
      }

      if (method === 'Network.responseReceived') {
        const response =
          result as ProtocolMapping.Events['Network.responseReceived'][0];

        setTabData((prev) => {
          return {
            ...prev,
            responses: [...prev.responses, response],
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
