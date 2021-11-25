import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'

const ChannelInformation = () =>{

  const columns = [
    {
      title: '渠道名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '渠道状态',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '接口名称',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '交易类型',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: '',
      valueType: 'dateRange',
      align: 'center'
    },
    {
      title: '渠道编号',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      render: ()=> (
        <>
          <a>编辑</a>
          <a>详情</a>
        </>
      ),
      align: 'center'
    }

  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        columns={columns}
        params={{}}
        request={''}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolbar={{
          settings: false
        }}
        toolBarRender={()=>(
          <Button type='primary'>新增客户</Button>
        )}
      />
    </PageContainer>
  )
}

export default ChannelInformation