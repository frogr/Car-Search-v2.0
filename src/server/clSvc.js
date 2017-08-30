const cl = require('./node-craigslist')
const utils = require('./utils')


const clClient = new cl.Client({
  city: 'sacramento',
  category: 'cto'
})

const cleanUrl = (url) => {
  if(url.substr(33,5) == 'https') {
    return 'https' + url.substr(38)
  } else {
    return url
  }
}

//https://sacramento.craigslist.orghttps//stockton.craigslist.org/cto/d/

const mapResults = (items) => {
  const results = items.map(item => {
    
    const price = (item.price.indexOf('$') == 0)
      ? item.price.substr(1)
      : item.price
    
    const city = item.location
      .replace('(', '')
      .replace(')', '')
    
    return {    
      url: cleanUrl(item.url),
      title: item.title,
      price,
      year: utils.getYearFromTitle(item.title),
      city,
      state: ' ',
      date: item.date,
      source: 'Craigslist'
    }
  })
  
  return results
}


module.exports.search = (zip, distance, keywords, cb) => {
  const options = {
    postal: zip,
    searchDistance: parseInt(distance),
    searchTitlesOnly: true
  }
  
  //clClient.request.on('request', console.log)

  return clClient.search(options, keywords,
    (err, res) => {
      if(err) {
        cb(err, null)
      } else {
        cb(null, mapResults(res))
      }
    })
}
