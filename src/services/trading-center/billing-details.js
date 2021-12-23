import request from '@/utils/request'

// 结算明细-分页
export const settlePage = async (params, options = {}) => {
  const {  pageSize, current, ...rest } = params
  const res = await request('/fmis/settle/page', {
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
    success: res.success,
    total: res?.data?.total
  }
}

// 结算明细-详情
export const settleDetail = async (params, options = {}) => {
  const res = await request('/fmis/settle/detail', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res.success,
  }
}