import React, { useRef, useEffect } from 'react'
import { Spin, Typography, Divider } from 'antd'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import ProTable from '@ant-design/pro-table'

import { amountTransform } from '@/utils/utils'

const { Title, Paragraph } = Typography

const MarginManagement = ({
  loading,
  dataSource,
  deposit
}) => {
  const formRef = useRef(null)

  useEffect(()=>{
    formRef.current.setFieldsValue({
      deposit: amountTransform(Number(deposit), '/').toFixed(2)
    })
  }, [dataSource, deposit])

  const columns = [
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
      align: 'center'
    },
    {
      title: '交易渠道',
      dataIndex: 'channelName',
      align: 'center'
    },
    {
      title: '交易金额（元）',
      dataIndex: 'changeAmount',
      align: 'center',
      render: (_)=> amountTransform(Number(_), '/')
    },
    {
      title: '交易后余额（元）',
      dataIndex: 'balanceAmount',
      align: 'center',
      render: (_)=> amountTransform(Number(_), '/')
    },
  ]

  return (
    <Spin spinning={loading}>
      <ProForm
        submitter={false}
        style={{
          marginBottom: 50
        }}
        formRef={formRef}
        layout='horizontal'
      >
        <ProFormText
          name='deposit'
          label='保证金余额'
          width={180}
          fieldProps={{
            addonAfter: '元'
          }}
          disabled
        />
      </ProForm>
      <Typography>
        <Paragraph>
          <Title level={5}>交易明细</Title>
          <Divider/>
          <ProTable
            rowKey='billNo'
            columns={columns}
            search={false}
            toolBarRender={false}
            dataSource={dataSource}
            pagination={{
              showQuickJumper: true,
              pageSize: 10
            }}
          />
        </Paragraph>
      </Typography>
    </Spin>
  )
}

export default MarginManagement
