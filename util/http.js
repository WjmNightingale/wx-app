import {
    config
} from '../config.js'
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
                let code = res.statusCode
                if ((code + '').startsWith('2')) {
                    // 服务器成功响应
                    params.success(res)
                } else {
                    // 服务器异常
                }
            },
            fail: (err) => {
                console.log(err)
            },
            complete: () => {
                console.log('请求发送完毕')
            }
        })
    }
}
export {
    HTTP
}