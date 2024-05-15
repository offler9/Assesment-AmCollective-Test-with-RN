// /* eslint-disable arrow-body-style */
// import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
// import PackageJson from '../../package.json'

// export default function axiosClient<TResponse = any>(
//   baseURL: string,
//   config: AxiosRequestConfig,
// ): AxiosPromise<TResponse> {
//   // init axios instance with init config
//   const instance = axios.create({
//     baseURL,
//     headers: {
//       ...config.headers,
//       'Content-Type': 'application/json',
//       Accept: '*/*',
//       APP_VERSION: PackageJson.version,
//       // Object: config.url,
//       // User: stateData.user,
//       // Verb: 'read',
//     },
//     timeout: 10000,
//   })

//   // interceptor REQUEST
//   instance.interceptors.request.use((reqConfig) => {
//     console.log('==Axios REQUEST==', reqConfig)
//     return reqConfig
//   })

//   // interceptor RESPONSE
//   instance.interceptors.response.use(
//     (resp) => {
//       console.log('==Axios SUCCESS RESPONSE==', resp)
//       return Promise.resolve(typeof resp === 'string' ? null : resp)
//     },
//     (err) => {
//       // console.log('==Axios ERROR RESPONSE==', err, err.response)
//       return Promise.reject(typeof err === 'string' ? null : err)
//     },
//   )

//   // return The Axios Promise
//   return instance(config)
// }

// export function modAxios(baseURL: string | undefined) {
//   // SHOULD ends with '/'
//   console.log('base',baseURL)
//   async function _f<TResponse>(
//     url: string,
//     config: AxiosRequestConfig,
//   ) {
//     // SHOULD NOT starts with '/'
//     const url_ = url?.startsWith('/') ? url.substring(1) : url
//     const config_ = { ...config }
//     config_.url = url_

//     return axiosClient<TResponse>(baseURL, config_)
//   }
//   console.log(_f)

//   return _f
// }
