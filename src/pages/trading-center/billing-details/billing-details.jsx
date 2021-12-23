import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import { settlePage, settleDetail } from '@/services/trading-center/billing-details'
import { amountTransform } from '@/utils/utils'
import BillingDrawer from './billing-drawer'

const BillingDetails = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const getData = (id) => {
    setLoading(true)
    settleDetail({id}).then(res => {
      setData(res.data)
    }).finally(()=> {
      setLoading(false)
    })
  }
  

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '业务单号',
      dataIndex: 'settleSn',
      align: 'center'
    },
    {
      title: '支付单号',
      dataIndex: 'payNo',
      align: 'center'
    },
    {
      title: '收款方子账户',
      dataIndex: 'accountSn',
      align: 'center'
    },
    {
      title: '收款方类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: {
        'platform': '平台',
        'supplier': '商家',
        'store': '社区店',
        'member': '会员',
        'agentStore': '内部店',
        'agentCompany': '运营中心'
      },
      align: 'center'
    },
    {
      title: '费用名称',
      dataIndex: 'feeName',
      align: 'center'
    },
    {
      title: '实际到账金额',
      dataIndex: 'realAmount',
      align: 'center',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '结算时间',
      dataIndex: 'settleTime',
      align: 'center'
    },
    {
      title: '结算状态',
      dataIndex: 'settleStatus',
      valueType: 'select',
      valueEnum: {
        'unSettle': '未结算',
        'settled': '已结算',
        'partSettled': '部分结算'
      },
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'memo',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
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
        rowKey='id'
        columns={columns}
        request={settlePage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolbar={{
          settings: false
        }}
        search={{
          labelWidth: 100
        }}
      />
      {
        showPopup&&
        <BillingDrawer
          visible={showPopup}
          setVisible={setShowPopup}
          data={data}
          loading={loading}
        />
      }
    </PageContainer>
  )
}

export default BillingDetails
