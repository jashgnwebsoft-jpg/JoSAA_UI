import { Box, CircularProgress, Stack } from "@mui/material";
import { memo, ReactNode } from "react";

export const ModalLoader = memo(({ loadingComponent }: { loadingComponent?: ReactNode }) => (
  <Box sx={{ p: 4, width: '100%' }}>
    <Stack direction="row" justifyContent="center">
      {loadingComponent || <CircularProgress />}
    </Stack>
  </Box>
));
