const cl = require('./clSvc')

test('cl search', () => {
  return cl.search('90026', '100', 'fiat', (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })
})
