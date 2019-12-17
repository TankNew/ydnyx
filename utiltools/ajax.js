import axios from 'axios'
import swal from 'sweetalert'
import appconst from './appconst'

const ajax = axios.create({
    baseURL: appconst.remoteServiceBaseUrl,
    timeout: 30000,
    withCredentials: true
})
ajax.interceptors.request.use(
    config => {
        config.headers.common[window.abp.localization.cookieName] = window.abp.utils.getCookieValue(
            abp.localization.cookieName
        )
        config.headers.common[window.abp.multiTenancy.tenantIdCookieName] = window.abp.multiTenancy.getTenantIdCookie()
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)
ajax.interceptors.response.use(
    respon => {
        return respon
    },
    error => {
        if (
            !!error.response &&
            !!error.response.data.error &&
            !!error.response.data.error.message &&
            error.response.data.error.details
        ) {
            swal({
                title: error.response.data.error.message,
                text: error.response.data.error.details,
                icon: 'error'
            })
        } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
            swal({
                title: window.abp.localization.localize('LoginFailed'),
                text: error.response.data.error.message,
                icon: 'error'
            })
        } else if (!error.response) {
            swal({
                title: window.abp.localization.localize('UnknownError'),
                icon: 'error'
            })
        }
        console.log(`ajax error`)
        return Promise.reject(error)
    }
)
export default ajax
