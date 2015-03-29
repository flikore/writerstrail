window.chart2 = function chart2(link, $, Highcharts, chartType, showRem, showAdjusted, unit) {
  link = link + '?zoneOffset=' + (new Date()).getTimezoneOffset();

  var options = {
    chart: {
      renderTo: 'chart',
      type: 'column'
    },
    plotOptions: {
      column: {
        borderWidth: 0
      }
    },
    xAxis: {
      type: 'datetime',
      minRange: 30 * 24 * 3600000
    },
    yAxis: [
      {
        title: {
          text: 'Word count'
        }
      },
      {
        title: {
          text: 'Character count'
        },
        opposite: true
      }
    ],
    series: []
  },
      chart,
      isAcc = chartType === 'cumulative';

  $.getJSON(link, function (data) {
    var start = Date.UTC.apply(null, data.date[0].split('-').map(function (piece) {
      return parseInt(piece, 10);
    })),
        meta = {
          wordcount: {
            name: 'Word count',
            color: '#674732',
            visible: false,
            yAxis: 0
          },
          charcount: {
            name: 'Character count',
            color: '#1F77B4',
            visible: false,
            yAxis: 1
          },
          worddaily: {
            name: 'Daily writing',
            color: '#FF9E49',
            visible: true,
            yAxis: 0
          },
          chardaily: {
            name: 'Daily characters',
            color: '#2CA02C',
            visible: true,
            yAxis: 1
          }
        };

    for (var key in data) {
      var serie = {
        data: data[key],
        id: key,
        pointInterval: 24 * 3600000,
        pointStart: start
      };

      if (meta[key]) {
        for (var info in meta[key]) {
          serie[info] = meta[key][info];
        }
        options.series.push(serie);
      }
    }
    chart = new Highcharts.Chart(options);
  });

  $('#target-change')
      .data('acc', isAcc)
      .html(isAcc ? 'Show as daily writing' : 'Show as cumulative count')
      .click(function () {
        var self = $(this),
            ifAcc = ['wordcount', 'charcount'],
            noAcc = ['worddaily', 'chardaily'];

        function doSeries(id, func) {
          var ser = chart.get(id);
          if (ser) {
            ser[func]();
          }
        }

        function hide (id) {
          doSeries(id, 'hide');
        }

        function show(id) {
          doSeries(id, 'show');
        }

        if (self.data('acc')) {
          self.html('Show as cumulative count');
          ifAcc.forEach(hide);
          noAcc.forEach(show);
          self.data('acc', false);
        } else {
          self.html('Show as daily writing');
          noAcc.forEach(hide);
          ifAcc.forEach(show);
          self.data('acc', true);
        }
      });
};