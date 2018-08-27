import {
    config
} from '../config.js'

const tips = {
    1: '抱歉，出现了未知错误',
    1005: 'app-key 无效，请前往 www.7yue.pro 申请',
    3000: '期刊不存在'
}
class HTTP {
    request({
        url,
        data,
        method
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }

    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: `${config.api_base_url}${url}`,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode + ''
                if (code.startsWith('2')) {
                    // 请求成功
                    resolve(res.data)
                } else {
                    // 请求失败
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                    reject()
                }
            },
            fail: () => {
                this._show_error()
                reject()
            },
            complete: () => {
                // 无论请求成功失败与否都会执行回调函数
            }
        })
    }

    _show_error(error_code) {
        error_code = error_code || 1
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}
export {
    HTTP
}