import request from '@/utils/request'

// 费用明细-分页
export const divideFeePage = async (params, options = {}) => {
  const { createTime, pageSize, current, ...rest } = params
  const res = await request('/fmis/divideFee/page', {
    method: 'POST',
    data: {
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