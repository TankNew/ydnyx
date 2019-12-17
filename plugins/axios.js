import swal from 'sweetalert'

export default function({ $axios, redirect }) {
    $axios.onRequest(
        config => {
            config.headers.common[window.abp.localization.cookieName] = window.abp.utils.getCookieValue(
                abp.localization.cookieName
            )
            config.headers.common[
                window.abp.multiTenancy.tenantIdCookieName
            ] = window.abp.multiTenancy.getTenantIdCookie()
            return config
        },
        function(error) {
            return Promise.reject(error)
        }
    )

    $axios.onResponse(
        response => {
            return response
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
                }).then(redirect('/error'))
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
}
