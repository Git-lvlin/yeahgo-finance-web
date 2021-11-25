import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

const DealFlow = () => {

  const columns = [
    {
      title: '交易流水',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '交易类型',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '交易状态',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '渠道名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '交易金额',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '处理说明',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '交易时间',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '渠道返回时间',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '清算状态',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '清算处理说明',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        columns={columns}
        request={''}
        params={{}}
        toolbar={{
          settings: false
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
      />
    </PageContainer>
  )
}

export default DealFlow
