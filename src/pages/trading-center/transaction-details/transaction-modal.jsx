import React, { useState, useEffect } from 'react'
import {
  Drawer,
  Typography,
  Divider
} from 'antd'
import ProDescriptions from '@ant-design/pro-descriptions'
import ProTable from '@ant-design/pro-table'

import { orderTypes } from '@/services/common'
import { amountTransform } from '@/utils/utils'
import './styles.less'
import styles from './styles.less'

const { Title, Paragraph } = Typography

const TransactionModal = ({
  visible,
  setVisible,
  data,
  loading
}) => {
  const [orderType, setOrderType] = useState(null)

  useEffect(() => {
    orderTypes().then(res => {
      setOrderType(res.data)
    })
    return () => {
      setOrderType(null)
    }
  }, [])

  const baseInfo = [
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '支付单号',
      dataIndex: 'payNo'
    },
    {
      title: '渠道单号',
      dataIndex: 'transactionId'
    },
    {
      title: '交易时间',
      dataIndex: 'createTime'
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
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'select',
      valueEnum: {
        'MONI_PAY': '模拟支付',
        'alipay': '汇付天下支付宝支付',
        'wx_lite': '汇付天下微信小程序支付'
      },
    },
    {
      title: '处理状态',
      dataIndex: 'tradeStatus',
      valueType: 'select',
      valueEnum: {
        'process': '处理中',
        'success': '处理成功',
        'failure': '处理失败'
      },
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
    },
    {
      title: '交易渠道',
      dataIndex: 'channelName',
    },
    {
      title: '付款方子账户',
      dataIndex: 'buyerSn',
    },
    {
      title: '付款方类型',
      dataIndex: 'buyerType',
    },
    {
      title: '处理备注',
      dataIndex: 'memo',
    },
    {
      title: '',
      dataIndex: '',
      render: ()=> ' '
    },
  ]

  const orderInfo = [
    {
      title: '订单号',
      dataIndex: 'orderId'
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: orderType
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime'
    },
    {
      title: '',
      dataIndex: '',
      render: ()=> ' '
    },
    {
      title: '订单总金额',
      dataIndex: 'amount',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '优惠金额',
      dataIndex: 'couponAmount',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '运费',
      dataIndex: 'freight',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '实付金额',
      dataIndex: 'payAmount',
      render: (_)=> amountTransform(_, '/')
    },
  ]

  const collectInformation = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '分账方子账户',
      dataIndex: 'accountSn',
      align: 'center'
    },
    {
      title: '分账方类型',
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
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '优惠扣减',
      dataIndex: 'couponAmount',
      align: 'center',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '通道费扣减',
      dataIndex: 'chargeFee',
      align: 'center',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '实际到账金额',
      dataIndex: 'realAmount',
      align: 'center',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '结算状态',
      align: 'center',
      dataIndex: 'settleStatus',
      valueType: 'select',
      valueEnum: {
        'unSettle': '未结算',
        'settled': '已结算',
        'partSettled': '部分结算'
      }
    },
    {
      title: '代收方子账户',
      align: 'center',
      dataIndex: 'agentAccountSn'
    },
  ]

  return (
    <Drawer
      width={1200}
      title='详情'
      visible={visible}
      onClose={() => setVisible(false)}
      destroyOnClose={true}
    >
      <Typography>
        <Paragraph>
          <Title level={5}>基础信息</Title>
          <Divider />
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
          <Title level={5}>订单信息</Title>
          <Divider />
          <ProDescriptions
            loading={loading}
            column={2}
            columns={orderInfo}
            style={{
              background: '#fff',
              padding: 20
            }}
            bordered
            dataSource={data?.orderInfo}
          />
          <div className={styles.container}>
            <div className={styles.box_wrap}>
              <div className={`${styles.box} ${styles.box_header}`}>商品信息</div>
              {
                data?.skus?.map((item, index) => (
                  <div key={item.skuId} className={styles.box}>
                    <div className={styles.title}>商品{index + 1}</div>
                    <div className={styles.box_wrap}>
                      <div className={styles.box}>
                        <div className={styles.label}>商品名称</div>
                        <div>{item.goodsName}</div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.label}>规格</div>
                        <div>{item.skuName}</div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.label}>销售价</div>
                        <div>{amountTransform(item.salePrice, '/')} 元</div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.label}>供货价</div>
                        <div>{amountTransform(item.supplyPrice, '/')} 元</div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.label}>购买数量</div>
                        <div>{item.paidCount}</div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </Paragraph>
        <Paragraph>
          <Title level={5}>分账信息</Title>
          <Divider />
          <ProTable
            rowKey='id'
            columns={collectInformation}
            toolbar={{
              settings: false
            }}
            pagination={false}
            search={false}
            dataSource={data?.divideInfos}
          />
        </Paragraph>
      </Typography>
    </Drawer>
  )
}

export default TransactionModal
