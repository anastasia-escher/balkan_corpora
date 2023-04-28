import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import {Notify, LoadingBar} from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: import.meta.env.VITE_APP_BACKEND_URL});
console.log('api base url: ', api.defaults.baseURL)


api.interceptors.request.use(
  config => {
    LoadingBar.start()
    return config
  },
  error => {
    console.error('AXIOS request error:', error.response)
    Notify.create({
      message: 'Error',
      caption: 'Request error',
      icon: 'warning',
      color: 'warning',
    })
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
