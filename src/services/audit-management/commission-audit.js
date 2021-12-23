import request from '@/utils/request'


export const myInstances = async (params = {}, options = {}) => {
    const { current, pageSize,submitTime, ...rest } = params;
    const res = await request('/auth/jump/url', {
      method: 'POST',
      data:  {
        'requestUrl': '/java-admin/flow/myInstances',
        page: current,
        size: pageSize,
        beginTime:submitTime&&submitTime[0],
        endTime:submitTime&&submitTime[1],
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


export const getInstance = async (params = {}, options = {}) => {
const {...rest } = params;
const res = await request('/auth/jump/url', {
    method: 'POST',
    data:  {
      'requestUrl': '/java-admin/flow/getInstance',
      ...rest
    },
    ...options
})
return {
    data: res.data.records,
    code:res.code,
    success: res.success
}
}


export const process = async (params = {}, options = {}) => {
    const {...rest } = params;
    const res = await request('/auth/jump/url', {
        method: 'POST',
        data:  {
        'requestUrl': '/java-admin/flow/process',
        ...rest
        },
        ...options
    })
    return {
        data: res.data,
        code:res.code,
        success: res.success
    }
    }