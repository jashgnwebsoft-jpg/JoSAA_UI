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
  Pagination,
  Typography,
} from '@mui/material';
import { useDocumentListStore } from '../api/store';
import { useListQuery } from '../api/hooks';
import { ListResponse } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { Helmet } from 'react-helmet-async';
import { Iconify } from '@minimal/components/iconify';
import { useState } from 'react';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import apiExport from '@minimal/utils/locales/utils/utills';

const DocumnetListPage = () => {
  const { t } = useTranslate();

  const [openDialog, setOpenDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const { postModel, handlePagination } = useDocumentListStore();
  const { data, totalRecords } = useListQuery(postModel);

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

  const pdfWorkerUrl = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

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
      console.error('Failed to load PDF', error);
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
      </Helmet>
      <SimpleBreadcrumbs
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
      />
    </DashboardContent>
  );
};
export default DocumnetListPage;
