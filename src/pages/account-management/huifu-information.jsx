import React, { 
  useRef,
  useEffect,
  useState
} from 'react'
import ProForm,{ ProFormText } from '@ant-design/pro-form'
import {
  Typography,
  Divider, 
  Tooltip,
  Space,
  Spin
} from 'antd'
import ProDescriptions from '@ant-design/pro-descriptions'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { amountTransform } from '@/utils/utils'
import './styles.less'
import styles from './styles.less'
import TransactionDrawer from './transaction-drawer'

const { Title, Paragraph } = Typography

const HuifuInformation = ({
  dataSource,
  loading,
  sn
}) => {
  const [popup, setPopup] = useState(false)
  const [title, setTitle] = useState(undefined)
  const [amountType, setAmountType] = useState(undefined)
  const formRef = useRef(null)

  useEffect(()=>{
    formRef.current.setFieldsValue({
      trdAccountId: dataSource?.trdAccountId,
      channelName: dataSource?.channelName,
      realname: dataSource?.realname,
      cardNo: dataSource?.cardNo,
      bankName: dataSource?.bankName
    })
  }, [dataSource])

  const HuifuAccountFund = [
    {
      title: ()=>(
        <Space>
          <span>账户余额</span>
          <Tooltip title='累计总额-已提现金额+可用余额+冻结金额'>
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'balance',
      render: (_)=> (
        <div className={styles.totalFund}>
          <span>{amountTransform(Number(_), '/')}</span>
          <a 
            onClick={()=> {
              setPopup(true)
              setTitle('账户总额-交易明细')
              setAmountType('balance')
            }}
          >
            交易明细
          </a>
        </div>
      )
    },
    {
      title: ()=>(
        <Space>
          <span>可用余额</span>
          <Tooltip title='指已解冻并结算的资金'>
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'available',
      render: (_)=> (
        <div className={styles.totalFund}>
          <span>{amountTransform(Number(_), '/')}</span>
          <a 
            onClick={()=> {
              setPopup(true)
              setTitle('可用余额-交易明细')
              setAmountType('balanceAvailable')
            }}
          >
            交易明细
          </a>
        </div>
      )
    },
    {
      title: ()=>(
        <Space>
          <span>冻结金额</span>
          <Tooltip title='含未结算资金+提现冻结中的资金'>
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'freeze',
      render: (_)=> (
        <div className={styles.totalFund}>
          <span>{amountTransform(Number(_), '/')}</span>
          <a 
            onClick={()=> {
              setPopup(true)
              setTitle('冻结金额-交易明细')
              setAmountType('balanceFreeze')
            }}
          >
            交易明细
          </a>
        </div>
      )
    }
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
        <Typography>
          <Paragraph>
            <Title level={5}>汇付子账户信息</Title>
            <Divider/>
            <ProForm.Group>
              <ProFormText
                label='汇付渠道账号'
                name='trdAccountId'
                disabled
              />
              <ProFormText
                label='渠道名称'
                name='channelName'
                disabled
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                label='银行账户名称'
                name='realname'
                disabled
              />
              <ProFormText
                label='银行账户号码'
                name='cardNo'
                disabled
              />
            </ProForm.Group>
            <ProFormText
              label='所属银行'
              name='bankName'
              width={180}
              disabled
            />
          </Paragraph>
        </Typography>
      </ProForm>
      <Typography>
        <Paragraph>
          <Title level={5}>汇付子账户资金</Title>
          <Divider/>
          <ProDescriptions
            column={1}
            columns={HuifuAccountFund}
            style={{
              background: '#fff',
              padding: 20
            }}
            bordered
            dataSource={dataSource}
          />
        </Paragraph>
      </Typography>
      {
        popup&&
        <TransactionDrawer
          sn={sn}
          title={title}
          visible={popup}
          setVisible={setPopup}
          amountType={amountType}
        />
      }
    </Spin>
  )
}

export default HuifuInformation
