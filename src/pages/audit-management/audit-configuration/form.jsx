import React, { useRef, useEffect, useState } from 'react';
import { message, Form,Space,Button,Modal,Steps,Tag} from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import styles from './style.less'
import { getFlowMain,updateFlowMain } from '@/services/audit-management/audit-configuration'
import AssessingOfficer from './assessing-model'
import * as api from '@/services/setting/account-management';
const { Step } = Steps;
import _ from 'lodash'





const formItemLayout = {
  labelCol: { span: 1 },
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
  const { detailData, setVisible, onClose, visible,callback } = props;
  const formRef = useRef();
  const [auditMsg,setAuditMsg]=useState()
  const [auditVisible,setAuditVisible]=useState()
  const [adminName,setAdminName]=useState()
  const [auditData, setAuditData] = useState(false)
  const [userLevel,setUserLevel]=useState([])
  const [form] = Form.useForm()
  const [createName,setCreateName]=useState()

  const onsubmit = (values) => {
    if(userLevel.length<0){
      message.error('审批人不能为空/表单项不能为空')
    }
    const params={
      id:detailData?.id,
      flowActionList:userLevel
    }
    updateFlowMain(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback(true)
      }
    })
  };

  useEffect(() => {
    if (detailData?.id) {
      getFlowMain({id:detailData?.id}).then(res=>{
        setAuditMsg(res.data?.flowActionList)
        form.setFieldsValue({
          ...res.data
        })
      })
      api.adminList({}).then(res=>{
        const obj={}
        const nameobj={}
        res.data.map(ele=>{
          obj[ele.id]=ele.nickname
          nameobj[ele.id]=ele.createName
        })
        setAdminName(obj)
        setCreateName(nameobj)
      })
    }



  }, [form, detailData])

  const assessingData=(data)=>{
    // console.log('data',data)
    //状态回显
    const auditorId=data.userLevel.map(ele=>(
      {
        auditorId:`${ele}`,
        auditorRoles:createName[ele],
        type:1,
        auditMemo:null,
        status:null
      }
    ))
    const arr2 = JSON.parse(JSON.stringify(auditMsg));
    const knowledge=arr2.map(ele=>{
      if(ele.actionType==2&&ele.id==data.id){
        return {...ele,auditors:_.uniqWith([...ele.auditors,...auditorId], _.isEqual),autoExecute:data.autoExecute}
      }
      return ele
    })
    setAuditMsg(knowledge)


    //添加
    const brr=knowledge?.map(ele=>{
      if(ele.actionType==2&&ele.id==data.id){
        return [...ele.auditors]
      }
    })
    const arr=[]
    arr.push({
      id:data?.id,
      autoExecute:data?.autoExecute,
      auditors:brr.filter(ele=>{
          return ele!=undefined
      })[0]
    })
    setUserLevel([...userLevel,...arr])
  }

  return (
    <DrawerForm
      title='审批配置'
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
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
                <Button type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确认
                </Button>
            ];
          }
        }
      }
      onFinish={async (values) => {
        await onsubmit(values);
        // 不返回不会关闭弹框
        // return true;
      }}
      {...formItemLayout}
    >
      <div className={styles.member}>
        {
          auditMsg&&auditMsg.map(ele=>{
            if(ele.actionType==2){
              return <div className={styles.members}>
                        <p>{ele.name} <span className={styles.countersign}>{{0:'或签',1:'会签'}[ele.autoExecute]}</span></p>
                        <div className={styles.memberMsg}>
                        <ProFormText 
                          width="md"
                          label="请选择审批人"
                          readonly={true}
                          labelCol={4}
                          fieldProps={{
                            value:ele.auditors.map(item=>{
                                return <Tag closable onClose={()=>{}}>{adminName&&adminName[item?.auditorId]}</Tag>
                              })
                          }}
                          name="audit"
                          // rules={[{ required: true, message: '审批人不能为空/表单项不能为空' }]}
                          addonAfter={<a onClick={()=>{setAuditData(ele);setAuditVisible(true)}}>添加</a>}
                        />
                        </div>
                      </div>
            }
          })
        }
        
      </div>
        <p>说明：</p>
        <p>退回方式：审批拒绝时，直接退回至提交人</p>
        <p>退回后再提交：重新逐级审批</p>
        <p>点击保存时，校验必填项，toast提示：审批人不能为空/表单项不能为空</p>
        
        {auditVisible&& <AssessingOfficer
        visible={auditVisible}
        setVisible={setAuditVisible}
        detailData={auditData}
        callback={(val) => assessingData(val)}
        />}
    </DrawerForm>
  );
};