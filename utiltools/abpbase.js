import Vue from 'vue'
import appconst from './appconst'

export const L = function(value, source, ...argus) {
    if (source) {
        return window.abp.localization.localize(value, source, argus)
    } else {
        return window.abp.localization.localize(value, appconst.localization.defaultLocalizationSourceName, argus)
    }
}
export const hasPermission = function(permissionName) {
    return window.abp.auth.hasPermission(permissionName)
}
export const hasAnyOfPermissions = function(...argus) {
    return window.abp.auth.hasAnyOfPermissions(...argus)
}
export const hasAllOfPermissions = function(...argus) {
    return window.abp.auth.hasAllOfPermissions(...argus)
}

const Property = {
    install(Vue) {
        Object.defineProperty(Vue.prototype, 'L', { value: L })
        Object.defineProperty(Vue.prototype, 'hasPermission', { value: hasPermission })
        Object.defineProperty(Vue.prototype, 'hasAnyOfPermissions', { value: hasAnyOfPermissions })
        Object.defineProperty(Vue.prototype, 'hasAllOfPermissions', { value: hasAllOfPermissions })
    }
}

Vue.use(Property)
