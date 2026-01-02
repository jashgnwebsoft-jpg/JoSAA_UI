import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import { Iconify } from '@minimal/components/iconify';
import { useState } from 'react';
import CutoffTable from './CutoffTable';

type Props = {
  results: any[];};

const CollegeCompareTable = ({ results }: Props) => {
  const [openCutoff, setOpenCutoff] = useState(false);

  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Compare Details</TableCell>
            {[0, 1, 2, 3].map(i => (
              <TableCell key={i} align='center' sx={{ fontWeight: 600 }}>
                {results[i]?.data?.CollegeShortName ?? 'Add College'}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Branch</TableCell>
            {[0, 1, 2, 3].map(i => (
              <TableCell key={i} align='center'>
                {results[i]?.data?.BranchProperName ?? '-'}
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Fees</TableCell>
            {[0, 1, 2, 3].map(i => (
              <TableCell key={i} align='center'>
                {results[i]?.data?.Fees ? `₹ ${results[i].data.Fees}` : '-'}
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Average Package</TableCell>
            {[0, 1, 2, 3].map(i => (
              <TableCell key={i} align='center'>
                {results[i]?.data?.AveragePackage ? `${results[i].data.AveragePackage} LPA` : '-'}
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>
              <Box display='flex' alignItems='center'>
                <IconButton size='small' onClick={() => setOpenCutoff(p => !p)}>
                  <Iconify
                    icon={openCutoff ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                  />
                </IconButton>
                Last Year Cutoff
              </Box>
            </TableCell>

            {[0, 1, 2, 3].map(i => (
              <TableCell key={i} align='center'>
                <Typography variant='body2' color='text.secondary'>
                  {openCutoff ? 'Hide' : 'View'}
                </Typography>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell colSpan={5} sx={{ p: 0 }}>
              <Collapse in={openCutoff} timeout='auto' unmountOnExit>
                <Box p={2}>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, width: 200 }}>
                          Category / Reservation
                        </TableCell>

                        {[0, 1, 2, 3].map(i => (
                          <TableCell key={i}>
                            <CutoffTable data={results[i]?.data} />
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeCompareTable;
