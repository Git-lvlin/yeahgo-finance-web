import React, { useRef, useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import AddDetail from './add-detail'
import { formula, formulaDelete } from '@/services/billing-center/set-formula'
import { tradeModeList } from '@/services/common'

const DeleteDormula = ({id, actref}) => {

  const deleteItem = () => {
    formulaDelete(
      { id },
      {
        showSuccess: true,
        showError: true
      }
    ).finally(()=> {
      actref?.current?.reload()
    })
  }

  return (
    <Popconfirm
      title="确定要执行删除操作吗？"
      onConfirm={deleteItem}
    >
      <a>删除</a>
    </Popconfirm>
  )
}

const SetFormula = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [data, setData] = useState(null)
  const [orderType, setOrderType] = useState(null)

  const actionRef = useRef(null)

  useEffect(() => {
    tradeModeList({}).then(res=> {
      setOrderType(res.data.map(item => ({
        label: item.name, value: item.id
      })))
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
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
      title: '业务模式',
      dataIndex: 'tradeModeId',
      valueType: 'select',
      fieldProps: {
        options: orderType
      },
      hideInTable: true
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
      title: '公式内容',
      dataIndex: 'express',
      align: 'center',
      width: '30%',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, records)=> <DeleteDormula id={records.id} actref={actionRef}/>,
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
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
