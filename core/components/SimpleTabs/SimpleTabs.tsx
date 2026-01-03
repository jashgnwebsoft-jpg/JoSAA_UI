import type { SxProps, TabsActions } from '@mui/material';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

import React, { useState } from 'react';

import { TabContext } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import { Label } from '@minimal/components/label';

export interface TabItem {
  label: string;
  value: number;
  permission?: boolean;
}

interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: number;
  onTabChange?: (newValue: number) => void;
  tabSx?: SxProps;
  tabsSx?: SxProps;
  action?: ReactNode;
  totalRecords?: number;
}

const SimpleTabs = ({
  tabs,
  defaultValue = 1,
  onTabChange,
  children,
  tabSx,
  tabsSx,
  action,
  totalRecords,
}: CustomTabsProps & PropsWithChildren) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onTabChange) onTabChange(newValue);
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tabs value={value} onChange={handleChange} sx={{ px: 2, py: 0, ...tabsSx }}>
          {tabs.map(tab => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disabled={tab.permission === false}
              sx={{ fontSize: '1rem', ...tabSx }}
              icon={
                tab.value === value && totalRecords && totalRecords > 0 ? (
                  <Label variant='soft' color='primary'>
                    {totalRecords}
                  </Label>
                ) : undefined
              }
              iconPosition='end'
            />
          ))}
        </Tabs>
        {action}
      </Box>

      {children}
    </TabContext>
  );
};

export default SimpleTabs;
