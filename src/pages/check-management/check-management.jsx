import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

const CheckManagement = () => {

  const columns = [
    {
      title: '交易流水',
      dataIndex: ''
    },
    {
      title: '清算流水',
      dataIndex: ''
    },
    {
      title: '渠道订单号',
      dataIndex: ''
    },
    {
      title: '交易类型',
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
      title: '渠道名称',
      dataIndex: ''
    },
    {
      title: '业务模式',
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
      title: '操作人',
      dataIndex: ''
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        columns={columns}
        request={''}
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
