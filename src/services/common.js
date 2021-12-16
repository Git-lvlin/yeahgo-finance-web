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
  const res = await request('/fmis/tradeMode/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 分账角色
export const roleList = async (params = {}, options = {}) => {
  const res = await request('/fmis/role/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 公式列表
export const formulaList = async (params = {}, options = {}) => {
  const res = await request('/fmis/formula/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}

// 规则条件
export const ruleCondList = async (params = {}, options = {}) => {
  const res = await request('/fmis/ruleCond/list', {
    method: 'POST',
    data: params,
    ...options
  })
  return {
    data: res?.data,
    success: res?.success
  }
}
