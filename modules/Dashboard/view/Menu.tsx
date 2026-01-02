import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router';
import { Avatar } from '@mui/material';
import { CONFIG } from '@/global-config';

const MENU = [
  {
    label: 'Cut-OFF',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/cut-off.svg`,
    href: 'josaa/cutoff',
  },
  {
    label: 'Colleges',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/colleges.svg`,
    href: 'josaa/college',
  },
  {
    label: 'Home State',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/home-state.svg`,
    href: 'josaa/homestate',
  },
  {
    label: 'Mother Branch',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/mother-branch.svg`,
    href: 'josaa/motherbranch',
  },
  {
    label: 'Branch',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/branch.svg`,
    href: 'josaa/branch',
  },
  {
    label: 'News',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/news.svg`,
    href: 'josaa/news',
  },
  {
    label: 'Key Dates',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/key-date.svg`,
    href: 'josaa/keydate',
  },
  {
    label: 'Admission Step',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/admission-step.svg`,
    href: 'josaa/admissionstep',
  },
  {
    label: 'Reporting Center',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/reporting-center.svg`,
    href: 'josaa/reporting',
  },
  {
    label: 'Website',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/website.svg`,
    href: 'josaa/website',
  },
  {
    label: 'Document',
    icon: `${CONFIG.assetsDir}/assets/icons/dashboard/document.svg`,
    href: 'josaa/document',
  },
];

// ----------------------------------------------------------------------

export function Menu() {
  const renderDesktop = () => (
    <Box
      sx={{
        gap: 3,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
          xl: 'repeat(11, 1fr)',
        },
      }}
    >
      {MENU.map(category => (
        <ItemDesktop key={category.label} category={category} />
      ))}
    </Box>
  );

  return <>{renderDesktop()}</>;
}

type ItemProps = {
  category: (typeof MENU)[number];
};

function ItemDesktop({ category }: ItemProps) {
  const navigate = useNavigate();
  return (
    <Paper
      variant='outlined'
      onClick={() => {
        navigate(category.href);
      }}
      sx={[
        theme => ({
          p: 2,
          borderRadius: 2,
          bgcolor: 'white',
          cursor: 'pointer',
          textAlign: 'center',
          '&:hover': { bgcolor: 'background.paper', boxShadow: theme.vars.customShadows.z20 },
        }),
      ]}
    >
      <Avatar
        alt={category.icon}
        src={category.icon}
        sx={{
          mb: 2,
          width: 80,
          height: 80,
          mx: 'auto',
        }}
      />

      <Typography
        variant='subtitle2'
        sx={theme => ({
          ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
        })}
      >
        {category.label}
      </Typography>
    </Paper>
  );
}
