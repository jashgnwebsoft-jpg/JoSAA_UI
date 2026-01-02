import type { NavSectionProps } from '@minimal/components/nav-section';

// ----------------------------------------------------------------------

export type NavItem = {
  Title: string;
  Path: string;
  children?: NavItem[];
};

export type OutputItem = {
  title: string;
  path: string;
  group: string;
};

const flattenNavItems = (navItems: NavItem[], parentGroup?: string): OutputItem[] => {
  let flattenedItems: OutputItem[] = [];

  navItems.forEach(navItem => {
    const currentGroup = parentGroup ? `${parentGroup}-${navItem.Title}` : navItem.Title;
    const groupArray = currentGroup.split('-');

    flattenedItems.push({
      title: navItem.Title,
      path: navItem.Path,
      group: groupArray.length > 2 ? `${groupArray[0]}.${groupArray[1]}` : groupArray[0],
    });

    if (navItem.children) {
      flattenedItems = flattenedItems.concat(flattenNavItems(navItem.children, currentGroup));
    }
  });
  return flattenedItems;
};

export function flattenNavSections(navSections: NavSectionProps['Data']): OutputItem[] {
  return navSections.flatMap(navSection => flattenNavItems(navSection.Items, navSection.Subheader));
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: OutputItem[];
};

export function applyFilter({ inputData, query }: ApplyFilterProps): OutputItem[] {
  if (!query) return inputData;

  return inputData.filter(({ title, path, group }) =>
    [title, path, group].some(field => field?.toLowerCase().includes(query.toLowerCase()))
  );
}
