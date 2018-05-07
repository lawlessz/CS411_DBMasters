var graphX = "";
var graphY = "";
var measure = "";

function setOptionsforGraphs() {
  graphX = document.getElementById("graphX").value;
  graphY = document.getElementById("graphY").value;
  measure = document.getElementById("valueType").value;
  //alert('I got: ' + graphX + ' ' + graphY + ' ' + measure);
  //alert('Options set');
}


function drawBarGraph() {
  setOptionsforGraphs();

  document.getElementById("errorDiv").innerHTML = "";
  

  if (graphX != "" && graphY != "" && measure != "") {
      //map the options with the appropriate column name from the table
      var column_name =matchColumntoOptions(graphX);
      inputs={};
      inputs={"column_name":column_name,
            "plotOption" : graphY,
            "aggregateOption" : measure};
      //ajax call to get the data from the table
      $.ajax({
        type: "POST",
        url: "/plotGraphData",
        data: JSON.stringify({ "inputs": inputs }),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            x = [];
            y = [];
            for(var i=0;i< res.result.length;i++){
               x.push(res.result[i][0]);
               y.push(res.result[i][1]);
            }
            var plotData =[{
              x: x,
              y: y,
              type:'bar'
            }];

            console.log('plotData', plotData);
            Plotly.newPlot('myDiv', plotData);
        },
        error: function (request, ajaxOptions, thrownError) {
            console.log(request.responseText)
        }
    });
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }

}

function drawHorizontalBarGraph() {
  setOptionsforGraphs();

  document.getElementById("errorDiv").innerHTML = "";
  if (graphX != "" && graphY != "" && measure != "") {
    var column_name =matchColumntoOptions(graphX);
      inputs={};
      inputs={"column_name":column_name,
            "plotOption" : graphY,
            "aggregateOption" : measure};
      //ajax call to get the data from the table
      $.ajax({
        type: "POST",
        url: "/plotGraphData",
        data: JSON.stringify({ "inputs": inputs }),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            x = [];
            y = [];
            for(var i=0;i< res.result.length;i++){
               x.push(res.result[i][0]);
               y.push(res.result[i][1]);
            }
            var plotData =[{
              x: x,
              y: y,
              type:'bar',
              orientation:'h'
            }];

            Plotly.newPlot('myDiv', plotData);
          },
          error: function (request, ajaxOptions, thrownError) {
              console.log(request.responseText)
          }
      });
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

function drawPieChart() {
  setOptionsforGraphs();

  document.getElementById("errorDiv").innerHTML = "";

  if (graphX != "" && graphY != "" && measure != "") {
    var column_name =matchColumntoOptions(graphX);
      inputs={};
      inputs={"column_name":column_name,
            "plotOption" : graphY,
            "aggregateOption" : measure};
      //ajax call to get the data from the table
      $.ajax({
        type: "POST",
        url: "/plotGraphData",
        data: JSON.stringify({ "inputs": inputs }),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            values = [];
            labels = [];
            for(var i=0;i< res.result.length;i++){
               labels.push(res.result[i][0]);
               values.push(res.result[i][1]);
            }
            var plotData =[{
              values: values,
              labels: labels,
              type:'pie',
            }];

            Plotly.newPlot('myDiv', plotData);
          },
          error: function (request, ajaxOptions, thrownError) {
              console.log(request.responseText)
          }
      });
    
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

function drawLineChart() {
  setOptionsforGraphs();

  document.getElementById("errorDiv").innerHTML = "";
  if (graphX != "" && graphY != "" && measure != "") {
    var column_name =matchColumntoOptions(graphX);
      inputs={};
      inputs={"column_name":column_name,
            "plotOption" : graphY,
            "aggregateOption" : measure};
      //ajax call to get the data from the table
      $.ajax({
        type: "POST",
        url: "/plotGraphData",
        data: JSON.stringify({ "inputs": inputs }),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            x = [];
            y = [];
            for(var i=0;i< res.result.length;i++){
               x.push(res.result[i][0]);
               y.push(res.result[i][1]);
            }
            var plotData =[{
              x: x,
              y: y,
              type:'scatter',
            }];

            Plotly.newPlot('myDiv', plotData);
          },
          error: function (request, ajaxOptions, thrownError) {
              console.log(request.responseText)
          }
      });
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

function drawScatterPlot() {
  setOptionsforGraphs();

  document.getElementById("errorDiv").innerHTML = "";

  if (graphX != "" && graphY != "" && measure != "") {
    var column_name =matchColumntoOptions(graphX);
      inputs={};
      inputs={"column_name":column_name,
            "plotOption" : graphY,
            "aggregateOption" : measure};
      //ajax call to get the data from the table
      $.ajax({
        type: "POST",
        url: "/plotGraphData",
        data: JSON.stringify({ "inputs": inputs }),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            x = [];
            y = [];
            for(var i=0;i< res.result.length;i++){
               x.push(res.result[i][0]);
               y.push(res.result[i][1]);
            }
            var plotData =[{
              x: x,
              y: y,
              mode: 'markers',
              type: 'scatter'
            }];

            Plotly.newPlot('myDiv', plotData);
          },
          error: function (request, ajaxOptions, thrownError) {
              console.log(request.responseText)
          }
      });
  } else {
    document.getElementById("errorDiv").innerHTML = "Please select the column and measure for plotting the graph!!";
    document.getElementById("errorDiv").style.color = "red";
  }
}

//Functions maps the column name selected from the table to the column names in the db.
function matchColumntoOptions(optionValue){
  var column_name="";
  if(optionValue == 'Application/Permit Number'){
    column_name = "permit_id";
  }else if(optionValue == 'Permit Type'){
    column_name = "permit_type";
  }else if(optionValue == 'Address'){
    column_name ='address';
  }else if(optionValue == 'Description'){
    column_name ='description';
  }else if(optionValue == 'Category'){
    column_name ='category';
  }else if(optionValue == 'Action Type'){
    column_name ='action_type';
  }else if(optionValue == 'Work Type'){
    column_name ='work_type';
  }else if(optionValue == 'Value'){
    column_name ='value';
  }else if(optionValue == 'Applicant Name'){
    column_name ='applicant_name';
  }else if(optionValue == 'Application Date'){
    column_name ='application_date';
  }else if(optionValue == 'Issue Date'){
    column_name ='issue_date';
  }else if(optionValue == 'Final Date'){
    column_name ='final_date';
  }else if(optionValue == 'Expiration Date'){
    column_name ='expiration_date';
  }else if(optionValue == 'Status'){
    column_name ='status';
  }else if(optionValue == 'Contractor'){
    column_name ='contractor';
  }else if(optionValue == 'Permit and Complaint Status'){
    column_name ='permit_and_complaint_status_url';
  }else if(optionValue == 'Master Use Permit'){
    column_name ='master_use_permit';
  }else if(optionValue == 'Latitude'){
    column_name ='latitude';
  }else if(optionValue == 'Longitude'){
    column_name ='longitude';
  }else if(optionValue == 'Location'){
    column_name ='location';
  }
  else if(optionValue == 'zillow1'){
    column_name ='zillow1';
  }
  else if(optionValue == 'zillow2'){
    column_name ='zillow2';
  }

  console.log("columnnnnn nameee", column_name,optionValue);
  return column_name
}

