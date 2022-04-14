import request from '@/utils/request'

// 费用明细-分页
export const divideFeePage = async (params, options = {}) => {
  const { createTime, settleTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/divideFee/page',
      page: current,
      size: pageSize,
      createTimeBegin: createTime?.[0],
      createTimeEnd: createTime?.[1],
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