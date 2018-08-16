const url = require('url')

module.exports = {
    getRequestParams(request) {
        const parts = url.parse(request.url, true)

        const query = parts.query

        const items = JSON.parse(query.items);

        return {
            customerId : query.customerId,
            items
        }
    },


    responseSuccess(response, message) {
        response.writeHead(200)
        response.end(JSON.stringify({
            success: true,
            message
        }))
    },

    responseError(response, message) {
        response.writeHead(200)
        response.end(JSON.stringify({
            success: false,
            message
        }))
    }
}