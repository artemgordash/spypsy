import { Box } from '@mui/joy';
import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping';

type TabData = {
  origin: string;
  requests: ProtocolMapping.Events['Network.requestWillBeSent'][0][];
  responses: ProtocolMapping.Events['Network.responseReceived'][0][];
  cookies: chrome.cookies.CookieChangeInfo[];
};

export function HomePage() {
  const tabId = Number(new URLSearchParams(window.location.search).get('id'));
  const [tabData, setTabData] = useState<TabData>({
    origin: '',
    requests: [],
    responses: [],
    cookies: [],
  });

  useEffect(() => {
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

  return <Box>Hello world{tabId}</Box>;
}
