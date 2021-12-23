export default {
    path: '/audit-management',
    name: 'audit-management',
    routes: [
      {
        name: 'commission-audit',
        path: '/audit-management/commission-audit',
        component: './audit-management/commission-audit',
      },
      {
        name: 'have-done-audit',
        path: '/audit-management/have-done-audit',
        component: './audit-management/have-done-audit',
      },
      {
        name: 'submitted-audit',
        path: '/audit-management/submitted-audit',
        component: './audit-management/submitted-audit',
      },
      {
        name: 'audit-configuration',
        path: '/audit-management/audit-configuration',
        component: './audit-management/audit-configuration',
      },
    ]
  }