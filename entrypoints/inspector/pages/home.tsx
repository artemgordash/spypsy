import { Box, Option, Select, Sheet, Stack, Typography } from '@mui/joy';
import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping';

type TabData = {
  host: string;
  requests: ProtocolMapping.Events['Network.requestWillBeSent'][0][];
  responses: ProtocolMapping.Events['Network.responseReceived'][0][];
  storage: any[];
};

export function HomePage() {
  const tabId = Number(new URLSearchParams(window.location.search).get('id'));
  const [tabData, setTabData] = useState<TabData>({
    host: '',
    requests: [],
    responses: [],
    storage: [],
  });

  console.log(tabData);

  useEffect(() => {
    browser.debugger.onEvent.addListener((message, method, params) => {
      if (method === 'Network.requestWillBeSent') {
        const request =
          params as ProtocolMapping.Events['Network.requestWillBeSent'][0];
        setTabData((prev) => {
          return {
            ...prev,
            requests: [...prev.requests, request],
          };
        });
      }

      if (method === 'Network.responseReceived') {
        const response =
          params as ProtocolMapping.Events['Network.responseReceived'][0];

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
