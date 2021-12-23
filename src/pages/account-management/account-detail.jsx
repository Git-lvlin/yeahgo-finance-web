import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import { accountPage, accountDetail } from '@/services/account-management'
import { amountTransform } from '@/utils/utils'
import AccountDrawer from './account-drawer'

const AccountDetail = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  
  const getData = (id) => {
    setLoading(true)
    accountDetail({id}).then(res=> {
      setData(res.data)
    }).finally(()=>{
      setLoading(false)
    })
  }

  const columns = [
    {
      title: '商户ID',
      dataIndex: 'accountId',
      align: 'center'
    },
    {
      title: '商户类型',
      dataIndex: 'accountType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        'platform': '平台',
        'supplier': '商家',
        'store': '社区店',
        'member': '会员',
        'agentStore': '内部店',
        'agentCompany': '运营中心'
      },
    },
    {
      title: '平台虚拟子账号',
      dataIndex: 'sn',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'settleTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'settleTime',
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        'normal': '正常',
        'locked': '锁定',
        'disabled': '禁用'
      }
    },
    {
      title: '账户余额',
      dataIndex: 'total',
      align: 'center',
      hideInSearch: true,
      render: (_) => `￥${amountTransform(Number(_), '/')}`
    },
    {
      title: '银行账户名称',
      dataIndex: 'realname',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '银行账户号码',
      dataIndex: 'cardNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属银行',
      dataIndex: 'bankName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, r)=> (
        <a 
          onClick={()=>{
            setShowPopup(true)
            getData(r.id)
          }}
        >
          详情
        </a>
      )
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='accountId'
        columns={columns}
        request={accountPage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 120
        }}
        toolBarRender={false}
      />
      {
        showPopup&&
        <AccountDrawer
          visible={showPopup}
          setVisible={setShowPopup}
          data={data}
          loading={loading}
        />
      }
    </PageContainer>
  )
}

export default AccountDetail
