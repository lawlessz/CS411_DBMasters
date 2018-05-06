
var mysql = require('mysql');

function testAPI(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseXML);
       }
    };
    xhttp.open("POST", "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz18mhay67uob_7dhgw&zpid=48749425", true);
    xhttp.setRequestHeader("Content-type", "text/xml"); 
    xhttp.send();
    /*
    parser = new DOMParser();
    xmlDoc = xhttp.responseXML;
    txt = "";
    x = xmlDoc.getElementsByTagName("response");
    for (i = 0; i < x.length; i++) {
      txt += x[i].childNodes[0].nodeValue + "<br>";
    }
    //document.getElementById("demo").innerHTML = txt;
    console.log(txt);
    */
   // var futureResult = xhttp.send();
    //futureResult.Wait(); //wait untill SomeAsyncCall has returned
    //var data = futureResult.GetData();
    console.log(xhttp.status);
    console.log(xhttp.readyState);
    //console.log(xhttp.responseXML.getElementsByTagName("zestimate"));
    console.log(data.responseXML);
    console.dirxml(xhttp.responseXML);
    console.dir(xhttp.responseXML);

        console.log(xhttp.responseXML);
    console.dirxml(xhttp.responseXML);
    console.dir(xhttp.responseXML);
    //console.log(xhttp.responseXML);

}