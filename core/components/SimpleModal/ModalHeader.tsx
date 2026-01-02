import { Iconify } from "@minimal/components/iconify";
import { AppBar, Box } from "@mui/material";
import { memo, ReactNode } from "react";
import {
  StyledDialogToolbar,
  StyledDialogToolbarCancelIcon, StyledDialogToolbarTitle
} from "./Styles";

interface ModalHeader {
  title: string;
  onClose: () => void;
  header?: ReactNode;
  toolbar?: ReactNode | ReactNode[]
}

// Header component - separated for better maintainability
export const ModalHeader = memo<ModalHeader>((props) => {

  const {
    title,
    onClose,
    header,
    toolbar
  } = props;

  if (header) {
    return <>{header}</>;
  }

  return (
    <AppBar position="relative" color="default">
      <StyledDialogToolbar>
        <StyledDialogToolbarTitle variant="h6">{title}</StyledDialogToolbarTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {toolbar}
          <StyledDialogToolbarCancelIcon color="inherit" edge="start" onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </StyledDialogToolbarCancelIcon>
        </Box>
      </StyledDialogToolbar>
    </AppBar>
  );
});
