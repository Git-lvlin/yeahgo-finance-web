import React, { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import AddDetail from './add-detail'
import { formula } from '@/services/billing-center/set-formula'

const SetFormula = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [data, setData] = useState(null)
  const actionRef = useRef(null)

  const columns = [
    {
      title: '公式名称',
      dataIndex: 'name',
      width: '20%',
      align: 'center'
    },
    {
      title: '业务模式',
      dataIndex: 'tradeModeName',
      width: '20%',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '公式状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      width: '10%',
      valueEnum: {
        '1': '启用',
        '-1': '停用',
        '0': '审批中',
        '2': '保存'
      },
      hideInSearch: true
    },
    {
      title: '审核状态',
      dataIndex: 'lastFlowStatus',
      align: 'center',
      valueType: 'select',
      width: '10%',
      valueEnum: {
        '1': '审核中',
        '2': '审核完成',
        '-1': '驳回'
      },
      hideInSearch: true,
      hideInSearch: true
    },
    {
      title: '公式内容',
      dataIndex: 'express',
      align: 'center',
      width: '30%',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, records)=>{
        if(records.status === 0 && records.lastFlowStatus === 1 ){
          return <span>修改</span>
        } else {
          return (
            <a onClick={()=>{
              setShowAdd(true)
              setData({
                id: records.id,
                name: records.name,
                status: records.status,
                express: records.express,
                tradeModeId: records.tradeModeId
              })
            }}>
              修改
            </a>
          )
        }
      },
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='name'
        columns={columns}
        params={{}}
        actionRef={actionRef}
        request={formula}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolbar={{
          settings: false
        }}
        toolBarRender={() => (
          <Button
            key="button"
            icon={<PlusOutlined />} 
            type="primary"
            onClick={()=> {setShowAdd(true);setData(null)}}
          >
            新增
          </Button>
        )}
      />
      {
        showAdd&&
        <AddDetail
          show={showAdd}
          setShow={setShowAdd}
          actRef={actionRef}
          data={data}
        />
      }
    </PageContainer>
  )
}

export default SetFormula
