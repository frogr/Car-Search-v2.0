const ebay = require('ebay-api/index.js')
const moment = require('moment')
const utils = require('./utils')


const getCityFromLocation = (location) => {
  const parts = location.split(',')
  const ret = (parts.length > 2) ? parts[0] : ''
  return ret
}


const getStateFromLocation = (location) => {
  const parts = location.split(',')
  const ret = (parts.length > 2) ? parts[1] : ''
  return ret
}


const formatStartTime = (dateString) => {
  return moment(dateString).format('YYYY-MM-DD HH:mm:ss')
}


const mapResults = (rawResponse) => {
  let items = rawResponse.searchResult.item

  // ebay returns a single result object if only
  // one item matches the search criteria
  if(!Array.isArray(items)) {
    if(!items) {
      return []
    } else {
      items = [items]
    }
  }

  const results = items.map(item => ({
    url: item.viewItemURL,
    title: item.title,
    price: item.sellingStatus.currentPrice.amount,
    year: utils.getYearFromTitle(item.title),
    city: getCityFromLocation(item.location),
    state: getStateFromLocation(item.location),
    date: formatStartTime(item.startTime),
    source: 'eBay'
  }))
  
  return results
}


module.exports.search = (zip, distance, keywords, cb) => {
  const ebParams = {
    categorySiteId: 6001,
    categoryId: 6001,
    keywords: keywords,
    buyerPostalCode: zip,
    itemFilter: [{name: 'MaxDistance', value: distance}]
  }

  ebay.xmlRequest(
    {
      serviceName: 'Finding',
      opType: 'findItemsAdvanced',
      appId: 'AustinFr-carSearc-PRD-c91ebc5cc-a8e4f8a0',
      params: ebParams,
      reqOptions: { siteId: 100 },
      parser: ebay.parseResponseJson
    },
    (err, res) => {
      if(err) {
        cb(err, null)
      } else {
        cb(null, mapResults(res))
      }
    }
  )
}
