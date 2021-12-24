import React, { 
    useState,
    useEffect,
    useRef
  } from 'react'
  import { PageContainer } from '@ant-design/pro-layout'
  import ProTable from '@ant-design/pro-table'
  import { Button } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { myInstances } from '@/services/audit-management/commission-audit'
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
        title: 'taskId',
        dataIndex: 'taskId',
        align: 'center',
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
        title: '审批事项',
        dataIndex: 'name',
        align: 'center',
        hideInSearch: true,
      },
      {
        title: '提交人',
        dataIndex: 'submitorName',
        align: 'center'
      },
      {
        title: '提交时间',
        dataIndex: 'submitTime',
        valueType: 'dateTimeRange',
        align: 'center',
        hideInTable: true
      },
      {
        title: '提交时间',
        dataIndex: 'submitTime',
        align: 'center',
        hideInSearch: true,
        render:(_,data)=>{
          return moment(_).format('YYYY-MM-DD HH:mm:ss')
        }
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

    const filtrationData=(val)=>{
        const data=[]
        val.map(ele=>{
            data.push({
                id:ele.flowInstanceResponse[0]?.id,
                taskId:ele.id,
                name:ele.flowInstanceResponse[0]?.name,
                submitorName:ele.flowInstanceResponse[0]?.submitorName,
                submitTime:ele.flowInstanceResponse[0]?.submitTime
            })
        })
       return data
    }
  
    return (
      <PageContainer title={false}>
        <ProTable
          rowKey='id'
          request={myInstances}
          params={{}}
          actionRef={actionRef}
          pagination={{
            pageSize: 10
          }}
          params={{
            status:1
          }}
          postData={(data)=>filtrationData(data)}
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
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { actionRef.current.reload(); setDetailData(null) }}
        />}
      </PageContainer>
    )
  }
  