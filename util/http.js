import {config} from '../config.js'
class HTTP {
    request(params) {
        wx.request({
            url: `${config.api_base_url}${params.url}`,
            header: {
                appkey: config.appkey
            },
            data: params.data,
            method: params.method,
            success: params.success,
            fail: params.fail,
            complete: params.complete
        })
    }
}
export {HTTP}