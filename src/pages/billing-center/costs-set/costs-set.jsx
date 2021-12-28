import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'

import { feeItemTradeMode } from '@/services/billing-center/costs-set'

const CostsSet = () => {

  const jumpToDetail = (id) => {
    history.push(`/billing-center/costs-set/cost-details/${id}`)
  }

  const columns = [
    {
      title: '业务模式',
      dataIndex: 'name',
      valueType: 'select',
      align: 'center'
    },
    {
      title: '费用数量',
      dataIndex: 'feeCount',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> (
        <a onClick={()=>{jumpToDetail(r.id)}}>费用明细</a>
      )
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='name'
        request={feeItemTradeMode}
        params={{}}
        search={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        columns={columns}
        toolBarRender={false}
      />
    </PageContainer>
  )
}

export default CostsSet
