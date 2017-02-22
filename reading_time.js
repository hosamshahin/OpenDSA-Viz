"use strict";
var test_data

$(function() {
  test_data = getTestData()
  var colors = d3.scale.category20();
  drawChart()
});

function drawChart() {
  var chart;
  nv.addGraph(function() {
    chart = nv.models.stackedAreaChart()
      .useInteractiveGuideline(true)
      // .height(600)
      .x(function(d) {
        return d[0]
      })
      .y(function(d) {
        return d[1]
      })
      .controlLabels({
        stacked: "Stacked"
      })
      .duration(300);

    chart.xAxis.tickFormat(function(d) {
      return d3.time.format('%x')(new Date(d))
    });
    chart.yAxis.axisLabel("Students total reading time in hours")
      // chart.yAxis.axisLabelDistance(10)
      // chart.yAxis.fontSize("12px")
    chart.yAxis.tickFormat(d3.format(',.2f'));
    chart.legend.vers('furious');

    d3.select('#chart1')
      .datum(test_data)
      .transition().duration(1000)
      .call(chart)
      .each('start', function() {
        setTimeout(function() {
          d3.selectAll('#chart1 *').each(function() {
            if (this.__transition__)
              this.__transition__.duration = 1;
          })
        }, 0)
      });

    nv.utils.windowResize(chart.update);
    return chart;
  });
}

function pathJoin(parts, sep) {
  var separator = sep || '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}

function getType(obj) {
  if (typeof obj !== "undefined") {
    // Parse the type from the Object toString output
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }
  return "undefined";
}

function getJSON(data) {
  if (typeof data === 'undefined') {
    console.warn("getJSON() error: data is undefined");
    return {};
  }

  if (getType(data) === "string") {
    data = jQuery.parseJSON(data);
  }
  return data;
}

function getTestData() {
  $.ajax({
    url: 'data/reading_time.json',
    async: false,
    dataType: "json",
    success: function(data) {
      test_data = getJSON(data);
    },
    error: function(data) {
      data = getJSON(data);
      if (data.hasOwnProperty('status') && data.status === 200) {
        console.error('JSON file is malformed. Please make sure your JSON is valid.');
      } else {
        console.error('Unable to load JSON language file (' + pathJoin([course_path, 'reading_time.json']) + ')');
      }
    }
  });


  return test_data;
}

var expandLegend = function() {
  var exp = chart.legend.expanded();
  chart.legend.expanded(!exp);
  chart.update();
}