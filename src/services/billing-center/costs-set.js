import request from '@/utils/request'

// 费用分页列表
export const feeItemPage = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/fmis/feeItem/page', {
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

// 新增费用
export const feeItemAdd = async (params = {}, options = {}) => {
  const res = await request('/fmis/feeItem/add', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 修改费用
export const feeItemUpdate = async (params = {}, options = {}) => {
  const res = await request('/fmis/feeItem/update', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}
