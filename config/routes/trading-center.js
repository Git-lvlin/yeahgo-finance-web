export default {
  path: '/trading-center',
  name: 'trading-center',
  routes: [
    {
      name: 'transaction-details',
      path: '/trading-center/transaction-details',
      component: './trading-center/transaction-details',
    },
    {
      name: 'cost-detail',
      path: '/trading-center/cost-detail',
      component: './trading-center/cost-detail',
    },
    {
      name: 'billing-details',
      path: '/trading-center/billing-details',
      component: './trading-center/billing-details'
    },
    {
      name: 'withdrawal-log',
      path: '/trading-center/withdrawal-log',
      component: './trading-center/withdrawal-log'
    },
    {
      name: 'after-sales',
      path: '/trading-center/after-sales',
      component: './trading-center/after-sales'
    },
  ]
}