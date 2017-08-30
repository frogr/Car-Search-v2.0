'use strict'

const cl = require('./clSvc')
const ebay = require('./ebaySvc')

const search = (req, res, next) => {

  // get zip from qs and validate
  const zip = req.query.zip
  if(!zip) {
    return res.json({error:'Zip code is required'})
  }
  if(!/\d{5}/.test(zip)) {
    return res.json({error:'Invalid zip code format'})
  }

  // get distance from qs and validate
  const distance = req.query.distance
  if(['15','50','100','500','1000','5000'].indexOf(distance) == -1) {
    return res.json({error:'Invalid distance'})
  }

  // get keywords from qs and validate
  const keywords = req.query.keywords
  if(!keywords) {
    return res.json({error:'Keyword is required'})
  }
  if(keywords.length > 60) {
    return res.json({error:'Too many keywords'})
  }

  // do craigslist search
  cl.search(zip, distance, keywords, (err, clData) => {
    if(err) {
      return res.json({error:'Could not retrieve craigslist search results'})
    }
    // do ebay search
    ebay.search(zip, distance, keywords, (err, ebayData) => {
      if(err) {
        return res.json({error:'Could not retrieve ebay search results'})
      }

      // send combined response
      return res.json(
        {error: null, data: clData.concat(ebayData) }
      )

    }) // ebay.search

  }) // cl.search

}

module.exports = search
