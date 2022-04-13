import request from '@/utils/request'

// 交易明细-分页
export const tradePage = async (params, options = {}) => {
  const { createTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/trade/page',
      page: current,
      size: pageSize,
      createTimeBegin: createTime?.[0],
      createTimeEnd: createTime?.[1],
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

// 交易明细-详情
export const tradeDetail = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/trade/detail',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res.success,
  }
} 