import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProForm, {
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormDateRangePicker
} from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { Button } from 'antd'

const FormSubmit = ({ data }) => {
  console.log(data);
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <div style={{ textAlign: 'center' }}>
      {
        isSubmit ?
          <Button
            onClick={() => {
              setIsSubmit(false)
            }}
          >
            修改
        </Button> :
          <Button
            type="primary"
            onClick={() => {
              setIsSubmit(true)
            }}
          >
            提交审批
        </Button>
      }
    </div>
  )
}

const CostManagement = () => {
  return (
    <PageContainer title={false}>
      <ProForm
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        layout='horizontal'
        submitter={false}
      >
        <ProFormList
          name='table'
          copyIconProps={false}
          deleteIconProps={{
            tooltipText: '删除此表单'
          }}
          creatorButtonProps={{
            creatorButtonText: '添加费用',
            position: 'top',
            type: 'link'
          }}
          initialValue={[
            {labels: ''}
          ]}
          itemRender={({ listDom, action }) => {
            return (
              <ProCard
                bordered
                extra={action}
                style={{
                  marginBottom: 8,
                }}
              >
                {listDom}
              </ProCard>
            )
          }}
        >
          <ProForm
            layout='horizontal'
            submitter={{
              render: (_) => <FormSubmit data={_} />
            }}
            onFinish={
              (v) => { console.log(v) }
            }
          >
            <ProFormList
              name="labels"
              copyIconProps={false}
              deleteIconProps={false}
              creatorButtonProps={false}
            initialValue={[
              {value: '1', label: '1',id:1},
            ]}
            >
              <ProFormGroup>
                <ProFormText
                  name="value"
                  label="费用名称"
                  width="md"
                />
                <ProFormText
                  name="label"
                  label="费用科目编号"
                  width="md"
                />
              </ProFormGroup>
              <ProFormGroup>
                <ProFormSelect
                  name="feeState"
                  label="费用状态"
                  width="md"
                  options={[
                    { label: '启用', value: 1 },
                    { label: '停用', value: 2 },
                    { label: '审批中', value: 3 },
                  ]}
                />
                <ProFormText
                  name="label"
                  label="创建人"
                  width="md"
                />
              </ProFormGroup>
              <ProFormGroup>
                <ProFormDateRangePicker
                  name={['startTime', 'endTime']}
                  label="创建时间"
                  width="md"
                />
                <ProFormText
                  name="label"
                  label="付款方"
                  width="md"
                />
              </ProFormGroup>
              <ProFormGroup>
                <ProFormSelect
                  name="payee"
                  label="收款方"
                  width="md"
                  options={[
                    { label: '商户', value: 1 },
                    { label: '平台', value: 2 },
                    { label: '运营中心', value: 3 }
                  ]}
                />
                <ProFormText
                  name="label"
                  label="计提公式"
                  width="md"
                />
                <ProFormText
                  name="id"
                  label="付款方"
                  width="md"
                  hidden
                />
              </ProFormGroup>
              <ProFormGroup>
                <ProFormSelect
                  name="level"
                  width="md"
                  label="商户星级"
                  options={[
                    { label: '不限', value: 1 },
                    { label: '>=1级', value: 2 },
                    { label: '>=2级', value: 3 },
                    { label: '>=3级', value: 4 },
                    { label: '>=4级', value: 5 },
                    { label: '>=5级', value: 6 },
                  ]}
                />
              </ProFormGroup>
            </ProFormList>
          </ProForm>
        </ProFormList>
      </ProForm>
    </PageContainer>
  )
}

export default CostManagement
