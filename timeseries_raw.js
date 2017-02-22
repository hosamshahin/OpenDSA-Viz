"use strict";
var test_data = [],
  config, base_dir, data_dir, semester

$(function() {
  $.get('/config.yml')
    .done(function(data) {
      config = jsyaml.load(data)
      base_dir = "/"
      data_dir = pathJoin([base_dir, config['params']['data_dir']])
      test_data = getTestData()

      $('#semesterList').change(function(e) {
        drawChart($('#semesterList').val())
      });

      // $('#semesterList').trigger('change');

    });

});

function getTestData() {
  var semesters = config['params']['semesters']

  for (var s in semesters) {
    var semester_name = config[semesters[s]]['course_path']
    var course_path = pathJoin([data_dir, semester_name])

    $.ajax({
      url: pathJoin([course_path, 'reading_time_modules.json']),
      async: false,
      dataType: "json",
      success: function(data) {
        test_data[semesters[s]] = getJSON(data);
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
  }

  return test_data;
}

function drawChart(semester) {
  semester = semester || 'S2016'
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      rows: test_data[semester]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: "%Y-%m-%d" // https://github.com/mbostock/d3/wiki/Time-Formatting#wiki-format
        }
      }
    }
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

// var rows = [
//   ["x", "Views", "GMV"]
// ];
// rows = rows.concat([
//   [1398709800000, 780, 136],
//   [1398450600000, 812, 134],
//   [1399401000000, 784, 154],
//   [1399228200000, 786, 135],
//   [1399573800000, 802, 131],
//   [1399487400000, 773, 166],
//   [1399314600000, 787, 146],
//   [1399919400000, 1496, 309],
//   [1399833000000, 767, 138],
//   [1399746600000, 797, 141],
//   [1399660200000, 796, 146],
//   [1398623400000, 779, 143],
//   [1399055400000, 794, 140],
//   [1398969000000, 791, 140],
//   [1398882600000, 825, 107],
//   [1399141800000, 786, 136],
//   [1398537000000, 773, 143],
//   [1398796200000, 783, 154],
//   [1400005800000, 1754, 284]
// ].sort(function(a, b) {
//   return a[0] - b[0];
// }));

// 1451624400000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0