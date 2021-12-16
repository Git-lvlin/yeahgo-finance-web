import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import Popup from './popup'
import { feeItemPage } from '@/services/billing-center/costs-set'

const CostsSet = () => {
  const [visible, setVisible ] = useState(false)

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '业务模式',
      dataIndex: 'tradeModeId',
      valueType: 'select',
      valueEnum: {
        1: '秒约',
        2: '集约',
        3: '1688'
      },
      align: 'center'
    },
    {
      title: '费用名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '手续费承担方',
      dataIndex: 'serviceChargeRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '收款方',
      dataIndex: 'recvRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '付款方',
      dataIndex: 'payRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        '0': '审核中',
        '1': '启用',
        '-1': '禁用'
      },
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, records)=> {
        if(records.status === 1 || records.status === 1) {
          return <a>修改</a>
        } else {
          return <span>修改</span>
        }
      }
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='name'
        request={feeItemPage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        columns={columns}
        toolbar={{
          settings: false
        }}
        toolBarRender={()=>(
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={()=>(
              setVisible(true)
            )}
          >
            新建
          </Button>
        )}
      />
      {
        visible&&
        <Popup show={visible} setShow={setVisible}/>
      }
    </PageContainer>
  )
}

export default CostsSet
