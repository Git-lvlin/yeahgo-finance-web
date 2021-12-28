import request from '@/utils/request'

// 费用分页列表
export const feeItemPage = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/page',
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

// 费用详细
export const feeItemId = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/id',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 新增费用
export const feeItemAdd = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/add',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 修改费用
export const feeItemUpdate = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/update',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 业务模式费用
export const feeItemTradeMode = async (params = {}, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/tradeMode',
      page: pageSize,
      size: current,
      ...rest
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}