
var mysql = require('mysql');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var parseString = require('xml2js').parseString;
//var parser = require('xml2json');



var convert = require('xml-to-json-promise');

const https = require('https');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DBMasters<>123",
  database : "ProjectDatabase"
});

/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
con.connect(function(err) {
    testAPI2();
  if (err) throw err;
  con.query("SELECT address FROM Permits", function (err, result, fields) {
    console.log(result[1000].Field);
    if (err) throw err;
    console.log(result);
  });
});



function testAPI2(){
        
        https.get('https://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18mhay67uob_7dhgw&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA', (resp) => {
          let data = '';
         
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
         
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            //console.log(data);
            convert.xmlFileToJSON(data).then(json => {
                console.log(json);
            });
            //var json = parser.toXml(data);
            //console.log("input -> %s", data)
            //console.log(json);
            //console.log(JSON.parse(data).explanation);
            //console.log(JSON.parse(data).explanation);
          });
         
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

}
function testAPI(){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.status);
        console.log(xhttp.readyState);
        console.log(xhttp.responseXML);
       }
    };
    
    //xhttp.open("POST", "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz18mhay67uob_7dhgw&zpid=48749425", true);
    xhttp.open("POST", "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18mhay67uob_7dhgw&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA", true);
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


    //console.log(xmlToJson(xhttp.responseXML));



   // var futureResult = xhttp.send();
    //futureResult.Wait(); //wait untill SomeAsyncCall has returned
    //var data = futureResult.GetData();
    /*
    console.log(xhttp.status);
    console.log(xhttp.readyState);
    console.log(xhttp.responseXML.getElementsByTagName("zestimate"));
    console.log(data.responseXML);
    console.dirxml(xhttp.responseXML);
    console.dir(xhttp.responseXML);

    console.log(xhttp.responseXML);
    console.dirxml(xhttp.responseXML);
    //console.dir(xhttp.responseXML);
    */

}


function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};