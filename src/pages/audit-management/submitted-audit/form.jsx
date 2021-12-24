import React, { useRef, useEffect, useState } from 'react';
import { message, Form,Space,Button,Modal,Steps,Col,Row} from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { history } from 'umi';
import styles from './style.less'
import { getInstance,process } from '@/services/audit-management/commission-audit'
import moment from 'moment'
import ProTable from '@ant-design/pro-table';
import * as api from '@/services/setting/account-management';
const { Step } = Steps;





const formItemLayout = {
  labelCol: { span: 2 },
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





export default (props) => {
  const { detailData, setVisible, onClose, visible} = props;
  const formRef = useRef();
  const [auditMsg,setAuditMsg]=useState()
  const [adminName,setAdminName]=useState()
  const [form] = Form.useForm()

  useEffect(() => {
    if (detailData?.id) {
      getInstance({id:detailData?.id}).then(res=>{
        setAuditMsg(res.data?.actionLogs)
        form.setFieldsValue({
          ...res.data
        })
      })

      api.adminList({}).then(res=>{
        const obj={}
        res.data.map(ele=>{
          obj[ele.id]=ele.nickname
        })
        setAdminName(obj)
      })
      
      
    }

  }, [form, detailData])


  return (
    <DrawerForm
      title='审批详情'
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      width={1500}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      className={styles.audit_detail}
      submitter={{
        render: (props, defaultDoms) => {
            return [];
        },
        }}
      {...formItemLayout}
    >
      <h3 className={styles.head}>申请信息</h3>
        <ProFormText 
          width="md"
          name="id"
          label="审批编号"
          readonly={true}
        />
         <ProFormText 
          width="md"
          name="submitTime"
          label="提交时间"
          readonly={true}
        />
         <ProFormText 
          width="md"
          name="submitorName"
          label="提交人"
          readonly={true}
        />
         <ProFormText 
          width="md"
          name="name"
          label="审批事项"
          readonly={true}
        />
      <h3 className={styles.head}>审批信息</h3>
      <Row gutter={24} style={{marginLeft:'40px'}}>
      {
        auditMsg&&auditMsg[0][0].form?.formFields.map(ele=>{
            return <Col span={12} key={ele.name}>
                      {
                        ele?.compType==='input'&&
                        <ProFormText 
                          width="md"
                          name={ele.name}
                          label={ele.label}
                          readonly={true}
                          labelCol={3}
                          fieldProps={{
                            value:ele.value,
                          }}
                      />
                      }
                  </Col>
        })
      }
       </Row> 
      {
        auditMsg&&auditMsg[0][0].form?.formFields.map(ele=>{
            return <div key={ele.name}>
                    {
                        ele?.compType==='table'&&
                        <ProTable
                          rowKey="orderType"
                          columns={JSON.parse(ele.value).header}
                          options={false}
                          bordered
                          search={false}
                          dataSource={JSON.parse(ele.value).data}
                        />
                    }
                </div>
        })
      }
      <h3 className={styles.head}>节点信息</h3>
      <Steps style={{paddingLeft:'100px'}} current={1} direction="vertical">
        <Step 
          title="发起人 • 已提交" 
          description={<p>{adminName&&adminName[auditMsg&&auditMsg[0][0]?.submitUserId]}<span style={{marginLeft:'50px'}}>已提交 • </span><span>{moment(auditMsg&&auditMsg[0][0]?.approvalTime).format('YYYY-MM-DD HH:mm:ss')}</span></p>} 
        />
        {
          auditMsg&&auditMsg?.map((ele,index)=>{
            if(index>0){
              return <div key={index}>
              {
                ele.map(item=>{
                 return <Step 
                         key={item?.submitUserId}
                         title={"审批人 • "+{ 1: '已同意', '-1': '已驳回' }[item.status]} 
                         description={<p>{adminName&&adminName[item?.submitUserId]}<span style={{marginLeft:'50px'}}>{{ 1: '已同意', '-1': '已驳回' }[item.auditFlag]} </span> • {moment(item?.approvalTime).format('YYYY-MM-DD HH:mm:ss')}</p>} 
                       />
               })
              }
             </div>
            }
          })
        }
      </Steps>
    </DrawerForm>
  );
};