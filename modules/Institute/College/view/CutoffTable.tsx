import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

type Props = {
  data?: any;
};

const CutoffTable = ({ data }: Props) => {
  if (!data || !data.CategoryName?.length) {
    return <Typography variant='body2'>-</Typography>;
  }

  return (
    <Table size='small'>
      <TableBody>
        {/* Header */}
        <TableRow>
          <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Open</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Close</TableCell>
        </TableRow>

        {data.CategoryName.map((category: string, index: number) => (
          <TableRow key={index}>
            <TableCell>
              {category} ({data.ReservationType[index]})
            </TableCell>
            <TableCell>{data.OpenRank[index]}</TableCell>
            <TableCell>{data.ClosingRank[index]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CutoffTable;
