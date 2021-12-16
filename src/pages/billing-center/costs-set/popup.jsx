import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import {
  Form,
  Typography,
  Divider
} from 'antd'
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormSelect,
  ProFormCheckbox,
  ProFormList,
  ProFormGroup
} from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { EditableProTable } from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'

import styles from './style.less'
import {
  tradeModeList,
  roleList,
  formulaList,
  ruleCondList
} from '@/services/common'

const { Title, Paragraph } = Typography

const defaultData = [
  // {id: 1, matchKey: 1, symbol: 2, value: 3, maxValue: 4}
]

const Popup = ({ show, setShow }) => {
  const [flag, setFlag] = useState(true)
  const [status, setStatus] = useState(false)
  const [ruleCond, setRuleCond] = useState([])
  // const [dataSource, setDataSource] = useState([])
  const [editableKeys, setEditableRowKeys] = useState()
  const [rulesList, setRulesList] = useState([
    {
      aa:{

      },
      table:[]
    }
    
  ])
  const [list, setList] = useState([])
  const [role, setRole] = useState([])
  const [formula, setFormula] = useState([])
  const [tradeModeId, setTradeModeId] = useState(null)
  const [form] = Form.useForm()
  const actionRef = useRef(null)
  const formRef = useRef(null)
  const data = tradeModeId ? tradeModeId : list?.[0]?.value

  // const arr = [{
  //   a:{

  //   },
  //   b:[]
  // }]

  // setArr 

  // index

  // setArr(arr[index].a)

  useEffect(() => {
    tradeModeList({}).then(res => {
      setList(res?.data?.map(item => (
        { label: item.name, value: item.id }
      )))
    })
    return () => {
      setList([])
    }
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      tradeModeId: list?.[0]?.value
    })
  }, [list])

  useEffect(() => {
    roleList({
      tradeModeId: data
    }).then(res => {
      setRole(res?.data?.map(item => (
        { label: item.name, value: item.id }
      )))
    })
    return () => {
      setRole([])
    }
  }, [tradeModeId, list])

  useEffect(() => {
    formulaList({
      tradeModeId: data
    }).then(res => {
      setFormula(res?.data?.map(item => (
        { label: item.name, value: item.id }
      )))
    })
    return () => {
      setFormula([])
    }
  }, [tradeModeId])

  useEffect(() => {
    ruleCondList().then(res => {
      if (res?.data?.assignType === 2) {
        setStatus(true)

      } else {
        setStatus(false)
        setRuleCond(res?.data?.map(item => (
          { label: item.name, value: item.id }
        )))
      }
    })
  }, [])

  const columns = [
    {
      title: '条件',
      dataIndex: 'matchKey',
      valueType: 'select',
      valueEnum: {
        0: '1',
        1: '2'
      },
      align: 'center'
    },
    {
      title: '比较符',
      dataIndex: 'symbol',
      valueType: 'select',
      valueEnum: {
        0: '>',
        1: '<',
        2: '>=',
        3: '<=',
        4: '=='
      },
      align: 'center'
    },
    {
      title: '值1',
      dataIndex: 'value',
      width: '20%',
      align: 'center'
    },
    {
      title: '值2',
      dataIndex: 'maxValue',
      width: '20%',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      align: 'center',
      render: (text, record, _, action) => (
        <a
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>
      ),
    }
  ]

  return (
    <DrawerForm
      title={false}
      visible={show}
      onVisibleChange={setShow}
      onFinish={async (e) => {
        console.log(e)
        return true
      }}
      layout='horizontal'
      form={form}
      drawerProps={{
        destroyOnClose: true,
        closable: false
      }}
      width={900}
      submitter={{
        searchConfig: {
          submitText: '提交审批',
          resetText: '取消',
        },
      }}

    >
      <Typography>
        <Title level={4}>基本信息</Title>
        <Divider />
        <Paragraph>
          <ProForm.Group>
            <ProFormText
              label='费用名称'
              name='name'
              width='sm'
            />
            <ProFormSelect
              label='业务模式'
              name='tradeModeId'
              width='sm'
              options={list}
              allowClear={false}
              proFieldProps={{
                onChange: (e) => {
                  setTradeModeId(e)
                }
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              label='费用状态'
              name='status'
              width='sm'
              options={[
                {
                  value: 0,
                  label: '启用'
                },
                {
                  value: 1,
                  label: '停用'
                }
              ]}
            />
            <ProFormSelect
              label='收款方'
              name='recvRoleId'
              width='sm'
              options={role}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              label='付款方'
              name='payRoleId'
              width='sm'
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              options={role}
            />
            <ProFormSelect
              label='手续费承担方'
              name='serviceChargeRoleId'
              width='sm'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 13 }}
              options={role}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              label='代收方'
              name='agentRecvRoleId'
              width='sm'
              disabled={flag}
              options={role}
            />
            <ProFormCheckbox
              name='isAgentRecv'
              onChange={(e) => {
                if (e.target.checked) {
                  setFlag(false)
                } else {
                  setFlag(true)
                }
              }}
            >
              是否代收
            </ProFormCheckbox>
          </ProForm.Group>
        </Paragraph>
      </Typography>
      <Typography>
        <Title level={4}>费用规则</Title>
        <Divider />
        <div onClick={()=>{
          const arr = JSON.parse(JSON.stringify(rulesList))
          arr.push([{id:arr.length}])
          setRulesList(arr)
        }}>
          添加一块
        </div>
        {
          rulesList&&
          rulesList?.map((item, index)=>(
            <div key={index}>
            <ProForm
              initialValues={item}
              layout='horizontal'
              // onFinish={
              //   // (v) => { console.log(v) }
              // }
              onValuesChange={(e,c)=>{console.log(c);}}
              // proFieldProps={}
            >
              <ProForm.Group>
                <ProFormText
                  label='规则名称'
                  name='name'
                  width='sm'
                />
                <ProFormSelect
                  label='计提公式'
                  name='formulaId'
                  width='sm'
                  options={formula}
                />
              </ProForm.Group>
             
            </ProForm>
             <EditableProTable
              rowKey="id"
              // name='table'
              recordCreatorProps={{
                creatorButtonText: '添加条件',
                // record: (index) => ({ id: Date.now() }),
                style: {
                  width: 120,
                  marginTop: 20,
                  position: 'absolute',
                  top: -60,
                  left: 25
                },
              }}
              style={{
                width: 750,
                marginTop: 50
              }}
              actionRef={actionRef}
              value={item.table}
              onChange={(e, r)=>{
                console.log(r);
                // const xxx  = JSON.parse(JSON.stringify(rulesList))
                // xxx[index].table = r
                // setRulesList(xxx)
              }}
              columns={columns}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableRowKeys,
                // onValuesChange:(e,r)=>{
                //   console.log(r);
                //   const xxx  = JSON.parse(JSON.stringify(rulesList))
                //   xxx[index].table = r

                //   console.log('xxx', xxx)
                //   setRulesList(xxx);
                // }
              }}
            />
            </div>
          ))
        }
        {/* <ProFormList
          name='rule'
          initialValue={[
            {
              name: '333',
              formulaId: '333'
            }
          ]}
          formRef={formRef}
          copyIconProps={false}
          itemRender={({ listDom, action }) => {
            return (
              <ProCard
                bordered
                extra={action}
                title={false}
                style={{
                  marginBottom: 8,
                  width: 800
                }}
              >
                {listDom}
              </ProCard>
            )
          }}
        >
          <ProFormGroup>
            <ProFormText
              label='规则名称'
              name='name'
              width='sm'
            />
            <ProFormSelect
              label='计提公式'
              name='formulaId'
              width='sm'
              options={formula}
            />
          </ProFormGroup>
          <ProForm.Item
            name='table'
            // initialValue={defaultData}
          >
            <EditableProTable
              rowKey="id"
              recordCreatorProps={{
                newRecordType: 'table',
                creatorButtonText: '添加条件',
                record: () => {
                  return { id: Date.now() }
                },
                style: {
                  width: 120,
                  marginTop: 20,
                  position: 'absolute',
                  top: -60,
                  left: 25
                },
              }}
              style={{
                width: 750,
                marginTop: 50
              }}
              actionRef={actionRef}
              columns={columns}
              editable={{
                editableKeys,
                onChange: setEditableRowKeys
              }}
            />
          </ProForm.Item>
        </ProFormList> */}
      </Typography>
    </DrawerForm>
  )
}

export default Popup