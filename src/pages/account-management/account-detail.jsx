import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import moment from 'moment'

import { accountPage, accountDetail } from '@/services/account-management'
import { amountTransform } from '@/utils/utils'
import AccountDrawer from './account-drawer'
import Export from '@/components/export-excel/export'
import ExportHistory from '@/components/export-excel/export-history'

const AccountDetail = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [visit, setVisit] = useState(false)

  
  const getData = (id) => {
    setLoading(true)
    accountDetail({id}).then(res=> {
      setData(res.data)
    }).finally(()=>{
      setLoading(false)
    })
  }

  const getFieldValue = (form) => {
    const {settleTime, ...rest} = form.getFieldsValue()
    return {
      settleTimeBegin: settleTime&&moment(settleTime?.[0]).format('YYYY-MM-DD'),
      settleTimeEnd: settleTime&&moment(settleTime?.[1]).format('YYYY-MM-DD'),
      ...rest
    }
  }

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
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
        rowKey='id'
        columns={columns}
        request={accountPage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 120,
          optionRender: ({searchText, resetText}, {form}) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
            <Export
              change={(e)=> {setVisit(e)}}
              key="export"
              type="finance-account-manage-export"
              conditions={() => getFieldValue(form)}
            />,
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="finance-account-manage-export"
            />
          ]
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
