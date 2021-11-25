export default {
  path: '/billing-center',
  name: 'billing-center',
  routes: [
    {
      name: 'account-management',
      path: '/billing-center/account-management',
      component: './billing-center/account-management',
    },
    {
      name: 'cost-management',
      path: '/billing-center/cost-management',
      component: './billing-center/cost-management',
    },
    {
      name: 'set-formula',
      path: '/billing-center/set-formula',
      component: './billing-center/set-formula',
    }
  ]
}