import request from '@/utils/request'

// 公式分页列表
export const formula = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/formula/page',
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

// 新增公式
export const formulaAdd = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/formula/add',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 修改公式
export const formulaUpdate = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/formula/update',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}

// 费用列表（包含系统默认费用）
export const feeItemAll = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/all',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
} 
