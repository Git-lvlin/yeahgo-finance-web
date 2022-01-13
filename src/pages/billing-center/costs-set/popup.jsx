import React, {
  useState,
  useEffect
} from 'react'
import {
  Form,
  Typography,
  Divider,
  Tooltip,
  Spin,
  Modal,
  Radio,
  Space,
  Select,
  Input
} from 'antd'
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormSelect,
  ProFormCheckbox
} from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { EditableProTable } from '@ant-design/pro-table'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import styles from './style.less'
import {
  roleList,
  formulaList,
  ruleCondList
} from '@/services/common'
import { feeItemAdd, feeItemUpdate } from '@/services/billing-center/costs-set'
import FormWarp from './form-wrap'

const { Title, Paragraph } = Typography
const { Option } = Select

const MSelect = ({
  handleChange,
  state
}) => {
  return (
    <Select 
      style={{ width: 120 }}
      onChange={(e)=> handleChange(e, state)}
      defaultValue={1}
    >
      <Option value={1}>1</Option>
      <Option value={2}>2</Option>
      <Option value={3}>3</Option>
      <Option value={4}>4</Option>
      <Option value={5}>5</Option>
      <Option value={6}>6</Option>
      <Option value={7}>7</Option>
    </Select>
  )
}

const OrderSelect = ({
  handleChange,
  state
}) => {
  return (
    <Select 
      style={{ width: 120 }}
      onChange={(e)=> handleChange(e, state)}
      defaultValue={0}
    >
      <Option value={0}>0</Option>
      <Option value={1}>1</Option>
      <Option value={2}>2</Option>
      <Option value={3}>3</Option>
      <Option value={4}>4</Option>
      <Option value={5}>5</Option>
      <Option value={6}>6</Option>
      <Option value={7}>7</Option>
    </Select>
  )
}

const DaySelect = ({
  handleChange
}) => {
  return (
    <Select 
      style={{ width: 70 }}
      onChange={(e)=> handleChange(e)}
      defaultValue={1}
    >
      <Option value={1}>1号</Option>
      <Option value={2}>2号</Option>
      <Option value={3}>3号</Option>
      <Option value={4}>4号</Option>
      <Option value={5}>5号</Option>
      <Option value={6}>6号</Option>
      <Option value={7}>7号</Option>
      <Option value={8}>8号</Option>
      <Option value={9}>9号</Option>
      <Option value={10}>10号</Option>
      <Option value={11}>11号</Option>
      <Option value={12}>12号</Option>
      <Option value={13}>13号</Option>
      <Option value={14}>14号</Option>
      <Option value={15}>15号</Option>
      <Option value={16}>16号</Option>
      <Option value={17}>17号</Option>
      <Option value={18}>18号</Option>
      <Option value={19}>19号</Option>
      <Option value={20}>20号</Option>
      <Option value={21}>21号</Option>
      <Option value={22}>22号</Option>
      <Option value={23}>23号</Option>
      <Option value={24}>24号</Option>
      <Option value={25}>25号</Option>
      <Option value={26}>26号</Option>
      <Option value={27}>27号</Option>
      <Option value={28}>28号</Option>
    </Select>
  )
}

