import React, { 
  useRef,
  useEffect,
  useState
} from 'react'
import ProForm,{
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form'
import {
  Button, 
  Typography,
  Divider, 
  message,
  Tooltip,
  Space,
  Spin
} from 'antd'
import ProDescriptions from '@ant-design/pro-descriptions'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { updateStatus } from '@/services/account-management'
import { amountTransform } from '@/utils/utils'
import './styles.less'
import styles from './styles.less'
import TransactionDrawer from './transaction-drawer'

const { Title, Paragraph } = Typography

const AccountInformation = ({dataSource, loading}) => {
  const [popup, setPopup] = useState(false)
  const [sn, setSn] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [amountType, setAmountType] = useState(undefined)
  const formRef = useRef(null)

  useEffect(()=>{
    formRef.current.setFieldsValue({
      accountId: dataSource?.accountId,
      accountType: dataSource?.accountType,
      sn: dataSource?.sn,
      settleTime: dataSource?.settleTime,
      status: dataSource?.status
    })
  }, [dataSource])

  const TotalAccountFund = [
    {
      title: ()=>(
        <Space>
          <span>账户余额</span>
          <Tooltip title='累计总额-已提现金额+可用余额+冻结金额'>
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'total',
      render: (_, r)=> (
        <div className={styles.totalFund}>
          <span>{amountTransform(Number(_), '/')}</span>
          <a 
            onClick={()=> {
              setPopup(true)
              setSn(r?.sn)
              setTitle('账户总额-交易明细')
              setAmountType('total')
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
      dataIndex: 'totalAvailable',
      render: (_, r)=> (
        <div className={styles.totalFund}>
          <span>{amountTransform(Number(_), '/')}</span>
          <a 
            onClick={()=> {
              setPopup(true)
              setSn(r?.sn)
              setTitle('可用余额-交易明细')
              setAmountType('totalAvailable')
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
      dataIndex: 'totalFreeze',
      render: (_, r)=> (
        <div className={styles.totalFund}>
          <span>{amountTransform(Number(_), '/')}</span>
          <a 
            onClick={()=> {
              setPopup(true)
              setSn(r?.sn)
              setTitle('冻结金额-交易明细')
              setAmountType('totalFreeze')
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
        submitter={{
          render: ({form}) => {
            return (
              <Button
                key='submit'
                type='primary'
                onClick={()=>{
                  form?.submit()
                }}
              >
                提交修改
              </Button>
            )
          }
        }}
        style={{
          marginBottom: 50
        }}
        onFinish={async (e)=> {
          updateStatus({
            accountSn: e.sn,
            status: e.status
          }).then(res=> {
            if(res.success) message.success('信息修改成功')
          })
        }}
        formRef={formRef}
        layout='horizontal'
      >
        <Typography>
          <Paragraph>
            <Title level={5}>总账户信息</Title>
            <Divider/>
            <ProForm.Group>
              <ProFormText
                label='商户ID'
                name='accountId'
                disabled
              />
              <ProFormSelect
                label='商户类型'
                name='accountType'
                options={[
                  {
                    label: '平台',
                    value: 'platform'
                  },
                  {
                    label: '商家',
                    value: 'supplier'
                  },
                  {
                    label: '社区店',
                    value: 'store'
                  },
                  {
                    label: '会员',
                    value: 'member'
                  },
                  {
                    label: '内部店',
                    value: 'agentStore'
                  },
                  {
                    label: '运营中心',
                    value: 'agentCompany'
                  }
                ]}
                disabled
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                label='平台虚拟账号'
                name='sn'
                disabled
              />
              <ProFormText
                label='创建时间'
                name='settleTime'
                disabled
              />
            </ProForm.Group>
            <ProFormSelect
              label='账户状态'
              name='status'
              width={150}
              rules={[
                { required: true, message: '请选择账户状态' }
              ]}
              options={[
                {
                  label: '启用',
                  value: 'normal'
                },
                {
                  label: '禁用',
                  value: 'disabled'
                },
                {
                  label: '锁定',
                  value: 'locked'
                }
              ]}
            />
          </Paragraph>
        </Typography>
      </ProForm>
      <Typography>
        <Paragraph>
          <Title level={5}>总账户资金</Title>
          <Divider/>
          <ProDescriptions
            column={1}
            columns={TotalAccountFund}
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

export default AccountInformation
