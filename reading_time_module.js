'use strict';
var test_data = [],
  config, base_dir, data_dir, semester

$(function () {

  test_data = getTestData()

  populateSelect();
  // $('#semesterList').change(function(e) {
  //   populateSelect($('#semesterList').val())
  // });

  $('#display-btn').on("click", function () {
    drawChart()
  });

  // $('#semesterList').trigger('change');

});

function populateSelect() {
  var semester_list = test_data;
  var arrayLength = semester_list.length;
  var $fromModSelect = $('#from-mod-select');
  var $toModSelect = $('#to-mod-select');
  $fromModSelect.find('option').remove()
  $toModSelect.find('option').remove()
  for (var i = 0; i < arrayLength; i++) {
    name = semester_list[i]['name']
    $fromModSelect.append('<option value=' + i + '>' + name + '</option>');
    $toModSelect.append('<option value=' + i + '>' + name + '</option>');
  }
}

function drawChart() {
  var from_index = parseInt($('#from-mod-select').val());
  var to_index = parseInt($('#to-mod-select').val());
  var data = test_data.slice(from_index, to_index + 1);
  var chart = new Highcharts.Chart('container', {
    chart: {
      // 'height': 500,
      'type': 'area'
    },
    // 'exporting': {
    //   'enabled': false
    // },
    'title': {
      'text': ''
    },
    'yAxis': [{
      'title': {
        'text': 'Students total reading time in minutes'
      }
    }],
    'series': data,
    'xAxis': [{
      'type': 'datetime',
      'labels': {
        'format': '{value:%Y-%m-%d}'
      }
    }],
    // 'subtitle': {
    //   'text': null
    // },
    'id': 'chart',
    // 'chart': {
    //   'renderTo': 'chart'
    // }
  });
}

function pathJoin(parts, sep) {
  var separator = sep || '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}

function getType(obj) {
  if (typeof obj !== 'undefined') {
    // Parse the type from the Object toString output
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }
  return 'undefined';
}

function getJSON(data) {
  if (typeof data === 'undefined') {
    console.warn('getJSON() error: data is undefined');
    return {};
  }

  if (getType(data) === 'string') {
    data = jQuery.parseJSON(data);
  }
  return data;
}

function getTestData() {

  $.ajax({
    url: 'data/reading_time_modules.json',
    async: false,
    dataType: 'json',
    success: function (data) {
      test_data = getJSON(data);
    },
    error: function (data) {
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

var expandLegend = function () {
  var exp = chart.legend.expanded();
  chart.legend.expanded(!exp);
  chart.update();
}