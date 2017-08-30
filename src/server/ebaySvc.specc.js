const ebay = require('./ebaySvc')

test('ebay search', () => {
  return ebay.search('90026', '100', 'fiat', (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })
})
