function drawBarGraph(){
    //Data should ideally come from the permits table or view 
    var data = [{
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }];

    Plotly.newPlot('myDiv', data);
}

function drawPieChart(){
    var data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
      }];
      
      Plotly.newPlot('myDiv', data);
}

function drawLineChart(){
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
}

function drawScatterPlot(){
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'markers',
        type: 'scatter'
      };
      
      var trace2 = {
        x: [2, 3, 4, 5],
        y: [16, 5, 11, 9],
        mode: 'lines',
        type: 'scatter'
      };
      
      var trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines+markers',
        type: 'scatter'
      };
      
      var data = [trace1, trace2, trace3];
      
      Plotly.newPlot('myDiv', data);
}