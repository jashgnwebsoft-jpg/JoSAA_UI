import { PropsWithChildren, ReactElement } from 'react';

type RenderIfProps = {
  show: boolean;
};

export const RenderIf = ({ show, children }: PropsWithChildren<RenderIfProps>) => {
  return show ? <>{children}</> : null;
};
