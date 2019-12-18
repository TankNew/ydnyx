import '../utiltools/abp'
import '../utiltools/abpbase'
import appconst from '../utiltools/appconst'
import tools from '../utiltools/tools'

export default async function({ $axios, redirect }) {
    // 设置ABP本地化
    if (!abp.utils.getCookieValue(abp.localization.cookieName)) {
        const language = navigator.language
        // if (language == 'zh-CN') language = 'zh-Hans'
        abp.utils.setCookieValue(
            abp.localization.cookieName,
            language,
            new Date(new Date().getTime() + 5 * 365 * 86400000),
            abp.appPath
        )
    }
    await $axios.get('/apib/AbpUserConfiguration/GetAll').then(data => {
        window.abp = tools.extend(true, window.abp, data.data.result)
        window.abp.localization.defaultSourceName =
            appconst.localization.defaultLocalizationSourceName
        window.abp.banner = {
            HomePageWidth: abp.setting.getInt('App.Banner.HomePageWidth'),
            HomePageHeight: abp.setting.getInt('App.Banner.HomePageHeight'),
            Width: abp.setting.getInt('App.Banner.Width'),
            Height: abp.setting.getInt('App.Banner.Height'),
            Interval: abp.setting.getInt('App.Banner.Interval')
        }
    })
}
