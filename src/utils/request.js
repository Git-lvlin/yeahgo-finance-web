/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { stringify } from 'querystring';
import { history } from 'umi';
import { paramsEmptyFilter } from '@/utils/utils';


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/** 异常处理程序 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    // const { status, url } = response;
    // notification.error({
    //   message: `请求错误 ${status}: ${url}`,
    //   description: errorText,
    // });
    message.error(errorText)
  } else if (!response) {
    // notification.error({
    //   description: '您的网络发生异常，无法连接服务器',
    //   message: '网络异常',
    // });

    message.error('服务器发生错误，请检查服务器。')
  }

  return response;
};


const getPrefix = () => {
  if (process.env.NODE_ENV !== 'development') {
    return API_URL;
  }

  return '';
}


/** 配置request请求时的默认参数 */

const instance = extend({
  errorHandler,
  prefix: getPrefix()
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});


instance.interceptors.response.use(async (response, options) => {
  const data = await response.clone().json();
  const { showError = true, showSuccess = false } = options;
  if (data.code === 10010) {
    message.error(data.msg)
    setTimeout(() => {
      window.location.replace(`/user/login?${stringify({ redirect: window.location.href })}`)
      window.localStorage.removeItem('authority')
      window.localStorage.removeItem('account')
    }, 1000)
    return response;
  }

  if (data.code !== 0 && showError) {
    message.error(data.msg)
  }

  if (data.code === 0 && showSuccess) {
    // notification.success({
    //   message: '操作成功',
    // });
    message.success('操作成功')
  }

  return response;
});

const request = (url, options = {}) => {
  const token = window.localStorage.getItem('token');
  const ops = {};

  if (token) {
    ops.headers = {
      'admin-token': token,
      ...options.headers
    }
  }

  if (!token && !options.noAuth) {
    // history.replace({
    //   pathname: '/user/login',
    //   search: stringify({
    //     redirect: window.location.href,
    //   }),
    // });

    message.error('未登录');

    setTimeout(() => {
      window.location.replace(`/user/login?${stringify({ redirect: window.location.href })}`)
    }, 1000)
    return null;
  }

  if (options.data) {
    // eslint-disable-next-line no-param-reassign
    options.data = paramsEmptyFilter(options.data)
  }

  if (options.params) {
    // eslint-disable-next-line no-param-reassign
    options.params = paramsEmptyFilter(options.params)
  }

  return instance(url, {
    ...options,
    ...ops,
  })
}


export default request;
