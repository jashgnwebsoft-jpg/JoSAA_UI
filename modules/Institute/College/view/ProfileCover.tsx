import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { Card, Tabs, Tab } from '@mui/material';

export type ICollegeProfileCover = {
  collegename: string;
  address: string;
  coverUrl?: string;
  avatarUrl?: string;
};

const ProfileCollegeHeroSection = ({
  collegename,
  address,
  coverUrl = 'https://galined.com/wp-content/uploads/2017/03/Chapman-University.jpg',
  avatarUrl = 'https://thumbs.dreamstime.com/b/cartoon-university-building-graduation-cap-tower-clock-illustration-399389855.jpg',
}: ICollegeProfileCover) => {
  return (
    <Card sx={{ height: 290 }}>
      <ProfileCover
        address={address}
        collegename={collegename}
        coverUrl={coverUrl}
        avatarUrl={avatarUrl}
      />
      <Box
        sx={{
          width: 1,
          bottom: 0,
          zIndex: 9,
          px: { md: 3 },
          display: 'flex',
          position: 'absolute',
          bgcolor: 'background.paper',
          justifyContent: { xs: 'center', md: 'flex-end' },
        }}
      >
        <Tabs value={1}></Tabs>
      </Box>
    </Card>
  );
};

const ProfileCover = ({
  sx,
  collegename,
  address,
  coverUrl,
  avatarUrl,
  ...other
}: BoxProps & ICollegeProfileCover) => {
  return (
    <Box
      sx={[
        theme => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)}, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.2)})`,
              `url(${coverUrl})`,
            ],
          }),
          height: 1,
          color: 'common.white',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Avatar
          alt={collegename}
          src={avatarUrl!}
          sx={[
            theme => ({
              mx: 'auto',
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              border: `solid 2px ${theme.vars.palette.common.white}`,
            }),
          ]}
        >
          {collegename?.charAt(0).toUpperCase()}
        </Avatar>

        <ListItemText
          primary={collegename}
          secondary={address}
          slotProps={{
            primary: { sx: { typography: 'h4' } },
            secondary: {
              sx: { mt: 0.5, color: 'inherit' },
            },
          }}
          sx={{ mt: 3, ml: { md: 3 }, textAlign: { xs: 'center', md: 'unset' } }}
        />
      </Box>
    </Box>
  );
};

export default ProfileCollegeHeroSection;
