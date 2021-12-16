export default {
  path: '/billing-center',
  name: 'billing-center',
  routes: [
    {
      name: 'costs-set',
      path: '/billing-center/costs-set',
      component: './billing-center/costs-set',
    },
    {
      name: 'set-formula',
      path: '/billing-center/set-formula',
      component: './billing-center/set-formula',
    }
  ]
}