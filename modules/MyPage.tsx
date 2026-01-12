import { SimpleTabs } from '@core/components';
import { Box, Pagination, SxProps } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

type pagination = {
  page: number;
  totalRecords: number;
  rowsPerPage: number;
  handleChangePage?: (event: React.ChangeEvent<unknown>, newPage: number) => void;
};

type MyProps = {
  currentTab: number;
  setCurrentTab: (newValue: number) => void;
  tabs: { value: number; label: string }[];
  pagination: pagination;
  action?: ReactNode;
  totalRecords: number;
  contentSx?: SxProps;
};

const MyPage = ({
  currentTab,
  setCurrentTab,
  children,
  tabs,
  pagination,
  action,
  totalRecords,
  contentSx,
}: MyProps & PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <SimpleTabs
        defaultValue={currentTab}
        tabs={tabs}
        onTabChange={newValue => {
          setCurrentTab(newValue);
        }}
        action={action}
        totalRecords={totalRecords}
      >
        <Box sx={contentSx}>{children}</Box>

        <Pagination
          page={pagination?.page}
          shape='circular'
          count={Math.ceil(pagination?.totalRecords / pagination?.rowsPerPage)}
          onChange={pagination?.handleChangePage}
          sx={{ my: 2 }}
        />
      </SimpleTabs>
    </Box>
  );
};

export default MyPage;
