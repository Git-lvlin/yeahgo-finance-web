import request from '@/utils/request'

// 对账管理-交易对账-分页
export const checkTradePage = async (params, options = {}) => {
  const { checkTime, createTime, pageSize, current, ...rest } = params
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/check/tradePage',
      page: current,
      size: pageSize,
      createTimeBegin: createTime?.[0],
      createTimeEnd: createTime?.[1],
      checkTimeBegin: checkTime?.[0],
      checkTimeEnd: checkTime?.[1],
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

// 对账管理-批量修改状态
export const checkUpdateStatusBatch = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/check/updateStatusBatch',
      ...params
    },
    ...options
  })
  return {
    success: res?.success
  }
}

// 批量对账
export const checkCheckByApiBatch = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/check/checkByApiBatch',
      ...params
    },
    ...options
  })
  return {
    success: res?.success
  }
}

// 对账管理-交易对账-详情
export const checkTradeDetail = async (params, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/check/tradeDetail',
      ...params
    },
    ...options
  })
  return {
    data: res?.data?.records,
    success: res?.success
  }
}
