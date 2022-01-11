import request from '@/utils/request'


export const flowMainList = async (params = {}, options = {}) => {
    const { current, pageSize, ...rest } = params;
    const res = await request('/auth/jump/url', {
      method: 'POST',
      data:  {
        'requestUrl': '/java-admin/flow/flowMainList',
        page: current,
        size: pageSize,
        ...rest
      },
      ...options
    })
    return {
      data: res.data.records,
      total:res.data.total,
      success: res.success
    }
  }


export const getFlowMain = async (params = {}, options = {}) => {
const { ...rest } = params;
const res = await request('/auth/jump/url', {
    method: 'POST',
    data:  {
      'requestUrl': '/java-admin/flow/getFlowMain',
      ...rest
    },
    ...options
})
return {
    data: res.data.records,
    code: res.code,
    success: res.success
}
}


export const updateFlowMain = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/jump/url', {
      method: 'POST',
      data:  {
        'requestUrl': '/java-admin/flow/updateFlowMain',
        ...rest
      },
      ...options
  })
  return {
      data: res.data,
      code: res.code,
      success: res.success
  }
  }


export const commonList = async (params = {}, options = {}) => {
  const { ...rest } = params;
  const res = await request('/auth/admin/account/commonList', {
      method: 'POST',
      data:  {
        ...rest
      },
      ...options
  })
  return {
      data: res.data.records,
      code: res.code,
      success: res.success
  }
  }