import type { SxProps } from '@mui/material';
import type { ReactNode } from 'react';

import { SimpleBreadcrumbs, SimpleBreadcrumbsProps } from '../SimpleBreadcrumbs';

import { Container } from './styles';

type MainContentProps = {
  children: ReactNode;
  className?: string;
  sx?: SxProps;
  breadCrumbsProps?: SimpleBreadcrumbsProps;
};

const MainContent = ({ children, className, sx, breadCrumbsProps }: MainContentProps) => (
  <>
    {breadCrumbsProps ? <SimpleBreadcrumbs {...breadCrumbsProps} /> : <></>}
    <Container className={className} sx={{ ...sx }}>
      {children}
    </Container>
  </>
);
export default MainContent;
