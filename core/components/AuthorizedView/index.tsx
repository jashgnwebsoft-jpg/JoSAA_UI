import type { PropsWithChildren } from 'react';

type AuthorizedViewProps = PropsWithChildren & {
  show: boolean;
};

const AuthorizedView = ({ children, show }: AuthorizedViewProps) => {
  if (!show) return <></>;

  return <>{children}</>;
};

export default AuthorizedView;
