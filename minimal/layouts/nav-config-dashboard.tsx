import type { NavSectionProps } from '@minimal/components/nav-section';

import { paths } from '@/paths';

import { CONFIG } from '@/global-config';

import { Label } from '@minimal/components/label';
import { SvgColor } from '@minimal/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  params: icon('ic-params'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  subpaths: icon('ic-subpaths'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  cutoff: icon('ic-cutoff'),
  colleges: icon('ic-colleges'),
  homestate: icon('ic-homestate'),
  motherbranch: icon('ic-motherbranch'),
  branch: icon('ic-branch'),
  news: icon('ic-news'),
  keydates: icon('ic-keydates'),
  admissionstep: icon('ic-admissionstep'),
  reporting: icon('ic-reporting'),
  website: icon('ic-website'),
  documnet: icon('ic-document'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['Data'] = [
  /**
   * Overview
   */
  {
    Subheader: 'JoSAA',
    Items: [
      {
        Title: 'Cut-OFF',
        Path: paths.josaa.cutoff.root,
        Icon: ICONS.cutoff,
        children: [
          { Title: 'Cut-OFF', Path: paths.josaa.cutoff.root },
          { Title: 'Branch Wise Cut-OFF', Path: paths.josaa.cutoff.branchWiseCutoff },
          { Title: 'College Wise Cut-OFF', Path: paths.josaa.cutoff.collegeWiseCutoff },
        ],
      },
      {
        Title: 'Colleges',
        Path: paths.josaa.colleges.root,
        Icon: ICONS.colleges,
        children: [
          { Title: 'Colleges', Path: paths.josaa.colleges.root },
          { Title: 'College Compare', Path: paths.josaa.colleges.collegeCompare },
        ],
      },
      {
        Title: 'Home State',
        Path: paths.josaa.homestate.root,
        Icon: ICONS.homestate,
      },
      {
        Title: 'Mother Branch',
        Path: paths.josaa.motherbranch.root,
        Icon: ICONS.motherbranch,
      },
      {
        Title: 'Branch',
        Path: paths.josaa.branch.root,
        Icon: ICONS.branch,
      },
      {
        Title: 'News',
        Path: paths.josaa.news.root,
        Icon: ICONS.news,
      },
      {
        Title: 'Key Dates',
        Path: paths.josaa.keydate.root,
        Icon: ICONS.keydates,
      },
      {
        Title: 'Admission Step',
        Path: paths.josaa.admissionstep.root,
        Icon: ICONS.admissionstep,
      },
      {
        Title: 'Reporting Center',
        Path: paths.josaa.reporting.root,
        Icon: ICONS.reporting,
      },
      {
        Title: 'Website',
        Path: paths.josaa.website.root,
        Icon: ICONS.website,
      },
      {
        Title: 'Document',
        Path: paths.josaa.document.root,
        Icon: ICONS.documnet,
      },
    ],
  },
  /**
   * Management
   */
  //jash Commnet
  // {
  //   Subheader: 'Security',
  //   Items: [
  //     {
  //       Title: 'Security',
  //       Path: paths.Security.Role.root,
  //       Icon: ICONS.user,
  //       children: [{ Title: 'User', Path: paths.Security.User.root }],
  //     },
  //   ],
  // },
];
