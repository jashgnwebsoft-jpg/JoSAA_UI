import { Box, Divider, Grid, Stack, SxProps, Theme, Typography } from '@mui/material';
import { memo, PropsWithChildren, ReactNode, useMemo } from 'react';

// Section box configuration
export interface SectionBoxProps extends PropsWithChildren {
  title: string;
  spacing?: number;
  containerSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  variant?: 'default' | 'form' | 'info' | 'warning' | 'error';
  icon?: ReactNode;
  actions?: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  showTitle?: boolean;
}

// Theme configuration for section variants
const getSectionTheme = (variant: SectionBoxProps['variant'] = 'default') => {
  const themes = {
    default: {
      bgcolor: '#faebd7',
      color: '#925d21',
    },
    form: {
      bgcolor: '#cdced1',
      color: 'black',
    },
    info: {
      bgcolor: '#e3f2fd',
      color: '#1976d2',
    },
    warning: {
      bgcolor: '#fff3e0',
      color: '#f57c00',
    },
    error: {
      bgcolor: '#ffebee',
      color: '#d32f2f',
    },
  };
  return themes[variant];
};

// Memoized SectionBox component for performance
export const SectionBox = memo<SectionBoxProps>(
  ({
    title,
    children,
    spacing = 0,
    containerSx,
    titleSx,
    variant = 'default',
    icon,
    actions,
    showTitle = true,
  }) => {
    const themeColors = useMemo(() => getSectionTheme(variant), [variant]);

    const headerSx = useMemo(
      () => ({
        px: 1.5,
        py: 0.1,
        width: 'fit-content',
        ...themeColors,
        ...titleSx,
      }),
      [themeColors, titleSx]
    );

    const contentSx = useMemo(
      () => ({
        padding: '16px',
        ...containerSx,
      }),
      [containerSx]
    );

    return (
      <>
        {showTitle && (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={headerSx}>
              <Stack direction='row' alignItems='center' spacing={1}>
                {icon}
                <Typography sx={{ fontSize: '15px', fontWeight: 400 }}>{title}</Typography>
              </Stack>
              {actions}
            </Stack>
            <Divider />
          </Box>
        )}
        <Grid container spacing={spacing} sx={contentSx}>
          {children}
        </Grid>
      </>
    );
  }
);
