import request from '@/utils/request'

// 售后明细
export const fmisRefundLog = async (params = {}, options = {}) => {
  const { createTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/report/config/fmisRefundLog',
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