import { GlobalContext } from '@/entrypoints/inspector/App';
import { Box, Sheet, Tooltip, Typography } from '@mui/joy';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import CookieRoundedIcon from '@mui/icons-material/CookieRounded';
import { removeURLParams } from '@/utils/remove-params';

export function OverviewPage() {
  const state = useContext(GlobalContext);

  return (
    <Box>
      {[...state.tabData.requests, ...state.tabData.cookies]
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((item, index) => {
          let component;

          const iconByType = {
            request: (
              <ArrowUpwardRoundedIcon
                sx={(theme) => ({
                  color: theme.palette.success.light,
                })}
              />
            ),
            response: (
              <ArrowUpwardRoundedIcon sx={{ transform: 'rotate(180deg)' }} />
            ),
            cookie: <CookieRoundedIcon />,
          };

          if (item.spypsyType === 'cookie') {
            component = (
              <>
                <Typography level={'body-xs'}>
                  {item.cookie.domain.replace('www.', '')}
                </Typography>
              </>
            );
          }

          if (item.spypsyType === 'request') {
            const reqUrl = new URL(item.request.url);
            component = (
              <>
                <Typography width={60} level={'body-xs'}>
                  {item.request.method}
                </Typography>
                <Tooltip
                  title={
                    <Box>
                      {reqUrl.searchParams.entries().map(([key, value]) => (
                        <div key={key}>
                          <Typography level={'body-xs'}>
                            {key}: {value}
                          </Typography>
                        </div>
                      ))}
                    </Box>
                  }
                >
                  <Box
                    sx={{
                      width: 300,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <Typography level={'body-xs'}>
                      {removeURLParams(item.request.url)}
                    </Typography>
                  </Box>
                </Tooltip>
              </>
            );
          }

          // if (item.spypsyType === 'response') {
          //   component = (
          //     <>
          //       <Typography level={'body-xs'}>
          //         {removeURLParams(item.response.url)}
          //       </Typography>
          //     </>
          //   );
          // }

          return (
            <Sheet
              sx={{
                cursor: 'pointer',
                p: 1,
                borderRadius: 'md',
                mb: 1,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
              key={index}
            >
              {iconByType[item.spypsyType]}
              {component}
            </Sheet>
          );
        })}
    </Box>
  );
}
