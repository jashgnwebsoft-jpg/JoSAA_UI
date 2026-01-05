import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  IconButton,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { fNumber } from '@core/utils/format-number';

import { CollegeCompareCollegeDetailsResponse } from '../types';
import {
  CollegeComparePreviousYearsOpenCloseRankFormateListResponse,
  PreviousYearOpenClose,
} from '@modules/Institute/Branch/types';

const CATEGORIES = ['General', 'EWS', 'OBC-NCL', 'SC', 'ST'];
const ROUNDS = [1, 2, 3, 4, 5, 6, 7];

const getRankCell = (list: PreviousYearOpenClose[], category: string, round: number) => {
  if (!Array.isArray(list)) return '-';
  const row = list.find(r => r.CategoryName === category && r.RoundNumber === round);
  return row ? fNumber(row.ClosingRank) : '-';
};

type Props = {
  onAddClick: () => void;
  college: CollegeCompareCollegeDetailsResponse;
  rankData: CollegeComparePreviousYearsOpenCloseRankFormateListResponse[];
  onRemoveData: () => void;
};

const cellStyle = {
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 1,
  borderBottom: '1px solid',
  borderColor: 'divider',
  textAlign: 'center',
};

const CollegeColumn = ({ onAddClick, college, rankData, onRemoveData }: Props) => {
  const { t } = useTranslate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        flex: 1,
        width: { xs: 200, md: 50 },
        borderLeft: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          p: 1.5,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Card
          variant='outlined'
          onClick={onAddClick}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            px: 1,
            position: 'relative',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          {college ? (
            <>
              <IconButton
                size='small'
                onClick={e => {
                  e.stopPropagation();
                  onRemoveData();
                }}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  zIndex: 10,
                  color: 'text.disabled',
                  '&:hover': { color: 'error.main', bgcolor: 'error.lighter' },
                }}
              >
                <Iconify icon='carbon:close' width={20} />
              </IconButton>

              <Typography variant='subtitle2' textAlign='center'>
                {college?.CollegeName || 'Loading...'}
              </Typography>
            </>
          ) : (
            <Box textAlign='center'>
              <IconButton color='primary'>
                <Iconify icon='solar:add-circle-bold' />
              </IconButton>
              <Typography variant='body2'>{t('Institute.College.Create.Title')}</Typography>
            </Box>
          )}
        </Card>
      </Box>

      <Box sx={cellStyle}>{college?.CollegeShortName || '-'}</Box>
      <Box sx={cellStyle}>{college?.Fees ? fNumber(college?.Fees) : '-'}</Box>
      <Box sx={cellStyle}>{college?.NIRFRank || '-'}</Box>
      <Box sx={cellStyle}>{college?.HigherPackage ? fNumber(college?.HigherPackage) : '-'}</Box>
      <Box sx={cellStyle}>{college?.MedianPackage ? fNumber(college?.MedianPackage) : '-'}</Box>
      <Box sx={cellStyle}>{college?.AveragePackage ? fNumber(college?.AveragePackage) : '-'}</Box>
      <Box sx={cellStyle}>{college?.LowerPackage ? fNumber(college?.LowerPackage) : '-'}</Box>

      <Box sx={{ p: 1.5, textAlign: 'center' }}>
        <IconButton size='small' onClick={() => setOpen(v => !v)}>
          <Iconify icon={open ? 'eva:arrow-up-outline' : 'eva:arrow-down-outline'} />
        </IconButton>

        <Collapse in={open}>
          {rankData?.map((branch, idx) => (
            <Box key={idx} sx={{ mt: 2 }}>
              <Typography variant='caption' fontWeight={600} textAlign='left' px={1}>
                {branch.BranchAdmissionCode} {branch.BranchProperName}
              </Typography>

              <TableContainer component={Paper} variant='outlined' sx={{ mt: 1 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: 11, fontWeight: 600 }}>
                        {t('Master.Category.Category.Label')}
                      </TableCell>
                      {ROUNDS.map(r => (
                        <TableCell key={r} align='center' sx={{ fontSize: 11, fontWeight: 600 }}>
                          R{r}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {CATEGORIES.map(cat => (
                      <TableRow key={cat}>
                        <TableCell sx={{ fontSize: 11, fontWeight: 600 }}>{cat}</TableCell>
                        {ROUNDS.map(r => (
                          <TableCell key={r} align='center' sx={{ fontSize: 11 }}>
                            {getRankCell(branch.PreviousYearOpenClose, cat, r)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Collapse>
      </Box>
    </Box>
  );
};

export default CollegeColumn;
