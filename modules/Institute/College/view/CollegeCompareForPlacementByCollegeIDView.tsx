import { useTranslate } from '@minimal/utils/locales';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { CollegeCompareForPlacementByCollegeIDResponse } from '../types';
import { Iconify } from '@minimal/components/iconify';

type Props = {
  open: boolean;
  onClose: () => void;
  rows: CollegeCompareForPlacementByCollegeIDResponse[];
};

const CollegeCompareForPlacementByCollegeIDView = (props: Props) => {
  const { t } = useTranslate();
  const { rows = [], open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg'
      PaperProps={{
        elevation: 1,
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 500,
        }}
      >
        {t('Institute.BranchWisePlacement.CollegePlacementDetails.Label')}
        <IconButton onClick={onClose}>
          <Iconify icon='mingcute:close-line' />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <TableContainer component={Paper} elevation={0}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>{t('Institute.College.College.Label')}</TableCell>
                <TableCell align='right'>
                  {t('Institute.BranchWisePlacement.HigherPackage.Label')}
                </TableCell>
                <TableCell align='right'>
                  {t('Institute.BranchWisePlacement.LowerPackage.Label')}
                </TableCell>
                <TableCell align='right'>
                  {t('Institute.BranchWisePlacement.MedianPackage.Label')}
                </TableCell>
                <TableCell align='right'>
                  {t('Institute.BranchWisePlacement.AveragePackage.Label')}
                </TableCell>
                <TableCell align='right'>
                  {t('Institute.BranchWisePlacement.PlacementRatio.Label')} (%)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!rows || rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align='center' sx={{ color: 'text.secondary' }}>
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.CollegeShortName}</TableCell>
                    <TableCell align='right'>{row.HigherPackage ?? '-'}</TableCell>
                    <TableCell align='right'>{row.LowerPackage ?? '-'}</TableCell>
                    <TableCell align='right'>{row.MedianPackage ?? '-'}</TableCell>
                    <TableCell align='right'>{row.AveragePackage ?? '-'}</TableCell>
                    <TableCell align='right'>{row.PlacementRatio ?? '-'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default CollegeCompareForPlacementByCollegeIDView;
