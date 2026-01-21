import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Pagination,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDocumentListStore } from '../api/store';
import { useListQuery } from '../api/hooks';
import { ListRequest, ListResponse } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { Helmet } from 'react-helmet-async';
import { Iconify } from '@minimal/components/iconify';
import { useEffect, useMemo, useState } from 'react';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import apiExport from '@minimal/utils/locales/utils/utills';
import { toast } from 'sonner';
import pkg from 'pdfjs-dist/package.json' assert { type: 'json' };
import { GridColDef } from '@mui/x-data-grid';
import MainContent from '@core/components/MainContent/MainContent';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { DataGridPro } from '@mui/x-data-grid-pro';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { josaaDataGridStyles } from '@core/components/Styles';
import TextHighlighter from '@modules/Institute/College/view/TextHighlighter';

const DocumnetListPage = () => {
  const { t } = useTranslate();
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [openDialog, setOpenDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const { postModel, handlePagination, handleSorting } = useDocumentListStore();
  const { data, totalRecords, isLoading } = useListQuery(postModel);

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;
  const columns = useMemo<GridColDef<ListResponse>[]>(
    () => [
      {
        field: 'DocumentTitle',
        headerName: t('Master.Document.List.Title'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        renderCell: params => (
          <TextHighlighter text={params.row.DocumentTitle!} highlight={debouncedSearch} />
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 220,
        filterable: false,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        renderCell: params => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* <Tooltip title='View Document'>
              <IconButton
                color='primary'
                onClick={() => {
                  handleViewClick(params.row.URL!);
                  console.log('CLick');
                }}
                aria-label={`View document ${params.row.DocumentTitle}`}
              >
                <Iconify icon='solar:eye-bold' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Download Document'>
              <IconButton
                color='primary'
                onClick={() => downloadPDF(params.row.DocumentTitle!, params.row.DocumentID!)}
                aria-label={`Download document ${params.row.DocumentTitle}`}
              >
                <Iconify icon='eva:cloud-download-fill' />
              </IconButton>
            </Tooltip> */}
            <Button
              variant='text'
              color='primary'
              size='small'
              startIcon={<Iconify icon='solar:eye-bold' height={15} />}
              onClick={() => handleViewClick(params.row.URL!)}
              aria-label={`View document ${params.row.DocumentTitle}`}
            >
              View
            </Button>

            <Button
              variant='text'
              color='primary'
              size='small'
              startIcon={<Iconify icon='eva:cloud-download-fill' height={15} />}
              onClick={() => downloadPDF(params.row.DocumentTitle!, params.row.DocumentID!)}
              aria-label={`Download document ${params.row.DocumentTitle}`}
            >
              Download
            </Button>
          </Box>
        ),
      },
    ],
    [t, debouncedSearch]
  );

  const toolbarProps: DataGridToolbarProps<ListRequest, ListResponse> = {
    toolbar: {
      columns,
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const s = debouncedSearch.toLowerCase();

    return data.filter(item => item.DocumentTitle?.toLowerCase().includes(s));
  }, [debouncedSearch, data]);

  const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@${pkg.version}/build/pdf.worker.min.mjs`;
  // const pdfWorkerUrl = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
  };

  const handleViewClick = async (pdf: string) => {
    try {
      setLoadingPdf(true);

      const response = await fetch(pdf);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      setPdfUrl(objectUrl);
      setOpenDialog(true);
    } catch (error) {
      toast.error('Fail to View PDF');
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleCloseDialog = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(null);
    setOpenDialog(false);
  };

  const downloadPDF = (title: string, DocumentID: string) => {
    apiExport.downloadReportPdf(`api/Master/Document/documentDownload`, title, { DocumentID });
  };

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Master.Document.List.Title') + ` - ${CONFIG.appName}`}</title>
        <meta
          name='description'
          content='Official downloadable documents including notifications, brochures and PDFs.'
        />

        <meta name='robots' content='index, follow' />
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Document List',
            hasPart: data.map(doc => ({
              '@type': 'DigitalDocument',
              name: doc.DocumentTitle,
              url: doc.URL,
              fileFormat: 'application/pdf',
            })),
          })}
        </script>
      </Helmet>
      {/* <SimpleBreadcrumbs
        heading={t('Master.Document.List.Title')}
        links={[{ name: 'Home' }, { name: t('Master.Document.List.Title') }]}
      />
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {data.map((data: ListResponse) => (
          <Card key={data.DocumentID}>
            <CardContent>
              <Typography variant='subtitle1'>{data.DocumentTitle}</Typography>
              <Typography variant='overline'>
                {data.DocumentSubTitle !== null ? data.DocumentSubTitle : ''}
              </Typography>
              <Box>
                <Button
                  variant='text'
                  color='primary'
                  startIcon={<Iconify icon='solar:eye-bold' height={15} />}
                  onClick={() => handleViewClick(data.URL!)}
                >
                  View
                </Button>
                <Button
                  variant='text'
                  color='primary'
                  startIcon={<Iconify icon='eva:cloud-download-fill' height={15} />}
                  onClick={() => downloadPDF(data.DocumentTitle!, data.DocumentID!)}
                >
                  Download
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='md'>
        <DialogTitle sx={{ py: 1.5 }}>View Document</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <DialogContent sx={{ p: 0 }}>
          {loadingPdf && (
            <Box display='flex' justifyContent='center' mt={4}>
              <CircularProgress />
            </Box>
          )}

          {pdfUrl && (
            <Box
              sx={{
                height: 600,
                width: 600,
                '.rpv-core__canvas-layer': {
                  height: '600px !important',
                  width: '400px !important',
                },
              }}
            >
              <Worker workerUrl={pdfWorkerUrl}>
                <Viewer fileUrl={pdfUrl} defaultScale={1} />
              </Worker>
            </Box>
          )}
        </DialogContent>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogActions sx={{ py: 1.5 }}>
          <Button onClick={handleCloseDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Pagination
        page={page}
        shape='circular'
        count={Math.ceil(totalRecords / rowsPerPage)}
        onChange={handleChangePage}
        sx={{ my: 3 }}
      /> */}
      <MainContent
        breadCrumbsProps={{
          heading: t('Master.Document.List.Title'),
          links: [{ name: 'Home' }, { name: t('Master.Document.List.Title') }],
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            size='small'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search document name...'
            InputProps={{
              startAdornment: (
                <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 1 }} />
              ),
            }}
            sx={{ width: { xs: '100%', sm: 300 } }}
          />
        </Box>
        <DataGridPro
          rows={filteredData}
          density='compact'
          columns={columns}
          getRowId={row => row.DocumentID}
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
            pinnedColumns: { left: ['BranchProperName'] },
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
            // '& .MuiDataGrid-cell': {
            //   padding: 1,
            //   display: 'flex',
            //   alignItems: 'center',
            // },
            // '& .MuiDataGrid-row:nth-of-type(even)': {
            //   backgroundColor: theme => theme.palette.action.hover,
            // },
            // '& .MuiTablePagination-root': {
            //   justifyContent: { xs: 'flex-start', md: 'flex-end' },
            // },
            // '& .MuiTablePagination-toolbar': {
            //   paddingLeft: { xs: 0 },
            // },
            // '& .MuiBox-root .css-1shozee': {
            //   display: 'none',
            // },
          }}
        />
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='md'>
          <DialogTitle sx={{ py: 1.5 }}>View Document</DialogTitle>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <DialogContent sx={{ p: 0 }}>
            {loadingPdf && (
              <Box display='flex' justifyContent='center' mt={4}>
                <CircularProgress />
              </Box>
            )}

            {pdfUrl && (
              <Box
                sx={{
                  height: 600,
                  width: 600,
                  '.rpv-core__canvas-layer': {
                    height: '600px !important',
                    width: '400px !important',
                  },
                }}
              >
                <Worker workerUrl={pdfWorkerUrl}>
                  <Viewer fileUrl={pdfUrl} defaultScale={1} />
                </Worker>
              </Box>
            )}
          </DialogContent>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <DialogActions sx={{ py: 1.5 }}>
            <Button onClick={handleCloseDialog} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </MainContent>
    </DashboardContent>
  );
};
export default DocumnetListPage;
