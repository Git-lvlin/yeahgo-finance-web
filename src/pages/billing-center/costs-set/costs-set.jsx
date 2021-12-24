import React, { 
  useState,
  useEffect,
  useRef
} from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import Popup from './popup'
import { tradeModeList } from '@/services/common'
import { feeItemPage, feeItemId } from '@/services/billing-center/costs-set'

const CostsSet = () => {
  const [visible, setVisible] = useState(false)
  const [tradeList, setTradeList ] = useState([])
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(false)
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
    feeItemId({id}).then(res=> {
      setData(res?.data)
    })
  }

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '业务模式',
      dataIndex: 'tradeModeId',
      valueType: 'select',
      fieldProps: {
        options: tradeList
      },
      align: 'center'
    },
    {
      title: '费用名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '手续费承担方',
      dataIndex: 'serviceChargeRoleName',
      hideInSearch: true,
      align: 'center'
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
      title: '审核状态',
      dataIndex: 'lastFlowStatus',
      valueType: 'select',
      valueEnum: {
        '1': '审核中',
        '2': '审核完成',
        '-1': '驳回'
      },
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, records)=> {
        if(records.status !== 0 && records.lastFlowStatus !== 1) {
          return <a onClick={()=>{
            setVisible(true)
            getDetail(records?.id)
            setFlag(true)
          }}>修改</a>
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
        request={feeItemPage}
        params={{}}
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
          isEdit={flag}
        />
      }
    </PageContainer>
  )
}

export default CostsSet
