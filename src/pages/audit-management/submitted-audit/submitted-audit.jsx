import React, { 
    useState,
    useEffect,
    useRef
  } from 'react'
  import { PageContainer } from '@ant-design/pro-layout'
  import ProTable from '@ant-design/pro-table'
  import { getMyInstance } from '@/services/audit-management/submitted-audit'
  import Audit from './form';
  import moment from 'moment'

  
export default () => {
    const [visible, setVisible ] = useState(false)
    const [detailData, setDetailData] = useState(false)
    const actionRef = useRef(null)
    useEffect(() => {
    }, [])
  
    const columns = [
      {
        dataIndex: 'id',
        hideInSearch: true,
        hideInTable: true
      },
      {
        title: '审批编号',
        dataIndex: 'id',
        valueType: 'text',
        align: 'center'
      },
      {
        title: '工单标题',
        dataIndex: 'title',
        valueType: 'text',
        align: 'center'
      },
      {
        title: '审批事项',
        dataIndex: 'name',
        align: 'center',
        hideInSearch: true,
      },
      {
        title: '审批状态',
        dataIndex: 'approvalStatus',
        align: 'center',
        valueType:'select',
        valueEnum: {
            0: '全部',
            '-1': '已驳回',
            2: '已通过',
            1: '审核中'
            },
        hideInTable: true
      },
      {
        title: '审批状态',
        dataIndex: 'status',
        align: 'center',
        valueType:'select',
        valueEnum: {
            0: '全部',
            '-1': '已驳回',
            2: '已通过',
            1: '审核中'
            },
            hideInSearch: true,
      },
      {
        title: '提交时间',
        dataIndex: 'submitTime',
        valueType: 'dateTimeRange',
        align: 'center',
        hideInTable: true,
        render:(_,data)=>{
          return moment(_).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '提交时间',
        dataIndex: 'submitTime',
        align: 'center',
        hideInSearch: true,
      },
      {
        title: '操作',
        valueType: 'option',
        align: 'center',
        render: (text, record, _, action)=> {
          return <a onClick={()=>{setDetailData(record);setVisible(true)}}>详情</a>
        }
      }
    ]
  
    return (
      <PageContainer title={false}>
        <ProTable
          rowKey='id'
          request={getMyInstance}
          params={{}}
          actionRef={actionRef}
          pagination={{
            pageSize: 10
          }}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
            ],
          }}
          columns={columns}
          toolbar={{
            settings: false
          }}
        />
        {visible&& <Audit
        visible={visible}
        setVisible={setVisible}
        detailData={detailData}
        onClose={() => { actionRef.current.reload(); setDetailData(null) }}
        />}
      </PageContainer>
    )
  }
  