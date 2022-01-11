import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import { fmisRefundLog } from '@/services/trading-center/after-sales'
import { amountTransform } from '@/utils/utils'
import styles from './styles.less'

const AfterSales = () => {
  const [totalAmount, setTotalAmount] = useState(0)

  const columns = [
    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmountReturn': '货款回退',
        'commissionReturn': '店铺收益回退',
        'suggestCommissionReturn': '店铺推荐收益回退',
        'platformCommissionReturn': '平台收益回退',
        'agentCompanyCommissionReturn': '运营中心收益回退',
        'feeReturn': '交易通道费回退',
        'freightReturn': '运费回退',
        'depositReturn': '保证金回退',
      },
      align: 'center'
    },
    {
      title: '售后业务单号',
      dataIndex: 'refundNo',
      align: 'center'
    },
    {
      title: '支付单号',
      dataIndex: 'payNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '渠道流水号',
      dataIndex: 'voucher',
      align: 'center'
    },
    {
      title: '交易渠道',
      dataIndex: 'paymentMethod',
      align: 'center'
    },
    {
      title: '交易金额',
      dataIndex: 'refundAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      align: 'center',
      render: (_) => moment(Number(_)).format('YYYY-MM-DD hh:mm:ss')
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '回退方ID',
      dataIndex: 'accountId',
      align: 'center'
    },
    {
      title: '回退方子账户',
      dataIndex: 'accountSn',
      align: 'center'
    },
    {
      title: '回退方类型',
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
      title: '关联单号',
      dataIndex: 'orderNo',
      align: 'center'
    },
    {
      title: '关联单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'normalOrder': '普通订单',
        'second': '秒约订单',
        'single': '单约订单',
        'group': '团约订单',
        'commandSalesOrder': '集约采购订单',  
        'activeSalesOrder': '主动集约店主订单',
        'dropShipping1688': '1688订单',
        'commandCollect': '集约销售订单',
        'activeCollect': '主动集约销售订单',
        'blindBox': '盲盒订单',
        'signIn': '签到订单',
        'sample': '样品订单',
      },
      align: 'center',
      hideInSearch: true
    },
    {
      title: '买家会员ID',
      dataIndex: 'buyerId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        'refunding': '退款中',
        'refuned': '已退款',
        'cancel': '退款取消'
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
        request={fmisRefundLog}
        search={{
          labelWidth: 100
        }}
        scroll={{x: 2200}}
        postData={(v)=>{
          setTotalAmount(v?.totalAmount)
          return v.page.records
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

export default AfterSales
