import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import { tradePage } from '@/services/trading-center/cost-detail'
import { amountTransform } from '@/utils/utils'

const CostDetail = () => {

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center'
    },
    {
      title: '交易流水号',
      dataIndex: 'payNo',
      align: 'center'
    },
    {
      title: '渠道流水号',
      dataIndex: 'transactionId',
      align: 'center'
    },
    {
      title: '付款方子账户',
      dataIndex: 'buyerSn',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'order': '订单',
        'deposit': '保证金',
        'recharge': '充值'
      },
      align: 'center'
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'select',
      valueEnum: {
        'MONI_PAY': '模拟支付',
        'alipay': '汇付天下支付宝支付',
        'wx_lite': '汇付天下微信小程序支付'
      },
      align: 'center'
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      hideInSearch: true,
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '处理状态',
      dataIndex: 'tradeStatus',
      valueType: 'select',
      valueEnum: {
        'process': '处理中',
        'success': '处理成功',
        'failure': '处理失败'
      },
      align: 'center'
    },
    {
      title: '结算状态',
      dataIndex: 'settleStatus',
      valueType: 'select',
      valueEnum: {
        'unSettle': '未结算',
        'settled': '已结算',
        'partSettled': '部分结算'
      },
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: ()=> (
        <a onClick={()=>{}}>详情</a>
      )
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='orderNo'
        columns={columns}
        request={tradePage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolbar={{
          settings: false
        }}
      />
    </PageContainer>
  )
}

export default CostDetail
