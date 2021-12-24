import React, { 
    useState,
    useEffect,
    useRef
  } from 'react'
  import { PageContainer } from '@ant-design/pro-layout'
  import ProTable from '@ant-design/pro-table'
  import { flowMainList } from '@/services/audit-management/audit-configuration'
  import Audit from './form';
  
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
        title: '审批流程名称',
        dataIndex: 'name',
        valueType: 'text',
        align: 'center'
      },
      {
        title: '操作',
        valueType: 'option',
        align: 'center',
        render: (text, record, _, action)=> {
        return <a onClick={()=>{setDetailData(record);setVisible(true)}}>编辑审核人</a>
        }
      }
    ]
  
    return (
      <PageContainer title={false}>
        <ProTable
          rowKey='id'
          request={flowMainList}
          params={{}}
          actionRef={actionRef}
          pagination={{
            pageSize: 10
          }}
          search={false}
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
  