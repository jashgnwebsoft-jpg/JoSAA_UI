// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  ADMIN: '/admin',
  JOSAA: '/josaa',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
  // DASHBOARD
  admin: {
    root: ROOTS.ADMIN,
    login: `${ROOTS.ADMIN}/login`,
    dashboard: `${ROOTS.ADMIN}/dashboard`,
  },
  Security: {
    Role: {
      root: `${ROOTS.ADMIN}/Security/Role`,
    },
    RoleWiseOperation: {
      root: `${ROOTS.ADMIN}/Security/RoleWiseOperation`,
    },
    User: {
      root: `${ROOTS.ADMIN}/Security/User`,
    },
    Module: {
      root: `${ROOTS.ADMIN}/Security/Module`,
    },
    SubModule: {
      root: `${ROOTS.ADMIN}/Security/SubModule`,
    },
    EntryExit: {
      root: `${ROOTS.ADMIN}/Circular/EntryExit`,
    },
  },
  josaa: {
    cutoff: {
      root: `${ROOTS.JOSAA}/cutoff`,
      branchWiseCutoff: `${ROOTS.JOSAA}/branchwisecutoff`,
      collegeWiseCutoff: `${ROOTS.JOSAA}/collegewisecutoff`,
    },
    colleges: {
      root: `${ROOTS.JOSAA}/college`,
      collegeCompare: `${ROOTS.JOSAA}/collegecompare`,
    },
    homestate: {
      root: `${ROOTS.JOSAA}/homestate`,
    },
    motherbranch: {
      root: `${ROOTS.JOSAA}/motherbranch`,
    },
    branch: {
      root: `${ROOTS.JOSAA}/branch`,
    },
    news: {
      root: `${ROOTS.JOSAA}/news`,
    },
    keydate: {
      root: `${ROOTS.JOSAA}/keydate`,
    },
    admissionstep: {
      root: `${ROOTS.JOSAA}/admissionstep`,
    },
    reporting: {
      root: `${ROOTS.JOSAA}/reporting`,
    },
    website: {
      root: `${ROOTS.JOSAA}/website`,
    },
    document: {
      root: `${ROOTS.JOSAA}/document`,
    },
    collegeinformation: {
      root: (id: string) => `${ROOTS.JOSAA}/collegeinformation/${id}`,
    },
    branchWiseCollege: {
      root: (id: string) => `${ROOTS.JOSAA}/branchwisecollege/${id}`,
    },
    systemBranchWiseCollege: {
      root: (id: string) => `${ROOTS.JOSAA}/systembranchwisecollege/${id}`,
    },
    newsByID: {
      root: (id: string) => `${ROOTS.JOSAA}/news/${id}`,
    },
    stateByID: {
      root: (id: string) => `${ROOTS.JOSAA}/state/${id}`,
    },
  },
};
