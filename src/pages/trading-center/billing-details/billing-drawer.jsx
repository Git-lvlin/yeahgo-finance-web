import React from 'react'
import { 
  Drawer,
  Typography,
  Divider
} from 'antd'
import ProDescriptions from '@ant-design/pro-descriptions'
import { amountTransform } from '@/utils/utils'

import './styles.less'
import ProTable from '@ant-design/pro-table'

const { Title, Paragraph } = Typography

const BillingDrawer = ({
  visible,
  setVisible,
  data,
  loading
}) => {

  const baseInfo = [
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
      title: '结算时间',
      dataIndex: 'settleTime',
      align: 'center'
    },
    {
      title: '实际到账金额',
      dataIndex: 'realAmount',
      align: 'center',
      render: (_)=> `￥${amountTransform(_, '/')}`
    },
    {
      title: '备注',
      dataIndex: 'memo',
      align: 'center'
    }
  ]
  
  const billInfo = [
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
      title: '分账金额',
      dataIndex: 'feeAmount',
      align: 'center',
      render: (_)=> `￥${amountTransform(Number(_), '/')}`
    },
    {
      title: '优惠扣减',
      dataIndex: 'couponAmount',
      align: 'center',
      render: (_)=> `￥${amountTransform(Number(_), '/')}`
    },
    {
      title: '通道费扣减',
      dataIndex: 'chargeFee',
      align: 'center',
      render: (_)=> `￥${amountTransform(Number(_), '/')}`
    },
    {
      title: '实际到账',
      dataIndex: 'realAmount',
      align: 'center',
      render: (_)=> `￥${amountTransform(Number(_), '/')}`
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
    }
  ]

  return (
    <Drawer
      visible={visible}
      onClose={()=> {setVisible(false)}}
      width={1200}
      title='详情'
      destroyOnClose={true}
    >
      <Typography>
        <Paragraph>
          <Title level={5}>基础信息</Title>
          <Divider/>
          <ProDescriptions
            loading={loading}
            column={2}
            columns={baseInfo}
            style={{
              background: '#fff',
              padding: 20
            }}
            bordered
            dataSource={data}
          />
        </Paragraph>
        <Paragraph>
          <Title level={5}>结算信息</Title>
          <Divider/>
          <ProTable
            rowKey='accountSn'
            columns={billInfo}
            search={false}
            pagination={false}
            dataSource={[data]}
            toolBarRender={false}
          />
        </Paragraph>
      </Typography>
    </Drawer>
  )
}

export default BillingDrawer
