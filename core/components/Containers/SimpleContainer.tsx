import { Container, type SxProps } from '@mui/material';
import type { ReactNode } from 'react';

type SimpleContainerProps = {
  children: ReactNode;
  className?: string;
  sx?: SxProps;
};

const SimpleContainer = ({ children, className, sx }: SimpleContainerProps) => (
  <Container className={className} sx={{ ...sx }}>
    {children}
  </Container>
);
export default SimpleContainer;
