import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // flex: 1,
  // minHeight: 0,
  // height: '100%',
  // overflow: 'hidden',
  // backgroundColor: theme.palette.background.paper,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  marginBottom: '1.5rem',
  paddingTop: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',

  // flex: 1,
  height: 'calc(100dvh - 225px)',
  overflow: 'auto',
  minHeight: '100%',
}));
