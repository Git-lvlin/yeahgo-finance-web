import React, { 
  useState,
  useEffect,
  useRef
} from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { 
  Button, 
  Space, 
  Tag,
  Popconfirm,
  Tabs
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useParams, history } from 'umi'

import Popup from './popup'
import { tradeModeList } from '@/services/common'
import { 
  feeItemPage,
  feeItemId,
  feeItemApproveSub,
  feeItemDelete,
  feeItemInApproval
} from '@/services/billing-center/costs-set'
import styles from './style.less'

const { TabPane } = Tabs

const DeleteItem = ({id, actionRef}) => {
  const [delLoading, setDelLoading] = useState(false)

  const delSubmit = () => {
    setDelLoading(true)
    feeItemDelete({id}).finally(()=>{
      actionRef.current.reload()
      setDelLoading(false)
    })
  }

  return (
    <Popconfirm
      title="确定要执行删除操作吗？"
      onConfirm={delSubmit}
      okButtonProps={{ loading: delLoading }}
    >
      <a>
        删除
      </a>
    </Popconfirm>
  )
}

const TabList = ({
  type, 
  isApproval, 
  id
}) => {
  const [visible, setVisible] = useState(false)
  const [tradeList, setTradeList ] = useState([])
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(false)
  const [loading, setLoading] = useState(false)
  const actionRef = useRef(null)

  useEffect(() => {
    tradeModeList({}).then(res=>{
      setTradeList(res?.data?.map(item => (
        { label: item.name, value: item.id }
      )))
    })
    return () => {
      setTradeList([])
    }
  }, [])

  const getDetail = (id) => {
    setLoading(true)
    feeItemId({id}).then(res=> {
      setData(res?.data)
    }).finally(()=> {
      setLoading(false)
    })
  }

  const setTitle = () => {
    const arr = tradeList.filter(item=> item.value === id)
    return arr?.[0]?.label
  }
 
  const tagName = (e) => {
    switch(e) {
      case 1:
        return <Tag color='#02D530'>新</Tag>
      case 2:
        return <Tag color='#76BEDB'>改</Tag>
      case 3:
        return <Tag color='#FF0000'>删</Tag>
      default: 
        return ''
    }
  }

  const goBack = () => {
    history.goBack()
  }

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '审核状态',
      dataIndex: 'flowStatus',
      valueType: 'select',
      valueEnum: {
        '0': '未提审',
        '1': '审核中',
        '2': '审核完成',
        '-1': '驳回',
        '-2': '撤回'
      },
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '费用名称',
      dataIndex: 'name',
      align: 'center',
      render: (_, r)=> (
        <Space size={10}>
          <span>{_}</span>
          {
            tagName(r.optionFlag)
          }
        </Space>
      )
    },
    {
      title: '优先级',
      dataIndex: 'orderIndex',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '收款方',
      dataIndex: 'recvRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '付款方',
      dataIndex: 'payRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '是否代收',
      dataIndex: 'isAgentRecv',
      valueType: 'select',
      valueEnum: {
        'true': '是',
        'false': '否',
      },
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '代收方',
      dataIndex: 'agentRecvRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '通道费承担方',
      dataIndex: 'serviceChargeRoleName',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        '1': '启用',
        '-1': '禁用'
      },
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, records)=> {
        if(records.optionFlag !== 3) {
          if(!isApproval) {
            return (
              <Space>
                <a onClick={()=>{
                  setVisible(true)
                  getDetail(records?.id)
                  setFlag(true)
                }}>
                  修改
                </a>
                <DeleteItem id={records.id} actionRef={actionRef}/>
              </Space>
            )
          } else {
            return (
              <Space>
                <span>修改</span>
                <span>删除</span>
              </Space>
            )
          }
        }else {
          return ''
        }
      }
    }
  ]

  return (
    <>
      <ProTable
        rowKey='name'
        headerTitle={setTitle()}
        request={feeItemPage}
        params={{tradeModeId: id, type}}
        actionRef={actionRef}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        columns={columns}
        toolbar={{
          settings: false
        }}
        toolBarRender={()=>[
          <Button
            type='primary'
            icon={<PlusOutlined />}
            key='add'
            onClick={()=>(
              setVisible(true),
              setData(null),
              setFlag(false)
            )}
            disabled={isApproval}
          >
            新建
          </Button>
        ]}
      />
      {
        visible&&
        <Popup 
          show={visible}
          setShow={setVisible}
          actionRef={actionRef}
          dataSource={data}
          setData={setData}
          isEdit={flag}
          tradeModeId={id}
          loading={loading}
          id={id}
          type={type}
        />
      }
      <div className={styles.back}>
        <Button type='primary' onClick={()=> {goBack()}}>返回</Button>
      </div>
    </>
  )
}

const CostSet = () => {
  const [approvalLoading, setApprovalLoading] = useState(false)
  const [isApproval, setIsApproval] = useState(false)

  const { id }  = useParams()

  useEffect(()=>{
    feeItemInApproval({
      tradeModeId: id
    }).then(res=>{
      setIsApproval(res?.data)
    })
  }, [])

  const approvalSubmit = () => {
    setApprovalLoading(true)
    feeItemApproveSub(
      {
        tradeModeId: id
      },
      {
        showSuccess: true,
        showError: true
      }
    ).then((res)=>{
      if(res.success) {
        setIsApproval(true)
      }
    }).finally(()=> {
      setApprovalLoading(false)
    })
  }


  return (
    <PageContainer title={false}>
      <Tabs
        type="card"
        defaultActiveKey="1"
        style={{
          background: '#fff',
          padding: 25
        }}
        tabBarExtraContent={
          <Popconfirm
            title="确定要执行提审操作吗？"
            onConfirm={approvalSubmit}
            okButtonProps={{ loading: approvalLoading }}
            key='approval'
            disabled={isApproval}
          >
            <Button disabled={isApproval}>
              提审
            </Button>
          </Popconfirm>
        }
      >
        <TabPane tab="分账费用" key="1">
          <TabList 
            type={1}
            isApproval={isApproval}
            id={id}
          />
        </TabPane>
        <TabPane tab="成本费用" key="2">
          <TabList 
            type={2}
            isApproval={isApproval}
            id={id}
          />
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}

export default CostSet
