import request from '@/utils/request'

// 账户管理-分页
export const accountPage = async (params, options = {}) => {
  const { settleTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/account/page',
      settleTimeBegin: settleTime?.[0],
      settleTimeEnd: settleTime?.[1],
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success,
    total: res?.data?.total
  }
}

// 账户管理-详情
export const accountDetail = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/account/detail',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 账户管理-修改状态
export const updateStatus = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/account/updateStatus',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 账户管理-流水分页
export const accountLogPage = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/account/logPage',
      page: current,
      size: pageSize,
      ...rest
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success,
    total: res?.data?.total
  }
}
