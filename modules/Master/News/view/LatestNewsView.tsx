import { Typography, SxProps, Card, CardContent, Box, Divider } from '@mui/material';
import { useLatestNewsListStore } from '../api/store';
import { useLatestNewsQuery } from '../api/hooks';
import { LatestNewsResponse } from '../types';
import { Iconify } from '@minimal/components/iconify';
import { CONFIG } from '@/global-config';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { paths } from '@/paths';

type NewsProps = {
  sx?: SxProps;
};

const LatestNewsView = (props: NewsProps) => {
  const { sx } = props;
  const navigate = useNavigate();
  const { postModel } = useLatestNewsListStore();
  const { data, totalRecords } = useLatestNewsQuery(postModel);

  return (
    <Box sx={{ ...sx }}>
      {data.map((data: LatestNewsResponse, index) => (
        <Box key={data.NewsID}>
          <Typography color='primary' variant='body2'>
            <Box component='span' sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon='uis:calender' width={15} />
              {dayjs(data.ToDate).format(CONFIG.dateTimePatterns.paramCase.date)}
            </Box>
          </Typography>
          {data.NewsURL === null && (
            <Typography
              variant='h6'
              onClick={() => {
                navigate(paths.josaa.newsByID.root(data.NewsID));
              }}
              sx={{ cursor: 'pointer', textAlign: 'justify' }}
            >
              {data.NewsTitle}
            </Typography>
          )}
          {data.NewsURL !== null && (
            <Typography
              variant='h6'
              component='a'
              href={data.NewsURL || '#'}
              target='_blank'
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'justify',
                display: 'block',
              }}
            >
              {data.NewsTitle}
            </Typography>
          )}

          {/* <Typography variant='body2' color='textDisabled'>
              {data.Description}
            </Typography> */}
          {totalRecords - 1 > index && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
    </Box>
  );
};
export default LatestNewsView;
