import request from '@/utils/request'

// 公式分页列表
export const formula = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/fmis/formula/page', {
    method: 'POST',
    data: {
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
  const res = await request('/fmis/formula/add', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 修改公式
export const formulaUpdate = async (params, options = {}) => {
  const res = await request('/fmis/formula/update', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 费用列表（包含系统默认费用）
export const feeItemAll = async (params, options = {}) => {
  const res = await request('/fmis/feeItem/all', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
} 
