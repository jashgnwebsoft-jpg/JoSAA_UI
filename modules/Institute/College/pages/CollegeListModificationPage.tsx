import { DashboardContent } from '@minimal/layouts/dashboard';
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useCollegeListStore } from '../api/store';
import {
  useCollegeCompareForPlacementByCollegeIDQuery,
  useCollegeListQuery,
  useCollegeTypeOptions,
  useCollgeCardListQuery,
} from '../api/hooks';
import { CollegeListRequest, CollegeListResponse } from '../types';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { paths } from '@/paths';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import { GridColDef } from '@mui/x-data-grid';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import TextHighlighter from '../view/TextHighlighter';
import { Label } from '@minimal/components/label';
import { EntityId } from '@core/hooks/useListView';
import { fNumber } from '@core/utils/format-number';
import { SimpleBreadcrumbs } from '@core/components/SimpleBreadcrumbs';
import { IconifyIcon } from '@iconify/react';
import CollegeCommanDataGrid from '../view/CollegeCommanDataGrid';

const CollegeListModificationPage = () => {
  const { t } = useTranslate();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [collegeID, setCollegeID] = useState<EntityId>();
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const { postModel, handlePagination, handleFiltering, handleSorting } = useCollegeListStore();
  const { data, totalRecords, isLoading } = useCollegeListQuery(postModel);
  const { data: collegeOptions } = useCollegeTypeOptions();
  const { data: rows } = useCollegeCompareForPlacementByCollegeIDQuery(collegeID, !!collegeID);
  const { data: cardData } = useCollgeCardListQuery();

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;
  const collegeTypeColorMap: Record<string, 'primary' | 'secondary' | 'info' | 'warning'> = {
    IIT: 'primary',
    NIT: 'secondary',
    IIIT: 'info',
    GFTI: 'warning',
  };
  type CollegeCardType = {
    icon: string | IconifyIcon;
    color: string;
    bg: string;
  };
  const collegeCardIcons: CollegeCardType[] = [
    {
      icon: 'mdi:college-outline',
      color: 'error.main',
      bg: 'error.lighter',
    },
    {
      icon: 'flowbite:building-solid',
      color: 'primary.main',
      bg: 'primary.lighter',
    },
    {
      icon: 'solar:settings-bold',
      color: 'secondary.main',
      bg: 'secondary.lighter',
    },
    {
      icon: 'bx:chip',
      color: 'info.main',
      bg: 'info.lighter',
    },
    {
      icon: 'uil:university',
      color: 'warning.main',
      bg: 'warning.lighter',
    },
  ];

  const columns = useMemo<GridColDef<CollegeListResponse>[]>(
    () => [
      {
        field: 'CollegeShortName',
        headerName: t('Institute.College.College.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Box
            onClick={() => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              height: '100%',
              '&:hover': { cursor: 'pointer' },
            }}
          >
            <Typography variant='body2'>
              <TextHighlighter text={params.row.CollegeShortName} highlight={debouncedSearch} />
              <Label
                sx={{ mx: 1 }}
                color={collegeTypeColorMap[params.row.CollegeTypeShortName] ?? 'error'}
              >
                {params.row.CollegeTypeShortName}
              </Label>
            </Typography>
            <Typography variant='caption'>
              <TextHighlighter text={params.row.CollegeName} highlight={debouncedSearch} />
            </Typography>
          </Box>
        ),
      },
      {
        field: 'TotalIntake',
        headerName: t('Institute.IntakeCutoff.TotalIntake.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        renderCell: params => (
          <span>{params.row.TotalIntake !== null ? fNumber(params.row.TotalIntake) : '-'}</span>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'NIRFRank',
        headerName: t('Institute.College.NIRFRank.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        renderCell: params => (
          <span>{params.row.NIRFRank !== null ? fNumber(params.row.NIRFRank) : '-'}</span>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'HighestPackage',
        headerName: t('Institute.BranchWisePlacement.HigherPackage.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        renderCell: params => (
          <span>
            {params.row.HighestPackage !== null ? fNumber(params.row.HighestPackage) : '-'}
          </span>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'StateName',
        headerName: t('Institute.College.State.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <span
            onClick={() => navigate(paths.josaa.stateByID.root(params.row.StateID))}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <TextHighlighter text={params.row.StateName} highlight={debouncedSearch} />
          </span>
        ),
      },
      {
        field: 'Phone',
        headerName: t('Institute.College.Phone.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        headerAlign: 'right',
        cellClassName: 'first-column-right',
        renderCell: params => (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            {params.row.Phone.split(',').map((item: string) => (
              <Typography
                variant='body2'
                component='a'
                href={`tel:${item}`}
                color='textPrimary'
                sx={{ textDecoration: 'none' }}
              >
                {item}
              </Typography>
            ))}
          </span>
        ),
      },
      {
        field: 'Email',
        headerName: t('Institute.College.Email.Label'),
        minWidth: 120,
        flex: 0.5,
        cellClassName: 'first-column',
        sortable: true,
        renderCell: params => (
          <span>
            <Typography
              variant='body2'
              component='a'
              color='textPrimary'
              href={`mailto:${params.row.Email}`}
              sx={{ textDecoration: 'none' }}
            >
              {params.row.Email}
            </Typography>
          </span>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        filterable: false,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        renderCell: params => (
          <Box>
            <IconButton color='primary' title='view details'>
              <Iconify icon='solar:eye-bold' />
            </IconButton>
            <IconButton color='primary' title='compare colleges'>
              <Iconify icon='eva:swap-outline' />
            </IconButton>
          </Box>
        ),
      },
    ],
    [t, navigate, debouncedSearch]
  );

  const toolbarProps: DataGridToolbarProps<CollegeListRequest, CollegeListResponse> = {
    toolbar: {
      columns,
      search: {
        value: search,
        onSearch: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
      },
      filterModel: postModel.filterModel ?? {},
      addNew: () => {},
      handleExport: () => {},
      showFilter: () => {},
      actionButtons: [],
      permissions: {
        showAdd: false,
        showExport: false,
        showFilter: false,
      },
    },
  };

  const footerProps: DataGridFooterProps = {
    footer: {
      actionButtons: [],
      totalCount: totalRecords,
    },
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const s = debouncedSearch.toLowerCase();

    return data.filter(
      (item: CollegeListResponse) =>
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.CollegeAdmissionCode?.toString().includes(s) ||
        item.NIRFRank?.toString().includes(s) ||
        item.Address?.toLocaleLowerCase().toString().includes(s) ||
        item.CollegeUrlName?.toLocaleLowerCase().toString().includes(s)
    );
  }, [debouncedSearch, data]);

  useEffect(() => {
    const labelMap: Record<number, string | null> = {
      1: null,
      2: 'IIT',
      3: 'NIT',
      4: 'IIIT',
      5: 'GFTI',
    };
    const label = labelMap[currentTab];
    const type = label ? collegeOptions?.find(opt => opt.Label === label)?.Value : null;
    handleFiltering({
      ...postModel.filterModel,
      CollegeTypeID: type,
    });
    handlePagination({
      page: 0,
      pageSize: rowsPerPage,
    });
  }, [collegeOptions, currentTab]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent sx={{ px: { xs: 0, md: 3 } }}>
      <Helmet>
        <title>{t('Institute.College.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Institute.College.List.Title')}
        links={[{ name: 'Home' }, { name: t('Institute.College.List.Title') }]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'end',
            gap: 2,
          }}
        >
          {cardData?.map((item, index) => {
            const iconConfig = collegeCardIcons[index];
            const isActive = currentTab === index + 1;
            return (
              <Card
                key={index}
                onClick={() => setCurrentTab(index + 1)}
                sx={{
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: isActive
                    ? theme => `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
                  boxShadow: isActive
                    ? theme => theme.customShadows.z24
                    : theme => theme.customShadows.z8,
                  // transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  // transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme => theme.customShadows.z20,
                    // transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: '12px',
                          bgcolor: iconConfig.bg,
                          color: iconConfig.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon={iconConfig.icon} width={26} />
                      </Box>

                      <Typography
                        variant='h5'
                        sx={{
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? 'primary.main' : 'text.primary',
                        }}
                      >
                        {item.CollegeTypeShortName}
                      </Typography>
                    </Box>

                    {isActive && <Divider />}
                    <Box
                      sx={{ display: isActive ? 'flex' : 'none', alignItems: 'baseline', gap: 1 }}
                    >
                      <Typography
                        variant='h4'
                        sx={{ color: isActive ? 'primary.main' : 'text.primary' }}
                      >
                        {fNumber(item.TotalColleges)}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary'>
                        Institutes
                      </Typography>
                    </Box>

                    {isActive && <Divider />}

                    <Box
                      sx={{ display: isActive ? 'flex' : 'none', alignItems: 'center', gap: 0.5 }}
                    >
                      <Typography variant='body2' color='text.secondary'>
                        Total Intake:
                      </Typography>
                      <Typography variant='subtitle2'>{fNumber(item.TotalIntake)}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'end',
            gap: 2,
          }}
        >
          {cardData?.map((item, index) => {
            const iconConfig = collegeCardIcons[index];
            const isActive = currentTab === index + 1;

            return (
              <Card
                key={index}
                onClick={() => setCurrentTab(index + 1)}
                sx={{
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: isActive
                    ? theme => `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
                  boxShadow: isActive
                    ? theme => theme.customShadows.z24
                    : theme => theme.customShadows.z8,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme => theme.customShadows.z20,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: '12px',
                          bgcolor: iconConfig.bg,
                          color: iconConfig.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon={iconConfig.icon} width={26} />
                      </Box>

                      <Typography
                        variant='h5'
                        sx={{
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? 'primary.main' : 'text.primary',
                        }}
                      >
                        {item.CollegeTypeShortName}
                      </Typography>
                    </Box>

                    <Collapse in={isActive} timeout={300}>
                      <Divider sx={{ my: 1 }} />

                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography variant='h4' color='primary.main'>
                          {fNumber(item.TotalColleges)}
                        </Typography>
                        <Typography variant='subtitle1' color='text.secondary'>
                          Institutes
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant='body2' color='text.secondary'>
                          Total Intake:
                        </Typography>
                        <Typography variant='subtitle2'>{fNumber(item.TotalIntake)}</Typography>
                      </Box>
                    </Collapse>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box> */}
        <Card>
          <CardContent sx={{ height: 580 }}>
            {/* <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                size='small'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search colleges, state...'
                InputProps={{
                  startAdornment: (
                    <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 1 }} />
                  ),
                }}
                sx={{ width: { xs: '100%', sm: 300 } }}
              />
              <Button
                color='primary'
                variant='contained'
                size='small'
                startIcon={<Iconify icon='hugeicons:balance-scale' />}
                onClick={() => navigate(paths.josaa.colleges.collegeCompare)}
              >
                {!isMobile && t('Institute.College.CollegeCompare.Label')}
              </Button>
            </Box> */}
            {/* <DataGridPro
                rows={filteredData}
                density='compact'
                columns={columns}
                getRowId={row => row.CollegeID}
                paginationMode='server'
                sortingMode='server'
                localeText={{ noRowsLabel: 'No Data' }}
                disableColumnMenu={true}
                initialState={{
                  pagination: {
                    paginationModel: {
                      page: postModel.pageOffset,
                      pageSize: postModel.pageSize,
                    },
                  },
                  sorting: {
                    sortModel: postModel.sortModel,
                  },
                  pinnedColumns: { left: ['CollegeShortName'] },
                }}
                onPaginationModelChange={handlePagination}
                onSortModelChange={handleSorting}
                rowCount={totalRecords}
                loading={isLoading}
                pageSizeOptions={CONFIG.defaultPageSizeOptions}
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
                slots={{
                  toolbar: ExtendedDataGridToolbar,
                  footer: ExtendedDataGridFooter,
                }}
                slotProps={{
                  loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                  },
                  toolbar: toolbarProps,
                  footer: footerProps,
                }}
                sx={{
                  ...josaaDataGridStyles,
                  '& .MuiDataGrid-toolbar': {
                    display: 'none',
                  },
                  height: 500,
                }}
              /> */}
            <CollegeCommanDataGrid
              postModel={postModel}
              totalRecords={totalRecords}
              data={data}
              handleFiltering={handleFiltering}
              handlePagination={handlePagination}
              handleSorting={handleSorting}
              isLoading={isLoading}
              sxProps={{ height: 500 }}
            />
          </CardContent>
        </Card>
      </Box>
    </DashboardContent>
  );
};
export default CollegeListModificationPage;
