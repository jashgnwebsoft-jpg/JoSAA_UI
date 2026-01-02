import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const BreadcrumbsRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
}));

export const BreadcrumbsHeading = styled('h6')(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
  padding: 0,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const BreadcrumbsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
  },
}));

export const BreadcrumbsContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const BreadcrumbsSeparator = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.primary,
  marginRight: '5px',
  marginLeft: '5px',
}));

export const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& ol': {
    display: 'flex',
    gap: theme.spacing(0.5),
  },

  '& li': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const StyledLink = styled('a')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
}));

export const StyledDisabledLink = styled('span')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.disabled,
}));
