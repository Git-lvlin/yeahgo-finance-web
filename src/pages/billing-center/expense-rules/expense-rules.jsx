import React, { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form'
import { Button, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { EditableProTable } from '@ant-design/pro-table'

import styles from './style.less'

const PopupDetail = ({show, setShow}) => {
  const [dataSource, setDataSource] = useState([])
  const [editableKeys, setEditableRowKeys] = useState([])
  const [form] = Form.useForm()
  const actionRef = useRef(null)

  const columns = [
    {
      title: '条件',
      dataIndex: 'a',
      align: 'center'
    },
    {
      title: '比较符',
      dataIndex: 'b',
      align: 'center'
    },
    {
      title: '值1',
      dataIndex: 'c',
      align: 'center'
    },
    {
      title: '值2',
      dataIndex: 'd',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      width: '15%',
      align: 'center',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          修改
        </a>,
        <a
          key="editable"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    }
  ]

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  
  return (
    <ModalForm
      title={false}
      visible={show}
      onVisibleChange={setShow}
      onFinish={async () => {
        return true
      }}
      layout='horizontal'
      form={form}
      modalProps={{
        destroyOnClose: true,
        closable: false
      }}
      {...formItemLayout}
    >
      <ProForm.Group>
        <ProFormText
          label='计提规则'
          name=''
          width='sm'
        />
        <ProFormSelect
          label='业务模式'
          name=''
          width='sm'
          options={[
            {
              label: '秒约',
              value: '0'
            },
            {
              label: '集约',
              value: '1'
            },
            {
              label: '1688',
              value: '2'
            }
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label='规则状态'
          name=''
          width='sm'
          options={[
            {
              label: '启用',
              value: '0'
            },
            {
              label: '停用',
              value: '1'
            }
          ]}
        />
        <ProFormSelect
          label='费用名称'
          name=''
          width='sm'
          options={[
            {
              label: '货款',
              value: '0'
            },
            {
              label: '运费',
              value: '1'
            }
          ]}
        />
      </ProForm.Group>
      <ProFormSelect
        label='计算公式'
        name=''
        width='sm'
        labelCol= {{ span: 3 }}
        options={[
          {
            label: '公式1',
            value: '0'
          },
          {
            label: '公式2',
            value: '1'
          }
        ]}
      />
      <div className={styles.add}>
        <a onClick={
          () => {
            actionRef.current?.addEditRecord?.({
              id: (Math.random() * 1000000).toFixed(0),
              title: ''
            })
          }}
        >
          <PlusOutlined/>
          添加条件
        </a>
      </div>
      <EditableProTable
         rowKey="id"
         actionRef={actionRef}
         maxLength={5}
         recordCreatorProps={false}
         columns={columns}
         value={dataSource}
         onChange={setDataSource}
         editable={{
           form,
           editableKeys,
           onSave: async () => {
            //  await waitTime(2000)
           },
           onChange: setEditableRowKeys,
           actionRender: (row, config, dom) => [dom.save, dom.cancel]
         }}
      />
    </ModalForm>
  )
}

const ExpenseRules = () => {
  const [visible, setVisible] = useState(false)

  const columns = [
    {
      title: '业务模式',
      dataInex: '',
      valueType: 'select',
      valueEnum: {
        1: '秒约',
        2: '集约',
        3: '1688'
      },
      align: 'center'
    },
    {
      title: '计提规则',
      dataInex: '',
      align: 'center'
    },
    {
      title: '费用名称',
      dataInex: '',
      align: 'center'
    },
    {
      title: '计费公式',
      dataInex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '规则条件',
      dataInex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataInex: '',
      valueType: 'select',
      valueEnum: {
        1: '在用',
        2: '审批中',
        3: '停用'
      },
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        params={{}}
        request={''}
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
            icon={<PlusOutlined/>}
            onClick={()=>{setVisible(true)}}
          >
            新增
          </Button>
        )}
      />
      {
        visible&&
        <PopupDetail 
          show={visible}
          setShow={setVisible}
        />
      }
    </PageContainer>
  )
}

export default ExpenseRules
