import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { CollegeListRequest, CollegeListResponse } from '../types';
import { useTranslate } from '@minimal/utils/locales';
import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { paths } from '@/paths';
import TextHighlighter from './TextHighlighter';
import { Label } from '@minimal/components/label';
import { fNumber } from '@core/utils/format-number';
import { Iconify } from '@minimal/components/iconify';
import {
  DataGridFooterProps,
  DataGridToolbarProps,
  PostModel,
} from '@core/components/SimpleDataGrid/types';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { CONFIG } from '@/global-config';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { josaaDataGridStyles } from '@core/components/Styles';
import { Theme } from '@mui/material';
import { useCollegeCompareStore } from '../api/store';

type Props<TResponse extends CollegeListResponse, TRequest> = {
  postModel: PostModel<TRequest>;
  totalRecords: number;
  data: TResponse[];
  handleFiltering: (filterModel: TRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
  isLoading: boolean;
  sxProps?: SxProps<Theme>;
  boxSxProps?: SxProps<Theme>;
};

const CollegeCommanDataGrid = <TResponse extends CollegeListResponse, TRequest>(
  props: Props<TResponse, TRequest>
) => {
  const { t } = useTranslate();
  const {
    postModel,
    totalRecords,
    data,
    handleFiltering,
    handlePagination,
    handleSorting,
    isLoading,
    sxProps,
    boxSxProps,
  } = props;
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { openDialog, setDefaultFormValues, saveCollegeDetailsData } = useCollegeCompareStore();
  const index = saveCollegeDetailsData.findIndex(v => v === null);
  const targetIndex = index !== -1 ? index : 0;

  const collegeTypeColorMap: Record<string, 'primary' | 'secondary' | 'info' | 'warning'> = {
    IIT: 'primary',
    NIT: 'secondary',
    IIIT: 'info',
    GFTI: 'warning',
  };

  const columns = useMemo<GridColDef<TResponse>[]>(
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
            // onClick={() => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              height: '100%',
              '&:hover': { cursor: 'pointer', color: 'primary.main' },
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
          // <Box
          //   sx={{
          //     display: 'flex',
          //     flexDirection: 'column',
          //   }}
          // >
          //   <span>{params.row.HighestPackage ?? '-'}</span>
          //   <Button
          //     size='small'
          //     variant='text'
          //     color='error'
          //     startIcon={<Iconify icon='eva:swap-outline' width={15} />}
          //     onClick={() => {
          //       setCollegeID(params.row.CollegeID);
          //       setOpen(true);
          //     }}
          //   >
          //     Compare Placement
          //   </Button>
          // </Box>
          <span>
            {params.row.HighestPackage !== null ? fNumber(params.row.HighestPackage) : '-'}
          </span>
        ),
        // renderHeader: params => (
        //   <div
        //     className='gn-grid-header'
        //     style={{
        //       whiteSpace: 'break-spaces',
        //       lineBreak: 'auto',
        //       textAlign: 'center',
        //       fontSize: 13,
        //       fontWeight: 600,
        //     }}
        //   >
        //     {t('Institute.BranchWisePlacement.HigherPackage.Label')}
        //   </div>
        // ),
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
          <Box
            onClick={e => {
              e.stopPropagation();
              navigate(paths.josaa.stateByID.root(params.row.StateID));
            }}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                cursor: 'pointer',
                color: 'primary.main',
              },
            }}
          >
            <TextHighlighter text={params.row.StateName} highlight={debouncedSearch} />
          </Box>
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
          // <span
          //   style={{
          //     display: 'flex',
          //     flexDirection: 'column',
          //     width: '100%',
          //     height: '100%',
          //   }}
          //   onClick={e => e.stopPropagation()}
          // >
          //   {params.row.Phone.split(',').map((item: string) => (
          //     <Typography
          //       variant='body2'
          //       component='a'
          //       href={`tel:${item}`}
          //       color='textPrimary'
          //       sx={{ textDecoration: 'none', '&:hover': { color: '#00a76f' } }}
          //     >
          //       {item}
          //     </Typography>
          //   ))}
          // </span>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            {params.row.Phone.split(',').map((item: string) => (
              <Typography
                key={item}
                variant='body2'
                component='a'
                href={`tel:${item}`}
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        ),
      },
      {
        field: 'Email',
        headerName: t('Institute.College.Email.Label'),
        minWidth: 150,
        flex: 0.6,
        cellClassName: 'first-column',
        sortable: true,
        renderCell: params => (
          <span
            // style={{
            //   width: '100%',
            //   height: '100%',
            // }}
            onClick={e => e.stopPropagation()}
          >
            {/* {params.row.Email.split(',').map((item: string) => (
                  <Typography
                    variant='body2'
                    component='a'
                    color='textPrimary'
                    href={`mailto:${item}`}
                    sx={{ textDecoration: 'none' }}
                  >
                    {item}
                  </Typography>
                ))} */}
            <Typography
              variant='body2'
              component='a'
              color='textPrimary'
              href={`mailto:${params.row.Email}`}
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              <TextHighlighter text={params.row.Email} highlight={debouncedSearch} />
            </Typography>
          </span>
        ),
      },
      // {
      //   field: 'actions',
      //   headerName: 'Actions',
      //   width: 150,
      //   filterable: false,
      //   sortable: false,
      //   headerAlign: 'center',
      //   align: 'center',
      //   disableColumnMenu: true,
      //   renderCell: params => (
      //     // <Button
      //     //   variant='text'
      //     //   color='primary'
      //     //   size='small'
      //     //   startIcon={<Iconify icon='solar:eye-bold' height={15} />}
      //     //   onClick={() => navigate(paths.josaa.collegeinformation.root(params.row?.CollegeID))}
      //     // >
      //     //   View Deatils
      //     // </Button>
      //     <Box>
      //       <IconButton color='primary' title='view details'>
      //         <Iconify icon='solar:eye-bold' />
      //       </IconButton>
      //       <IconButton color='primary' title='compare colleges'>
      //         <Iconify icon='eva:swap-outline' />
      //       </IconButton>
      //     </Box>
      //   ),
      // },
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
            <IconButton
              color='primary'
              title='view details'
              onClick={e => {
                e.stopPropagation();
                navigate(paths.josaa.collegeinformation.root(params.row.CollegeID));
              }}
            >
              <Iconify icon='solar:eye-bold' />
            </IconButton>

            <IconButton
              color='primary'
              title='compare colleges'
              onClick={e => {
                e.stopPropagation();
                openDialog(targetIndex, {
                  CollegeID: params.row.CollegeID,
                  SystemBranchID: '',
                  AdmissionYearID: '',
                });
                navigate(paths.josaa.colleges.collegeCompare);
              }}
            >
              <Iconify icon='eva:swap-outline' />
            </IconButton>
          </Box>
        ),
      },
    ],
    [t, navigate, debouncedSearch]
  );

  const toolbarProps: DataGridToolbarProps<TRequest, TResponse> = {
    toolbar: {
      columns,
      search: {
        value: search,
        onSearch: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
      },
      filterModel: (postModel.filterModel as any) ?? {},
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
      totalCount: totalRecords ?? 0,
    },
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
      item =>
        item.CollegeName?.toLowerCase().includes(s) ||
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.CollegeUrlName?.toLocaleLowerCase().toString().includes(s) ||
        item.Email.toLowerCase().includes(s)
      // item.Phone.toLowerCase().includes(s)
      // item.Address?.toLocaleLowerCase().toString().includes(s) ||
      // item.CollegeAdmissionCode?.toString().includes(s) ||
      // item.NIRFRank?.toString().includes(s) ||
    );
  }, [debouncedSearch, data]);

  return (
    <Box sx={{ ...boxSxProps }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          // flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: { xs: 2, md: 0 },
        }}
      >
        <TextField
          size='small'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search colleges, state, email...'
          InputProps={{
            startAdornment: (
              <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 1 }} />
            ),
          }}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
        {isMobile === false ? (
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<Iconify icon='hugeicons:balance-scale' />}
            onClick={() => navigate(paths.josaa.colleges.collegeCompare)}
          >
            {!isMobile && t('Institute.College.CollegeCompare.Label')}
          </Button>
        ) : (
          <IconButton
            onClick={() => navigate(paths.josaa.colleges.collegeCompare)}
            sx={{ backgroundColor: 'primary.main', color: 'grey.50' }}
          >
            <Iconify icon='hugeicons:balance-scale' />
          </IconButton>
        )}
      </Box>
      <DataGridPro
        rows={filteredData}
        density='compact'
        columns={columns}
        getRowId={row => row.CollegeID}
        paginationMode='server'
        sortingMode='server'
        localeText={{ noRowsLabel: 'No Data' }}
        disableColumnMenu={true}
        onRowClick={params => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
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
          ...sxProps,
        }}
      />
    </Box>
  );
};
export default CollegeCommanDataGrid;
