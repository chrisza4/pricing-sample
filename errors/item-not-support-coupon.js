class ItemNotSupportCoupon extends Error {
  constructor (...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ItemNotSupportCoupon)
    }

    this.name = 'ItemNotSupportCoupon'
    this.date = new Date()
  }
}

module.exports = ItemNotSupportCoupon
