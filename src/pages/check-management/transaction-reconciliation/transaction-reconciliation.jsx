import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Space } from 'antd'

import { 
  checkTradePage,
  checkUpdateStatusBatch,
  checkCheckByApiBatch
} from '@/services/check-management/transaction-reconciliation'
import { amountTransform } from '@/utils/utils'
import TradeDetail from './trade-detail'

const TransactionReconciliation = () => {
  const [id, setId] = useState()
  const [showPopup, setShowPopup] = useState(false)
  const [flag, setFlag] = useState(false)
  const [status, setStatus] = useState(false)
  const actionRef = useRef()

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
      title: '渠道流水号',
      dataIndex: 'transactionId',
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
      title: '交易渠道',
      dataIndex: 'channelName',
      align: 'center'
    },
    {
      title: '支付金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(Number(_), '/')
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
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '对账时间',
      dataIndex: 'checkTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '对账时间',
      dataIndex: 'checkTime',
      align: 'center',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '对账状态',
      dataIndex: 'checkStatus',
      valueType: 'select',
      valueEnum: {
        'unCheck': '未对账',
        'success': '成功',
        'failure': '失败'
      },
      align: 'center'
    },
    {
      title: '处理说明',
      dataIndex: 'checkDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> {
        if(!r.checkStatus) return <span>详情</span>
        return (
          <a onClick={()=>{ setShowPopup(true); setId(r?.id) }}>
            详情
          </a>
        )
      }
    },
  ]

  const checkStatus = (e, status, callBack) => {
    checkUpdateStatusBatch({
      checkType: 'trade',
      ids: e,
      status
    },
    {
      showSuccess: true,
      showError: true
    }).then(()=>{
      actionRef.current.reload()
      callBack()
    })
  }

  const reconciliation = (ids, callBack) => {
    checkCheckByApiBatch({
      checkType: 'trade',
      ids
    },
    {
      showSuccess: true,
      showError: true
    }).then(()=>{
      actionRef.current.reload()
      callBack()
    })
    
  }

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        actionRef={actionRef}
        rowSelection={{
          columnTitle: '选择',
          columnWidth: '5%'
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
        )}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
          const success = selectedRowKeys&&selectedRows.every(item=> item.checkStatus === "success")
          const failure = selectedRowKeys&&selectedRows.every(item=> item.checkStatus === "failure")
          if(selectedRowKeys[0]&&success) {
            setFlag(false)
          } else {
            setFlag(true)
          }
          if(selectedRowKeys[0]&&failure) {
            setStatus(false)
          } else {
            setStatus(true)
          }
          return (
            <Space size={16}>
              {
                flag?
                <a onClick={()=>{
                  checkStatus(selectedRowKeys, 'success', onCleanSelected)
                }}>
                  置为成功
                </a>:
                <span>置为成功</span>
              }
              {
                status?
                <a onClick={()=>{
                  onCleanSelected
                  checkStatus(selectedRowKeys, 'failure', onCleanSelected)
                }}>
                  置为失败
                </a>:
                <span>置为失败</span>
              }
              <a onClick={()=>{
                reconciliation(selectedRowKeys, onCleanSelected)
              }}>
                手动发起对账
              </a>
            </Space>
          )
        }}
        columns={columns}
        request={checkTradePage}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolbar={{
          settings: false
        }}
      />
      {
        showPopup&&
        <TradeDetail 
          visible={showPopup}
          setVisible={setShowPopup}
          id={id}
        />
      }
    </PageContainer>
  )
}

export default TransactionReconciliation
