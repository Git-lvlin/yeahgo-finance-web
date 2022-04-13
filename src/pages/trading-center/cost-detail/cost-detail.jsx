import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import moment from 'moment'

import { divideFeePage } from '@/services/trading-center/cost-detail'
import { orderTypes } from '@/services/common'
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export-excel/export'
import ExportHistory from '@/components/export-excel/export-history'

const CostDetail = () => {
  const [orderType, setOrderType] = useState(null)
  const [visit, setVisit] = useState(false)

  useEffect(() => {
    orderTypes({}).then(res=> {
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  const getFieldValue = (form) => {
    const {settleTime, createTime, ...rest}=form.getFieldsValue()
    return {
      settleTimeBegin: settleTime&&moment(settleTime?.[0]).format('YYYY-MM-DD'),
      settleTimeEnd: settleTime&&moment(settleTime?.[1]).format('YYYY-MM-DD'),
      createTimeBegin: createTime&&moment(createTime?.[0]).format('YYYY-MM-DD'),
      createTimeEnd: createTime&&moment(createTime?.[1]).format('YYYY-MM-DD'),
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
      title: '业务单号',
      dataIndex: 'orderNo',
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
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'order': '订单',
        'deposit': '保证金',
        'recharge': '充值'
      },
      align: 'center'
    },
    {
      title: '业务模式',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: orderType,
      align: 'center'
    },
    {
      title: '费用名称',
      dataIndex: 'feeName',
      align: 'center'
    },
    {
      title: '分账金额',
      dataIndex: 'feeAmount',
      align: 'center',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '优惠扣减',
      dataIndex: 'couponAmount',
      align: 'center',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '通道费扣减',
      dataIndex: 'chargeFee',
      align: 'center',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '实际到账金额',
      dataIndex: 'realAmount',
      align: 'center',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '代收方子账户',
      dataIndex: 'agentAccountSn',
      align: 'center',
    },
    {
      title: '清结算时间',
      dataIndex: 'settleTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '清结算时间',
      dataIndex: 'settleTime',
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        request={divideFeePage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolbar={{
          settings: false
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
              type="finance-cost-record-export"
              conditions={() => getFieldValue(form)}
            />,
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="finance-cost-record-export"
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default CostDetail