const Popup = ({ 
  show,
  setShow,
  actionRef,
  dataSource,
  isEdit,
  setData,
  tradeModeId,
  loading,
  id, 
  type
}) => {
  const [flag, setFlag] = useState(true)
  const [symbol, setSymbol] = useState({})
  const [ruleCond, setRuleCond] = useState([])
  const [editableKeys, setEditableRowKeys] = useState()
  const [role, setRole] = useState([])
  const [clear, setClear] = useState(1)
  const [optionValueObj, setOptionValueObj] = useState({})
  const [radioValue, setRadioValue] = useState(1)
  const [selectData, setSelectData] = useState([])
  const [formula, setFormula] = useState([])
  const [formulaExpress, setFormulaExpress] = useState([])
  const [formulaId, setFormulaId] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [obj, setObj] = useState({})
  const [selectObj, setSelectObj] = useState({})
  const [rulesList, setRulesList] = useState([])

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      tradeModeId
    })
  }, [])

  useEffect(() => {
    roleList({
      tradeModeId
    }).then(res => {
      setRole(res?.data?.map(item => (
        { label: item.name, value: item.id }
      )))
    })
    return () => {
      setRole([])
    }
  }, [tradeModeId])

  useEffect(() => {
    formulaList({
      tradeModeId
    }).then(res => {
      setFormulaExpress(res.data)
      setFormula(res?.data?.map(item => (
        { label: item.name, value: item.id }
      )))
    })
    return () => {
      setFormula([])
      setFormulaExpress([])
    }
  }, [tradeModeId])

  useEffect(() => {
    ruleCondList({
      tradeModeId: id
    }).then(res => {
      setSelectData(res.data)
      setRuleCond(res.data?.map(item => (
        {label: item.name, value: item.code}
      )))
    })
  }, [])

  useEffect(()=>{
    if(dataSource){
      if(dataSource.isAgentRecv) {
        setFlag(false)
      }
      form.setFieldsValue({
        name: dataSource?.name,
        orderIndex: dataSource?.orderIndex,
        status: dataSource?.status,
        recvRoleId: dataSource?.recvRoleId,
        payRoleId: dataSource?.payRoleId,
        serviceChargeRoleId: dataSource?.serviceChargeRoleId,
        agentRecvRoleId: dataSource?.agentRecvRoleId,
        isAgentRecv: dataSource?.isAgentRecv,
        clearingType: dataSource?.clearingRuleDesc,
        roundType: dataSource?.roundType
      })
      setRulesList(dataSource.rules.map(item=>{
        item?.conds?.forEach(res=> {
          selectObj[res.id] = {name: res.configRuleCondName, id: res.configRuleCondId}
        })
        setSelectObj(selectObj)
        return ({
          formText: {
            ruleName: item.name, 
            formulaId: item.formulaId,
            formulaExpress: item.formulaExpress
          },
          table: item?.conds
        })
      }))
    } else if(!isEdit){
      setRulesList([
        {formText: {}, table: []}
      ])
    }
  }, [dataSource])

  const formTransform = (rulesList) => {
    if (!Array.isArray(rulesList)) {
      return {}
    }
    let formulaName = []
    const rules = []
    rulesList?.forEach(item => {
      const conds = []
      formulaName = formula?.filter(res => item.formText?.formulaId === res.value)
      item.table?.forEach(data =>{
        conds.push({
          id: data.id,
          configRuleCondName: selectObj?.[data.id].name, 
          configRuleCondId: selectObj?.[data.id].id,
          matchKey: data.matchKey,
          symbol: data.symbol,
          value: data.value,
          maxValue: data.maxValue
        })
      })
      rules?.push({
        name: item?.formText?.ruleName,
        formulaId: item.formText?.formulaId,
        formulaName: formulaName?.[0]?.label,
        conds
      })
    })
    return rules
  }

  const onChange = (e) => {
    setRadioValue(e.target.value)
    if(e.target.value === 4 || e.target.value === 5) {
      setClear('0')
    }
  }

  const handleChange = (e, state) => {
    const clearType = JSON.parse(JSON.stringify(obj))
    clearType[state] = e
    setObj(clearType)
    setClear(e)
  }

  const changeDay = (e) => {
    setClear(e)
  }

  const handleOk = () => {
    const formObj = {
      '1': '实时',
      '2': 'T+' + (obj[radioValue] || '1'),
      '3': 'D+' + (obj[radioValue] || '1'),
      '4': '确认收货+' + (obj[radioValue] || '0'),
      '5': '确认售后+' + (obj[radioValue] || '0'),
      '6': '每月' + clear + '号结算上一自然月'
    }
    form.setFieldsValue({
      clearingType: formObj[radioValue]
    })
    setShowModal(false)
  }

  const cancel = () => {
    setShowModal(false)
  }

  const submit = (rules, e) => {
    if(!isEdit) {
      return new Promise((resolve, reject)=>{
        feeItemAdd({
          ...e, 
          clearingPeriodInterval: clear,
          clearingType: radioValue,
          clearingPeriod: 5,
          status: 1,
          rules,
          type
        },
        { 
          showSuccess: true,
          showError: true,
          noFilterParams: true,
          paramsUndefinedToEmpty: true
        }).then(res=>{
          if(res.success) {
            actionRef.current.reload()
            resolve()
          } else {
            reject()
          }
        })
      })
    } else {
      return new Promise((resolve, reject)=>{
        feeItemUpdate({
          id: dataSource?.id,
          ...e, 
          clearingPeriodInterval: clear,
          clearingType: radioValue,
          clearingPeriod: 5,
          rules
        },
        {
          showSuccess: true,
          showError: true,
          noFilterParams: true,
          paramsUndefinedToEmpty: true
        }).then(res=> {
          if(res.success) {
            actionRef.current.reload()
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }

  const columns = [
    {
      title: '条件',
      dataIndex: 'matchKey',
      valueType: 'select',
      fieldProps:(e, records)=> {
        return {
          allowClear: false,
          onChange: (e, r)=>{
            const arr = selectData?.find(item=>(item.name === r?.label))
            selectObj[records.rowKey] = arr
            setSelectObj(selectObj)
            if(arr?.assignType === 2) {
              optionValueObj[records.rowKey] = {data: arr?.optionValueList, status: true}
              setOptionValueObj(optionValueObj)
            } else {
              optionValueObj[records.rowKey] = {data: null, status: false}
              setOptionValueObj(optionValueObj)
            }
          },
          options: ruleCond
        }
      },
      align: 'center'
    },
    {
      title: '比较符',
      dataIndex: 'symbol',
      valueType: 'select',
      valueEnum: {
        'between': '范围',
        '>': '>',
        '<': '<',
        '>=': '>=',
        '<=': '<=',
        '==': '=='
      },
      fieldProps: (e, r)=> {
        return {
          onChange: (e) => {
            if(e === 'between') {
              symbol[r?.entity?.id] = false
              setSymbol(symbol)
            } else {
              symbol[r?.entity?.id] = true
              setSymbol(symbol)
            }
          }
        }
      },
      align: 'center'
    },
    {
      title: '值1',
      dataIndex: 'value',
      width: '20%',
      align: 'center',
      renderFormItem: (_, r) => {
        if(optionValueObj[r?.recordKey]?.status) {
          return (
            <Select
              options={optionValueObj[r?.recordKey]?.data}
              allowClear
              placeholder="请选择"
            />
          )
        } else {
          return (
            <Input
              placeholder="请输入"
              allowClear
              value={_}
            />
          )
        }
      },
      render: (_, r) =>{
        const obj = optionValueObj[r?.id]?.data?.find(item=> item.value === _)
        if(optionValueObj[r?.id]?.status) {
          return obj?.['label']
        }
        return _
      }
    },
    {
      title: '值2',
      dataIndex: 'maxValue',
      width: '20%',
      align: 'center',
      renderFormItem: (_, r) => {
        if(optionValueObj[r?.recordKey]?.status) {
          return (
            <Select
              options={optionValueObj[r?.recordKey]?.data}
              placeholder="请选择"
              allowClear
              disabled={symbol[r.recordKey]}
            />
          )
        } else {
          return (
            <Input
              placeholder="请输入"
              allowClear
              disabled={symbol[r.recordKey]}
            />
          )
        }
      },
      render: (_, r) =>{
        const obj = optionValueObj[r?.id]?.data?.find(item=> item.value === _)
        if(optionValueObj[r?.id]?.status) {
          return obj?.['label']
        }
        return _
      }
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
        const rules = formTransform(rulesList)
        await submit(rules, e)
        return true
      }}
      layout='horizontal'
      form={form}
      drawerProps={{
        destroyOnClose: true,
        closable: false,
        onClose: ()=>{
          setData(null)
        }
      }}
      width={900}
      submitter={{
        searchConfig: {
          submitText: '保存',
          resetText: '取消',
        },
      }}
    >
      <Spin spinning={loading}>
        <Typography>
          <Title level={4}>基本信息</Title>
          <Divider />
          <Paragraph>
            <ProFormSelect
              label='业务模式'
              name='tradeModeId'
              value={tradeModeId}
              hidden={true}
            />
            <Space size={170}>
              <ProFormText
                label='费用名称'
                name='name'
                width='sm'
                readonly={isEdit}
                rules={[{ required: true, message: '请输入费用名称'}]}
              />
              <ProFormText
                label='计算优先级'
                name='orderIndex'
                width='sm'
                rules={[{ required: true, message: '请输入计算优先级'}]}
              />
            </Space>
            <Space size={205}>
              <ProFormSelect
                label='费用状态'
                name='status'
                width='sm'
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
              {
                type===2&&
                <ProFormSelect
                  label='取整规则'
                  name='roundType'
                  width='sm'
                  options={[
                    {
                      label: '向下取整（如：0.119取0.11）',
                      value: 1
                    },
                    {
                      label: '四舍五入.156取0.16）',
                      value: 2
                    },
                    {
                      label: '向上取整（如：0.111取0.12）',
                      value: 3
                    }
                  ]}
                />
              }
            </Space>
            {
              type === 1&&
              <Space size={210}>
                <ProFormSelect
                  label='付款方'
                  name='payRoleId'
                  width='sm'
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 18 }}
                  options={role}
                />
                <ProFormSelect
                  label='收款方'
                  name='recvRoleId'
                  width='sm'
                  options={role}
                />
              </Space>
            }
            {
              type === 1&&
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
                  fieldProps={{
                    onChange:(e) => {
                      if (e.target.checked) {
                        setFlag(false)
                      } else {
                        setFlag(true)
                      }
                    }
                  }}
                >
                  是否代收
                </ProFormCheckbox>
                <ProFormSelect
                  label='通道费承担方'
                  name='serviceChargeRoleId'
                  width='sm'
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 13 }}
                  options={role}
                />
              </ProForm.Group>
            }
            {
              type === 1&&
              <Space size={185}>
                <ProFormText
                  label='结算周期'
                  name='clearingType'
                  width='sm'
                  fieldProps={{
                    onClick: ()=> setShowModal(true)
                  }}
                />
                <ProFormSelect
                  label='取整规则'
                  name='roundType'
                  width='sm'
                  options={[
                    {
                      label: '向下取整（如：0.119取0.11）',
                      value: 1
                    },
                    {
                      label: '四舍五入.156取0.16）',
                      value: 2
                    },
                    {
                      label: '向上取整（如：0.111取0.12）',
                      value: 3
                    }
                  ]}
                />
              </Space>
            }
          </Paragraph>
        </Typography>
        <Typography>
          <Title level={4}>费用规则</Title>
          <Divider />
          <a
            className={styles.addRules}
            onClick={() => {
              const arr = JSON.parse(JSON.stringify(rulesList))
              arr.push({})
              setRulesList(arr)
            }}
          >
            <PlusOutlined/>
            添加计费规则
          </a>
          {
            rulesList?.[0] &&
            rulesList?.map((item, index) => (
              <ProCard
                bordered
                key={index}
                className={styles.rulesCard}
              >
                <span
                  className={styles.delRules}
                  onClick={()=>{
                    const arr = JSON.parse(JSON.stringify(rulesList))
                    arr.splice(index, 1)
                    setRulesList(arr)
                  }}
                >
                  <Tooltip title='删除该规则'>
                    <DeleteOutlined />
                  </Tooltip>
                </span>
                <ProForm
                  initialValues={item.formText}
                  layout='horizontal'
                  onValuesChange={(e, r) => { 
                    const data = JSON.parse(JSON.stringify(rulesList))
                    data[index].formText = r
                    setRulesList(data)
                  }}
                  submitter={false}
                >
                  <ProForm.Group>
                    <ProFormText
                      label='规则名称'
                      name='ruleName'
                      width='sm'
                    />
                    <ProFormSelect
                      label='计提公式'
                      name='formulaId'
                      width='sm'
                      options={formula}
                      fieldProps={{
                        onChange: (e)=> {
                          formulaId[index] = e
                          setFormulaId(formulaId)
                        }}
                      }
                    />
                  </ProForm.Group>
                  <ProFormText
                    name='formulaExpress'
                    readonly
                    label='公式内容'
                    fieldProps={{
                      value: formulaExpress?.find(item=> item.id === formulaId[index])?.express
                    }}
                  />
                </ProForm>
                <EditableProTable
                  rowKey="id"
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加条件',
                    record: () => ({ id: Date.now() }),
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
                  value={item.table}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onChange: setEditableRowKeys,
                    onValuesChange: (e, r) => {
                      const data = JSON.parse(JSON.stringify(rulesList))
                      data[index].table = r
                      setRulesList(data)
                    }
                  }}
                />
              </ProCard>
            ))
          }
        </Typography>
      </Spin>
      {
        showModal&&
        <Modal
          visible={showModal}
          onOk={handleOk}
          onCancel={cancel}
        >
          <Radio.Group 
            onChange={onChange}
            value={radioValue}
          >
            <Space direction="vertical">
              <Radio value={1}>实时</Radio>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Radio value={2}>
                  T+
                </Radio>
                <MSelect
                  handleChange={handleChange}
                  state={2}
                  initValue={1}
                />
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Radio value={3}>
                  D+
                </Radio>
                <MSelect 
                  handleChange={handleChange}
                  state={3}
                  initValue={1}
                />
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Radio value={4}>
                  确认收货+
                </Radio>
                <OrderSelect
                  handleChange={handleChange}
                  state={4}
                />
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Radio value={5}>
                  确认售后+
                </Radio>
                <OrderSelect
                  handleChange={handleChange}
                  state={5}
                />
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Radio value={6}>
                  每月
                </Radio>
                <FormWarp
                  content={()=>(
                    <DaySelect handleChange={changeDay}/>
                  )}
                  right={()=>(
                    <div>结算上一自然月（已过售后的）</div>
                  )}
                />
              </div>
            </Space>
          </Radio.Group>
        </Modal>
      }
    </DrawerForm>
  )
}

export default Popup
