import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import { fmisWithdrawLog } from '@/services/trading-center/withdrawal-log'
import { amountTransform } from '@/utils/utils'
import styles from './styles.less'

const WithdrawalLog = () => {
  const [totalAmount, setTotalAmount] = useState(0)

  const columns = [
    {
      title: '商户id',
      dataIndex: 'accountId',
      align: 'center'
    },
    {
      title: '商户类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: {
        'platform': '平台',
        'supplier': '供应商',
        'store': '店铺'
      },
      align: 'center'
    },
    {
      title: '业务单号',
      dataIndex: 'sn',
      align: 'center'
    },
    {
      title: '渠道流水号',
      dataIndex: 'voucher',
      align: 'center'
    },
    {
      title: '交易渠道',
      dataIndex: 'paymentMethod',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(Number(_), '/')
    },
    {
      title: '账户类型',
      dataIndex: 'bankAcctType',
      valueType: 'select',
      valueEnum: {
        'business': '对公',
        'person': '对私'
      },
      align: 'center'
    },
    {
      title: '提现账户名称',
      dataIndex: 'realName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '提现银行卡号',
      dataIndex: 'withdrawAccount',
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
      title: '提现申请时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
      render: (_) => moment(Number(_)).format('YYYY-MM-DD hh:mm:ss')
    },
    {
      title: '提现申请时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        'auditing': '待审核',
        'waitPay': '待打款',
        'paid': '已打款',
        'arrived': '已到账',
        'unPass': '审核拒绝',
        'failure': '提现失败'
      },
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'memo',
      align: 'center',
      hideInSearch: true
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='sn'
        columns={columns}
        request={fmisWithdrawLog}
        search={{
          labelWidth: 100
        }}
        postData={(v)=>{
          setTotalAmount(v?.totalAmount)
          return v?.page?.records
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolBarRender={false}
        tableRender={(_, dom) => (
          <>
            { dom }
            <div className={styles.summary}>
              总合计：<span>{amountTransform(Number(totalAmount), '/')}元</span>
            </div>
          </>
        )}
      />
    </PageContainer>
  )
}

export default WithdrawalLog
