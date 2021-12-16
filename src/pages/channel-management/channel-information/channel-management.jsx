import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import { channel } from '@/services/channel-management'

const ChannelInformation = () =>{

  const columns = [
    {
      title: '渠道编号',
      dataIndex: 'code',
      align: 'center'
    },
    {
      title: '渠道名称',
      dataIndex: 'name',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '渠道状态',
      dataIndex: 'status',
      valueType: "select",
      valueEnum: {
        '1': '启用',
        '-1': '停用'
      },
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '手续费费率',
      dataIndex: 'serviceChargeRate',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='code'
        columns={columns}
        params={{}}
        request={channel}
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

export default ChannelInformation