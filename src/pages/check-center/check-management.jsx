import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import { checkTradePage } from '@/services/check-center/check-management'

const CheckManagement = () => {

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '业务单号',
      dataIndex: ''
    },
    {
      title: '支付单号',
      dataIndex: ''
    },
    {
      title: '渠道流水号',
      dataIndex: ''
    },
    {
      title: '交易类型',
      dataIndex: ''
    },
    {
      title: '交易渠道',
      dataIndex: ''
    },
    {
      title: '处理说明',
      dataIndex: ''
    },
    {
      title: '支付金额',
      dataIndex: ''
    },
    {
      title: '交易时间',
      dataIndex: ''
    },
    {
      title: '对账时间',
      dataIndex: ''
    },
    {
      title: '对账状态',
      dataIndex: ''
    },
    {
      title: '处理说明',
      dataIndex: ''
    },
    {
      title: '操作',
      valueType: 'option'
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        request={checkTradePage}
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

export default CheckManagement
