import request from '@/utils/request'

// 渠道分页列表
export const channel = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/fmis/channel/page', {
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