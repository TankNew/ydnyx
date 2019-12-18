const pkg = require('~/package')

const state = () => ({
    pathName: null
})

const mutations = {
    set(state, text) {
        state.pathName = text
    }
}
const getters = {
    current(state) {
        return state.pathName || pkg.name
    }
}

export default {
    state,
    mutations,
    getters
}
