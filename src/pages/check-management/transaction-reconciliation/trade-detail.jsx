import React, { useEffect, useState } from 'react'
import { Drawer, Typography, Divider } from 'antd'
import ProTable from '@ant-design/pro-table'

import { checkTradeDetail } from '@/services/check-management/transaction-reconciliation'
import { amountTransform } from '@/utils/utils'

const { Paragraph, Title } = Typography

const TradeDetail = ({
  visible,
  setVisible,
  id
}) => {
  const [data, setData] = useState(null)

  useEffect(()=>{
    checkTradeDetail({
      tradeType: 'trade',
      id
    }).then(res => {
      setData(res.data)
    })
    return () => {
      setData(null)
    }
  }, [id])

  const statementData = [
    {
      dataIndex: 'dataFrom',
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
      title: '渠道流水号',
      dataIndex: 'transactionId',
      align: 'center'
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      render: (_) => amountTransform(Number(_), '/'),
      align: 'center'
    }
  ]

  const operationLog = [
    {
      title: '操作人',
      dataIndex: 'createUserName',
      align: 'center'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '操作结果',
      dataIndex: 'checkStatus',
      valueType: 'select',
      valueEnum: {
        'success': '成功',
        'failure': '失败',
      },
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'checkDesc',
      align: 'center'
    }
  ]

  return (
    <Drawer
      title='交易对账-详情'
      onClose={()=>setVisible(false)}
      visible={visible}
      width={1200}
    >
      <Typography>
        <Paragraph>
          <Title level={5}>对账单数据</Title>
          <Divider/>
          <ProTable
            rowKey='billNo'
            columns={statementData}
            dataSource={data?.compareDatas}
            search={false}
            toolBarRender={false}
            pagination={{
              showQuickJumper: true,
              pageSize: 10
            }}
          />
        </Paragraph>
        <Paragraph>
          <Title level={5}>操作日志</Title>
          <Divider/>
          <ProTable
            rowKey='createUserName'
            columns={operationLog}
            dataSource={data?.logs}
            search={false}
            toolBarRender={false}
            pagination={{
              showQuickJumper: true,
              pageSize: 10
            }}
          />
        </Paragraph>
      </Typography>
    </Drawer>
  )
}

export default TradeDetail