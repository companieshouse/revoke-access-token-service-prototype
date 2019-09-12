const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// Route index page
router.get('/', function (req, res) {
  var realCases = require('./data/data.js')

  req.session.cases = realCases.concat()
  req.session.recents = []
  req.session.notifications = {}
  req.session.notifications.list = []
  console.log(req.session.cases)
  res.render('index')
})
router.all('*', function (req, res, next) {
  if (typeof req.session.cases === 'undefined') {
    return res.redirect('/')
  }
  next()
})

router.get('/access', function (req, res) {
  console.log(req.session.cases)
  console.log('1')

  res.render('access', {
    cases: req.session.cases
  })
})

router.get('/revoke-access', function (req, res) {
  var id = parseInt(req.query.id)
  var i = 0

  for (i = 0; i < req.session.cases.length; i++) {
    if (req.session.cases[i].id === id) {
      req.session.workingCase = req.session.cases[i]
    }
  };
  console.log(req.session.workingCase)
  res.render('revoke-access', {
    case: req.session.cases[id]

  })
})

module.exports = router
