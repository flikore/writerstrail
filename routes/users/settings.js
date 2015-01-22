var router = require('express').Router(),
  _ = require('lodash'),
  sendflash = require('../../utils/middlewares/sendflash'),
  dateFormats = require('../../utils/data/dateformats'),
  timeFormats = require('../../utils/data/timeformats'),
  chartTypes = require('../../utils/data/charttypes');

router.get('/', sendflash, function (req, res) {
  res.render('user/settings/index', {
    title: 'Settings',
    section: 'settings',
    dateFormats: dateFormats,
    timeFormats: timeFormats
  });
});

router.post('/', function (req, res, next) {
  var settings = req.user.settings,
    dateFormat = req.body.dateformat,
    timeFormat = req.body.timeformat,
    chartType = req.body.charttype;
  if (_.contains(dateFormats.data, dateFormat)) {
    console.log(dateFormat);
    settings.dateFormat = dateFormat;
  }
  if (_.contains(timeFormats.data, timeFormat)) {
    settings.timeFormat = timeFormat;
  }
  if (_.contains(chartTypes, chartType)) {
    settings.chartType = chartType;
  }
  settings.showRemaining = !!req.body.showremaining;
  settings.showPondered = !!req.body.showpondered;
  req.user.settings.save().then(function () {
    req.flash('success', 'Your settings were successfully saved');
    res.redirect('back');
  }).catch(function (err) {
    next(err);
  });
});

module.exports = router;