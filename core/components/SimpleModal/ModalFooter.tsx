import { Button, DialogActions } from "@mui/material";
import { memo, ReactNode } from "react";
import { FooterProps } from "./ModalComponentProps";

// Footer component - separated for better maintainability
export const ModalFooter = memo<{
  footer?: ReactNode;
  isFooterShow?: boolean;
  footerActions?: FooterProps['footerActions'];
  onClose: () => void;
}>(({ footer, isFooterShow, footerActions, onClose }) => {
  if (footer) {
    return <>{footer}</>;
  }

  if (!isFooterShow && !footerActions?.length) {
    return null;
  }

  return (
    <DialogActions>
      {footerActions?.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'text'}
          color={action.color || 'primary'}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      )) || (
          <Button autoFocus onClick={onClose}>
            Save changes
          </Button>
        )}
    </DialogActions>
  );
});
