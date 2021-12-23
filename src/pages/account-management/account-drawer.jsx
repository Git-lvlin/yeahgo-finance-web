import React from 'react'
import { Drawer } from 'antd'
import ProCard from '@ant-design/pro-card'

import AccountInformation from './account-information'
import HuifuInformation from './huifu-information'
import XinbaoInformation from './xinbao-information'
import MarginManagement from './margin-management'

const AccountDrawer = ({
  visible,
  setVisible,
  data,
  loading
}) => {
  return (
    <Drawer
      title='账户详情'
      visible={visible}
      width={1200}
      onClose={()=> setVisible(false)}
      destroyOnClose={true}
    >
       <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="总账户信息">
          <AccountInformation dataSource={data} loading={loading}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="汇付子账户信息">
          <HuifuInformation 
            dataSource={data?.huifuAccount} 
            loading={loading}
            sn={data?.sn}
          />
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="薪宝子账户信息">
          <XinbaoInformation
            dataSource={data?.xinbaoAccount}
            loading={loading}
            sn={data?.sn}
          />
        </ProCard.TabPane>
        <ProCard.TabPane key="4" tab="保证金管理">
          <MarginManagement
            dataSource={data?.depositLogs}
            loading={loading}
            deposit={data?.deposit}
          />
        </ProCard.TabPane>
      </ProCard>
    </Drawer>
  )
}

export default AccountDrawer
