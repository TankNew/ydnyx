import swal from 'sweetalert'

export default function({ $axios, store, app, redirect }) {
    $axios.onRequest(
        config => {
            const location = app.$cookies.get(
                store.state.location.data.headerName
            )
            config.headers.common[store.state.location.data.headerName] =
                location || store.getters['location/getCulture']

            /**开发测试 */
            const multiTenancyHeader = 'Abp.TenantId'
            const multiTenancy = app.$cookies.get(multiTenancyHeader)
            config.headers.common[multiTenancyHeader] = multiTenancy || 9
            /**开发测试 over*/

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
            } else if (
                !!error.response &&
                !!error.response.data.error &&
                !!error.response.data.error.message
            ) {
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
