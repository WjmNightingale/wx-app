import {
    config
} from '../config.js'

const tips = {
    1: '抱歉，出现了未知错误',
    1005: 'app-key 无效，请前往 www.7yue.pro 申请',
    3000: '期刊不存在'
}
class HTTP {
    request(params) {
        if (!params.method) {
            params.method = 'GET'
        }
        wx.request({
            url: `${config.api_base_url}${params.url}`,
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode + ''
                if (code.startsWith('2')) {
                    // 服务器成功响应
                    params.success && params.success(res.data)
                } else {
                    // 服务器异常
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: () => {
                this._show_error()
            },
            complete: () => {
                console.log('请求发送完毕')
            }
        })
    }

    _show_error(error_code) {
        error_code = error_code || 1
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}
export {
    HTTP
}