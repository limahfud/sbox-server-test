const http = require('http')
const utils = require('./utils.js')
const Inventory = require('./inventory.js')

const inventory = new Inventory();
const server = http.createServer(function(req, res) {

    // Route for path /select
    // Used to selecting items
    if (req.url.includes('/select')) {
        const params = utils.getRequestParams(req)
        const order = {
            apple: params.items.apple || 0, 
            mango: params.items.mango || 0, 
            papaya: params.items.papaya || 0 
        }

        res.writeHead(200)
        if (inventory.validateOrder(order)) 
            utils.responseSuccess(res, 'Success! Items successfully selected')
        else 
            utils.responseError(res, 'Sorry! Items you selected is out of stock')
    }


    // Route for path /order
    // Used to ordering the items
    else if (req.url.includes('/order')) {
        const params = utils.getRequestParams(req)

        const order = {
            apple: params.items.apple || 0, 
            mango: params.items.mango || 0, 
            papaya: params.items.papaya || 0 
        }

        res.writeHead(200)
        inventory.orderItemConcurent(order, success => {
            if (success) 
                utils.responseSuccess(res, 'Success! Your order will be processed')
            else 
                utils.responseError(res, 'Sorry! The item is out of stock')
        })
    } 
    
    // If route not included the above, response with not found
    else {
        res.writeHead(404)
        res.end('404! Sorry the url you want to access is not found')
    }

})

server.listen(8080)