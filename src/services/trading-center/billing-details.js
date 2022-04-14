import request from '@/utils/request'

// 结算明细-分页
export const settlePage = async (params, options = {}) => {
  const { settleTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/settle/page',
      page: current,
      size: pageSize,
      settleTimeBegin: settleTime?.[0],
      settleTimeEnd: settleTime?.[1],
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
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/settle/detail',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res.success,
  }
}