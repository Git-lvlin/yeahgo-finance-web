import React, { useState,useEffect } from 'react';
import { ModalForm,ProFormCheckbox,ProFormRadio,ProFormText} from '@ant-design/pro-form';
import { Button,message,Input,Form } from 'antd';
import styles from './style.less'
import * as api from '@/services/setting/account-management';
const { Search } = Input;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };


export default props=>{
    const {visible, setVisible,callback,detailData}=props
    const [adminName,setAdminName]=useState()
    const [searchName,setSearchName]=useState()
    const [form] = Form.useForm();
    useEffect(() => {
      form.setFieldsValue({
        id:detailData?.id
      })
      api.adminList({nickname:searchName}).then(res=>{
        const arr=[]
        res.data.map(ele=>{
          arr.push({label:ele.nickname,value:ele.id})
        })
        setAdminName(arr)
      })
  }, [searchName])
  const onsubmit = (values) => {
    callback(values)
    setVisible(false)

  };
    return (
        <ModalForm
            title={<p>请选择审批人员<span style={{color:'#666',fontSize:'10px'}}>（自动获取组织架构中的人员名单）</span></p>}
            key='assessing'
            onVisibleChange={setVisible}
            visible={visible}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            form={form}
            onFinish={async (values) => {
              await onsubmit(values);
            }}
            {...formItemLayout}
        >
        <Search placeholder="输入名称搜索" onSearch={(val)=>{setSearchName(val)}} style={{ width: 200 }} />
        <div style={{border:'1px solid #000',padding:'10px',margin:'10px 0'}}>
            <ProFormCheckbox.Group      
              name="userLevel"
              layout='vertical'
              options={adminName}
              />
            {/* <p>排序按名称首字母，A-Z</p> */}
        </div>
        <ProFormRadio.Group
          name="autoExecute"
          label="审批规则"
          rules={[{ required: true, message: '审批规则必选' }]}
          options={[
            {
              label: '会签（同一层级必须所有人审批通过才能跳转到下一节点）',
              value: 1,
            },
            {
              label: '或签(1人审批通过后自动跳到下一审批节点)',
              value: 0,
            },
          ]}
        />
        <ProFormText
          name="id"
          hidden
        />
    </ModalForm>
    )
}
