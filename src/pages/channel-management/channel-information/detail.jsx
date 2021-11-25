import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProForm, {
  ProFormText, 
  ProFormRadio, 
  ProFormSelect,
  ProFormDatePicker,
  ProFormDateRangePicker
} from '@ant-design/pro-form'
import { Typography, Divider, message } from 'antd'

const { Title, Paragraph, Text } = Typography

const Detail = () => {
  return (
    <PageContainer title={false}>
      <ProForm
        onFinish={async (values) => {
          console.log(values);
          message.success('提交成功');
        }}
      >
        <Paragraph>
          <Title level={3}>基础信息</Title>
          <Divider/>
          <ProFormText
            width="md"
            name="no"
            label="渠道编号"
            placeholder="请输入渠道编号"
          />
          <ProFormText
            width="md"
            name="name"
            label="渠道名称"
            placeholder="请输入渠道名称"
          />
          <ProFormSelect
            options={[
              {
                value: 'db',
                label: '汇丰单笔支付',
              },
              {
                value: 'zz',
                label: '汇丰转账支付',
              }
            ]}
            width="md"
            name="useMode"
            label="交易类型"
          />
          <ProFormSelect
            options={[
              {
                value: 'db',
                label: '汇丰',
              },
              {
                value: 'zz',
                label: '通联',
              }
            ]}
            width="md"
            name="api"
            label="接口"
          />
          <ProFormRadio.Group
            name="radio"
            label="状态"
            options={[
              {
                label: '启用',
                value: 'a',
              },
              {
                label: '禁用',
                value: 'b',
              }
            ]}
          />
          <ProFormDatePicker
            name="time"
            width="md"
            label="创建时间"
          />
        </Paragraph>
        <Paragraph>
          <Title level={3}>限制信息</Title>
          <Divider/>
          <ProFormRadio.Group
            name="ues"
            label="节假日是否启用"
            options={[
              {
                label: '是',
                value: 'a',
              },
              {
                label: '否',
                value: 'b',
              }
            ]}
          />
          <ProFormDateRangePicker
            name="workTime"
            label="工作时间"
            width="md"
          />
          
        </Paragraph>
      </ProForm>
    </PageContainer>
  )
}

export default Detail
