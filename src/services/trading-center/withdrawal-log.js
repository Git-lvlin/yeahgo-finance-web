import request from '@/utils/request'

// 提现明细
export const fmisWithdrawLog = async (params = {}, options = {}) => {
  const { createTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/report/config/fmisWithdrawLog',
      page: current,
      size: pageSize,
      startTime: createTime?.[0],
      endTime: createTime?.[1],
      ...rest
    },
    ...options
  })
  return {
    data: res.data.records,
    total: res.data.records.page.total,
    success: true
  }
} 