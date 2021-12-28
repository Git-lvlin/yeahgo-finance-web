import React, { 
  useState,
  useEffect,
  useRef
} from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'umi'

import Popup from './popup'
import { tradeModeList } from '@/services/common'
import { feeItemPage, feeItemId } from '@/services/billing-center/costs-set'

const CostsSet = () => {
  const [visible, setVisible] = useState(false)
  const [tradeList, setTradeList ] = useState([])
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(false)
  const actionRef = useRef(null)
  const { id }  = useParams()

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
    feeItemId({id}).then(res=> {
      setData(res?.data)
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
        '-1': '驳回'
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
        '0': '审核中',
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
        if(records.status !== 0 && records.lastFlowStatus !== 1) {
          return (
            <a onClick={()=>{
              setVisible(true)
              getDetail(records?.id)
              setFlag(true)
            }}>
              修改
            </a>
          )
        } else {
          return <span>修改</span>
        }
      }
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='name'
        headerTitle={setTitle()}
        request={feeItemPage}
        params={{tradeModeId: id}}
        actionRef={actionRef}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        columns={columns}
        toolbar={{
          settings: false
        }}
        toolBarRender={()=>(
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={()=>(
              setVisible(true),
              setData(null),
              setFlag(false)
            )}
          >
            新建
          </Button>
        )}
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
        />
      }
    </PageContainer>
  )
}

export default CostsSet
