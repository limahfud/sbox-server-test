const EventEmitter = require('events').EventEmitter;

let stock = {
    apple: 5, 
    papaya: 1,
    mango: 4
}

module.exports = function() {
    const eventEmiter = new EventEmitter()
    let locked = false

    this.orderItemConcurent = (order, callback) => {
        this.lock(this.orderItem, order, callback)
    }

    // Used to execute order, if stock is sufficient, then stock is reduced
    this.orderItem = (order, callback) => {
        if (!this.validateOrder(order)) {
            this.unlock()
            callback(false)
        } else {
            stock.apple  -= order.apple
            stock.papaya -= order.papaya
            stock.mango  -= order.mango
    
            console.log('Current Stock', stock)
    
            this.unlock()
            callback(true)
        }
        
    }

    // Validating order.
    // return true when order is possible to create
    // return false when order is imposible to create due to insufficient stock
    this.validateOrder = (order) => {
        if (order.apple > stock.apple) return false

        if (order.papaya > stock.papaya) return false

        if (order.mango > stock.mango) return false
        
        return true
    }
    
    // This function is used for deciding whether order process can be done right now
    // if locked == true, then process will wait until previous order is done.
    // else if locked == false, then locked set `true` and process can be continued running 
    this.lock = (func, order, callback) => {
        if (locked) {
            eventEmiter.once('unlock', () => lock(func, order, callback) )
        } else {
            locked = true
            func(order, callback)
        }
    }
    
    // This function is used to make this class unlocked, 
    // and emmiting event to trigger next process
    this.unlock = () => {
        locked = false
        eventEmiter.emit('unlock')
    }

}