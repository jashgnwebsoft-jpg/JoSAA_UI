import { ModalDialogProps } from "./ModalComponentProps";

import { JSX, memo, useMemo } from 'react';

import {
  Dialog,
  DialogContent
} from '@mui/material';

import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";
import { ModalLoader } from './ModalLoader';
import { SimpleDialog } from "../SimpleDialog/Dialog";

// Main modal component with performance optimizations
function SimpleModal<TModel>(props: ModalDialogProps<TModel>) {
  const {
    // Base props
    open,
    maxWidth = 'md',
    handleClose,
    modalTitle,
    disableEscapeKeyDown = true,

    // Loading props
    isFetching,
    loadingComponent,

    // Header props
    header,
    toolbar,

    // Content props
    data,
    Component,
    contentSx,
    invalidateQueries,
    additionalProps,

    // Footer props
    footer,
    isFooterShow,
    footerActions,
  } = props;

  const dialogContentSx = useMemo(() => ({
    color: 'text.secondary',
    p: 2,
    ...contentSx,
  }), [contentSx]);

  const componentProps = useMemo(() => ({
    data: data!,
    invalidateQueries,
    ...additionalProps,
  }), [data, invalidateQueries, additionalProps]);

  return (
    <SimpleDialog
      open={open}
      maxWidth={maxWidth}
      fullWidth
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      {isFetching ? (
        <ModalLoader loadingComponent={loadingComponent} />
      ) : (
        <>
          <ModalHeader
            title={modalTitle}
            onClose={handleClose}
            header={header}
            toolbar={toolbar}
          />

          <DialogContent sx={dialogContentSx}>
            <Component {...componentProps} />
          </DialogContent>

          <ModalFooter
            footer={footer}
            isFooterShow={isFooterShow}
            footerActions={footerActions}
            onClose={handleClose}
          />
        </>
      )}
    </SimpleDialog>
  );
}

// Export memoized version for performance
export default memo(SimpleModal) as <TModel>(props: ModalDialogProps<TModel>) => JSX.Element;
