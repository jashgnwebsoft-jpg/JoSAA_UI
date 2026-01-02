import type { NavGroupProps, NavSectionProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { useTheme } from '@mui/material/styles';

import { NavList } from './nav-list';
import { Scrollbar } from '../../scrollbar';
import { Nav, NavUl, NavLi } from '../components';
import { navSectionClasses, navSectionCssVars } from '../styles';

// ----------------------------------------------------------------------

export function NavSectionHorizontal({
  sx,
  Data: data,
  render,
  className,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: NavSectionProps) {
  const theme = useTheme();

  const cssVars = { ...navSectionCssVars.horizontal(theme), ...overridesVars };

  return (
    <Scrollbar
      sx={{ height: 1 }}
      slotProps={{ contentSx: { height: 1, width: '100%', display: 'flex', alignItems: 'center' } }}
    >
      <Nav
        className={mergeClasses([navSectionClasses.horizontal, className])}
        sx={[
          () => ({
            ...cssVars,
            height: 1,
            // mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            minHeight: 'var(--nav-height)',
            width: '100%',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <NavUl sx={{ flexDirection: 'row', gap: 'var(--nav-item-gap)' }}>
          {data.map(group => (
            <Group
              key={group.Subheader ?? group.Items[0].Title}
              render={render}
              cssVars={cssVars}
              Items={group.Items}
              slotProps={slotProps}
              checkPermissions={checkPermissions}
              enabledRootRedirect={enabledRootRedirect}
            />
          ))}
        </NavUl>
      </Nav>
    </Scrollbar>
  );
}

// ----------------------------------------------------------------------

function Group({
  Items: items,
  render,
  cssVars,
  slotProps,
  checkPermissions,
  enabledRootRedirect,
}: NavGroupProps) {
  return (
    <NavLi>
      <NavUl sx={{ flexDirection: 'row', gap: 'var(--nav-item-gap)' }}>
        {items.map(list => (
          <NavList
            key={list.Title}
            depth={1}
            Data={list}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            checkPermissions={checkPermissions}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </NavLi>
  );
}
