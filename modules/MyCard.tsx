import { Iconify } from '@minimal/components/iconify';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { ReactElement } from 'react';

type MyCardProps = {
  key: string;
  rank: number | null;
  shortName: string | null;
  location: string | null;
  city?: string | null;
  locationIcon?: ReactElement;
  onClick: () => void;
  otherElement?: ReactElement;
};

const MyCard = ({
  key,
  location,
  locationIcon,
  rank,
  onClick,
  shortName,
  city,
  otherElement,
}: MyCardProps) => {
  return (
    <Card key={key} onClick={onClick} sx={{ ':hover': { cursor: 'pointer' } }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Typography variant='subtitle1' color='primary'>
                #{rank ?? ''}
              </Typography>
              <Typography variant='subtitle1'>{shortName}</Typography>
            </Box>
            <Typography variant='caption' color='textDisabled'>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box
                  component='span'
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                >
                  {locationIcon ? locationIcon : <Iconify icon='weui:location-filled' />}
                  {city && city + ', '} {location}
                </Box>
                {otherElement}
              </Box>
            </Typography>
          </Box>
          <Iconify icon='carbon:chevron-right' />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyCard;
