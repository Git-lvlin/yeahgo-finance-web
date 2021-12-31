import React, {
  useState, 
  useRef,
  useEffect
} from 'react'
import { 
  Button,
  Form,
  message, 
  Tag
} from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form'

import { 
  formulaAdd,
  formulaUpdate,
  feeItemAll,
  formulaCheck
} from '@/services/billing-center/set-formula'
import { tradeModeList } from '@/services/common'

const AddDetail = ({
  show,
  setShow,
  actRef,
  data
}) => {
  const [client, setClient] = useState(0)
  const [selectData, setSelectData] = useState([])
  const [list, setList] = useState([])
  const [tradeMode, setTradeMode] = useState(undefined)
  const [flag, setFlag] = useState(false)
  const [success, setSuccess] = useState(false)
  const areaInput = useRef()
  const [form] = Form.useForm()

  useEffect(() => {
    tradeModeList({}).then(res=>{
      setList(res?.data?.map(item=>(
        {label: item.name, value: item.id}
      )))
    })
    return ()=>{
      setList([])
    }
  }, [])

  useEffect(() => {
    if(data){
      setTradeMode(data.tradeModeId)
      form.setFieldsValue({
        name: data.name,
        status: data.status,
        express: data.express,
        tradeModeId: data.tradeModeId
      })
    } else {
      form.setFieldsValue({
        tradeModeId: list?.[0]?.value
      })
    }
  }, [data, list])

  useEffect(()=>{
    const data = tradeMode ? tradeMode : '1'
    feeItemAll({
      tradeModeId: data
    }).then(res=>{
      setSelectData(res?.data?.map(item=>({
        label: item.name,
        value: '${' + item.name + '}'
      })))
    })
    return ()=>{
      setSelectData([])
    }
  }, [data, tradeMode])

  const checkFormula = () => {
    formulaCheck({
      express: form?.getFieldsValue()?.express
    },
    {
      showError: false
    }).then(res => {
      setFlag(true)
      if(res.success) {
        setSuccess(true)
      } else {
        setSuccess(false)
      }
    })
  }

  return (
    <ModalForm
      title={false}
      visible={show}
      onVisibleChange={setShow}
      onFinish={async (values) => {
        if(!data) {
          formulaAdd(values).then(res=>{
            if(res.success) message.success('公式添加成功')
          })
        } else {
          formulaUpdate({
            id: data.id,
            ...values
          }).then(res=>{
            if(res.success) message.success('公式修改成功')
          })
        }
        actRef.current.reload()
        return true
      }}
      layout='horizontal'
      form={form}
      modalProps={{
        destroyOnClose: true,
        closable: false
      }}
      submitter={{
        searchConfig: {
          submitText: '提交审批',
          resetText: '取消',
        },
      }}
      
    >
      <ProForm.Group>
        <ProFormText
          label='公式名称'
          name='name'
          width='sm'
          rules={[
            {
              required: true,
              message: '请输入公式名称'
            }
          ]}
        />
        <ProFormSelect
          label='业务模式'
          name='tradeModeId'
          width='sm'
          options={list}
          allowClear={false}
          proFieldProps={{
            onChange: (e)=>{
              setTradeMode(e)
            }
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label='变量选择'
          width='sm'
          name='set'
          allowClear={false}
          fieldProps={{
            onChange:(e)=>{
              const data = form?.getFieldsValue().express
              if(data) {
                const arr = data.split('')
                arr.splice(client, 0, e)
                const str = arr.join('')
                form.setFieldsValue({
                  express: str
                })
              } else {
                form.setFieldsValue({
                  express: e
                })
              }
            },
            onBlur: ()=> {
              form.setFieldsValue({
                set: undefined
              })
            }
          }}
          options={selectData}
        />
        {
          data&&
          <ProFormSelect
            label='公式状态'
            name='status'
            width='sm'
            rules={[
              {
                required: true,
                message: '请选择公式状态'
              }
            ]}
            options={[
              {
                value: 1,
                label: '启用'
              },
              {
                value: -1,
                label: '禁用'
              }
            ]}
          />
        }
      </ProForm.Group>
      <ProFormTextArea
        label='公式脚本'
        name='express'
        placeholder='请输入公式脚本'
        rules={[
          {
            required: true,
            message: '请输入公式脚本'
          }
        ]}
        fieldProps={{
          refs: areaInput,
          onBlur: ()=>{
            setClient(areaInput?.current?.resizableTextArea?.textArea?.selectionEnd)
          }
        }}
      />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button 
          type='primary'
          onClick={()=>{
            checkFormula()
          }}
        >
          校验公式
        </Button>
        {
          flag&&
          (
            success?
            <div>
              <Tag icon={<CheckCircleOutlined />} color="success">通过</Tag>
            </div>:
            <div>
              <Tag icon={<CloseCircleOutlined  />} color="error">失败</Tag>
            </div>
          )
        }
      </div>
    </ModalForm>
  )
}

export default AddDetail