import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

const CapitalAllocation = () => {
  const columns = [
    {
      title: '交易流水',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '清算类型',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '清算流水',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '商户类型',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '商户名称',
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
      title: '交易时间',
      dataIndex: '',
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=""
        columns={columns}
        toolbar={{settings: false}}
        params={{}}
        request={''}
        pagination={{
          showQuickJumper:true,
          pageSize: 10
        }}
      />
    </PageContainer>
  )
}

export default CapitalAllocation