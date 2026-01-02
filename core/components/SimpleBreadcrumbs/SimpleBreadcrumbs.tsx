import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { Theme, SxProps } from '@mui/material/styles';

import {
  StyledLink,
  BreadcrumbsRoot,
  StyledBreadcrumbs,
  BreadcrumbsHeading,
  BreadcrumbsContent,
  StyledDisabledLink,
  BreadcrumbsContainer,
  BreadcrumbsSeparator,
} from './styles';

export type BreadcrumbsLinkProps = {
  name: string;
  href?: string;
  icon?: React.ReactNode;
};

export type MoreLinksProps = {
  links: { name: string; href?: string }[];
};

export type SimpleBreadcrumbsSlotProps = {
  breadcrumbs: BreadcrumbsProps;
  heading: React.ComponentProps<typeof BreadcrumbsHeading>;
  content: React.ComponentProps<typeof BreadcrumbsContent>;
  container: React.ComponentProps<typeof BreadcrumbsContainer>;
};

export type SimpleBreadcrumbsSlots = {
  breadcrumbs?: React.ReactNode;
};

export type SimpleBreadcrumbsProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  heading?: string;
  activeLast?: boolean;
  backHref?: string;
  action?: React.ReactNode;
  links?: BreadcrumbsLinkProps[];
  moreLinks?: MoreLinksProps['links'];
  slots?: SimpleBreadcrumbsSlots;
  slotProps?: Partial<SimpleBreadcrumbsSlotProps>;
};

export function SimpleBreadcrumbs({
  sx,
  action,
  heading,
  slots = {},
  links = [],
  slotProps = {},
  activeLast = false,
  ...other
}: SimpleBreadcrumbsProps) {
  const lastLink = links[links.length - 1]?.name;

  const renderHeading = () => (
    <BreadcrumbsHeading {...slotProps?.heading}>{heading}</BreadcrumbsHeading>
  );

  const renderLinks = () =>
    slots?.breadcrumbs ?? (
      <StyledBreadcrumbs separator={<BreadcrumbsSeparator />} {...slotProps?.breadcrumbs}>
        {links.map((link, index) => {
          const isLast = link.name === lastLink;
          const isDisabled = isLast && !activeLast;

          return isDisabled ? (
            <StyledDisabledLink key={link.name ?? index}>{link.name}</StyledDisabledLink>
          ) : (
            <StyledLink key={link.name ?? index} href={link.href}>
              {link.name}
            </StyledLink>
          );
        })}
      </StyledBreadcrumbs>
    );

  return (
    <BreadcrumbsRoot sx={sx} {...other}>
      <BreadcrumbsContainer {...slotProps?.container}>
        <BreadcrumbsContent {...slotProps?.content}>
          {heading && renderHeading()}
        </BreadcrumbsContent>
        {!!links.length && renderLinks()}
        {action}
      </BreadcrumbsContainer>
    </BreadcrumbsRoot>
  );
}
