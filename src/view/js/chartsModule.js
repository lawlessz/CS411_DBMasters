var graphX = "";
var graphY = "";
var measure = "";

function setOptionsforGraphs() {
  graphX = document.getElementById("graphX").value;
  graphY = document.getElementById("graphY").value;
  measure = document.getElementById("valueType").value;
  alert('I got: ' + graphX + ' ' + graphY + ' ' + measure);
}


function drawBarGraph() {
  document.getElementById("errorDiv").innerHTML = "";
  if (graphX != "" && graphY != "" && measure != "") {
    var data = [{
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      type: 'bar'
    }];

    Plotly.newPlot('myDiv', data);
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }

}

function drawHorizontalBarGraph() {
  document.getElementById("errorDiv").innerHTML = "";
  if (graphX != "" && graphY != "" && measure != "") {
    var data = [{
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      type: 'bar',
      orientation: 'h'
    }];

    Plotly.newPlot('myDiv', data);
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

function drawPieChart() {
  if (graphX != "" && graphY != "" && measure != "") {
    var data = [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }];

    Plotly.newPlot('myDiv', data);
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

function drawLineChart() {
  document.getElementById("errorDiv").innerHTML = "";
  if (graphX != "" && graphY != "" && measure != "") {
    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    };

    var trace2 = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type: 'scatter'
    };

    var data = [trace1, trace2];

    Plotly.newPlot('myDiv', data);
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

function drawScatterPlot() {
  document.getElementById("errorDiv").innerHTML = "";
  if (graphX != "" && graphY != "" && measure != "") {
    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    };

    // var trace2 = {
    //   x: [2, 3, 4, 5],
    //   y: [16, 5, 11, 9],
    //   mode: 'lines',
    //   type: 'scatter'
    // };

    // var trace3 = {
    //   x: [1, 2, 3, 4],
    //   y: [12, 9, 15, 12],
    //   mode: 'lines+markers',
    //   type: 'scatter'
    // };

    // var data = [trace1, trace2, trace3];
    var data = [trace1];

    Plotly.newPlot('myDiv', data);
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}