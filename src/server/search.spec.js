/* global jest, expect */
'use strict'

const search = require('./search')

describe('search request handler', () => {
  let req, res
  
  beforeEach(() => {
    req = {
      query: {
        zip: '90026',
        distance: '15',
        keywords: 'mustang'
      }
    }
    res = {}
  })
  
  it('returns error for blank zip', (done) => {
    req.query.zip = ''
    res.json = (resObj) => {
      expect(resObj).toEqual({
        error: 'Zip code is required'
      })
      done()
    }
    // search should call res.json with err msg
    search(req, res)
  })
  
  it('returns error for alpha num zip', (done) => {
    req.query.zip = 'a1234'
    res.json = (resObj) => {
      expect(resObj).toEqual({
        error: 'Invalid zip code format'
      })
      done()
    }
    // search should call res.json with err msg
    search(req, res)
  })
  
  it('returns error for short zip', (done) => {
    req.query.zip = '1234'
    res.json = (resObj) => {
      expect(resObj).toEqual({
        error: 'Invalid zip code format'
      })
      done()
    }
    // search should call res.json with err msg
    search(req, res)
  })
  
  it('returns error for invalid distance', (done) => {
    req.query.distance = '25'
    res.json = (resObj) => {
      expect(resObj).toEqual({
        error: 'Invalid distance'
      })
      done()
    }
    // search should call res.json with err msg
    search(req, res)
  })
  
  it('returns error for blank keywords', (done) => {
    req.query.keywords = ''
    res.json = (resObj) => {
      expect(resObj).toEqual({
        error: 'Keyword is required'
      })
      done()
    }
    // search should call res.json with err msg
    search(req, res)
  })
  
  it('returns error for too long keywords', (done) => {
    req.query.keywords = 'mustang sally'.repeat(5)
    res.json = (resObj) => {
      expect(resObj).toEqual({
        error: 'Too many keywords'
      })
      done()
    }
    // search should call res.json with err msg
    search(req, res)
  })
  
})
