import request from '@/utils/request'

// 渠道分页列表
export const channel = async (params, options = {}) => {
  const { pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/channel/page',
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