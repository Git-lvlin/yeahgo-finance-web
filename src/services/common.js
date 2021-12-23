import request from '@/utils/request';

export const getExpressList = (params, options = {}) => {
  return request('/auth/order/collectiveOrder/express', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const cacheUserAuths = (params, options = {}) => {
  return request('/auth/admin/role/cacheUserAuths', {
    method: 'POST',
    data: params,
    ...options
  });
}

export const detailExt = (params, options = {}) => {
  return request('/auth/user/user/detailExt', {
    method: 'POST',
    data: params,
    ...options
  });
}

// 业务模式
export const tradeModeList = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/tradeMode/list',
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 分账角色
export const roleList = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/role/list',
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 公式列表
export const formulaList = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/formula/list',
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 规则条件
export const ruleCondList = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/ruleCond/list',
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 费用列表（不包含系统默认费用）
export const feeItemList = async (params = {}, options = {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/fmis/feeItem/list',
      ...params
    },
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 订单类型
export const orderTypes = async (params={}, options= {}) => {
  const res = await request('/auth/jump/url', {
    method: 'POST',
    data: {
      requestUrl: '/java-admin/financial/common/orderTypes',
      ...params
    },
    ...options
  })

  return {
    data: res.data.records
  }
}