import React from 'react'
import { Drawer } from 'antd'
import ProTable from '@ant-design/pro-table'

import { accountLogPage } from '@/services/account-management'

const TransactionDrawer = ({
  title,
  visible,
  setVisible,
  sn,
  amountType
}) => {
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '交易类型',
      dataIndex: 'tradeTypeDesc',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'select',
      valueEnum: {
        'goodsAmount': '货款',
        'goodsAmountReturn': '货款回退',
        'commission': '店主收益',
        'commissionReturn': '店主收益回退',
        'platformCommission': '平台收益',
        'platformCommissionReturn': '平台收益回退',
        'fee': '交易通道费',
        'feeReturn': '交易通道费回退',
        'recharge': '充值',
        'giveOut': '划扣',
        'withdraw': '提现',
        'refundRecharge': '售后款',
        'debt': '欠款',
        'debtReturn': '欠款偿还',
        'unfreeze': '解冻',
        'freeze': '冻结',
        'suggestCommission': '推荐店主收益',
        'suggestCommissionReturn': '推荐店主收益回退',
        'agentCompanyCommission': '运营中心收益',
        'agentCompanyCommissionReturn': '运营中心收益回退',
        'freight': '运费',
        'freightReturn': '运费回退',
        'yeahCardRecharge': '约卡充值',
        'deposit': '保证金',
        'depositReturn': '保证金回退'
      },
      hideInTable: true,
      align: 'center'
    },
    {
      title: '业务单号',
      dataIndex: 'billNo',
      align: 'center'
    },
    {
      title: '支付单号',
      dataIndex: 'payNo',
      align: 'center'
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
      hideInTable: true
    },
    {
      title: '费用名称',
      dataIndex: 'feeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '分账金额',
      dataIndex: 'divideAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '通道费扣减',
      dataIndex: 'feeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '优惠扣减',
      dataIndex: 'deductAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'changeAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易后余额',
      dataIndex: 'balanceAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易描述',
      dataIndex: 'description',
      align: 'center',
      hideInSearch: true
    },
  ]
  
  return (
    <Drawer
      title={title}
      width={1200}
      visible={visible}
      onClose={()=> setVisible(false)}
      destroyOnClose={true}
    >
      <ProTable
        rowkey='id'
        columns={columns}
        params={{sn, amountType}}
        request={accountLogPage}
        toolBarRender={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
      />
    </Drawer>
  )
}

export default TransactionDrawer
