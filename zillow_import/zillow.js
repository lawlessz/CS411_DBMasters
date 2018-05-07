
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
    //var addresstest = "2114 Bigelow Ave";
    //testAPI2(addresstest);
  if (err) throw err;
    var limit = 3000;
    var offset = 9000; 
    for(var i = 0; i < limit; i++){
        var offset2 = offset+i;
    //con.query("SELECT address FROM Permits LIMIT 1 OFFSET '" + offset2 + "'", function (err, result, fields) {
        var x2 = "SELECT address, permit_id FROM Permits ORDER BY permit_id LIMIT 1 OFFSET " + offset2;
        console.log(x2);

        con.query(x2, function (err, result, fields) {
        //console.log(result);
        //console.log(result[0].address);

        testAPI2(result[0].address, function(j) {

        var p = result[0].permit_id;
        //console.log(p);

        //tax_assessment,year_built,lot_size_sq_ft,fin
        //console.log(typeof(j);
/*
        console.log("here777777777777777777777");
                console.log(j["SearchResults:searchresults"]);
        console.log(j["SearchResults:searchresults"].response[0]);
        console.log(j["SearchResults:searchresults"].response[0].results[0]);
        console.log(j["SearchResults:searchresults"].response[0].results[0].result[0]);
                console.log(j["SearchResults:searchresults"].response[0].results[0].result[0]);
                        console.log("here777777777777777777777");
                        */
        if(typeof(j["SearchResults:searchresults"].response) != "undefined" && typeof(j["SearchResults:searchresults"].response[0].results[0].result) !== "undefined") {
        var tax_assessment = j["SearchResults:searchresults"].response[0].results[0].result[0].taxAssessment;
        //console.log(tax_assessment);
        
        if(j["SearchResults:searchresults"].response[0].results[0].result[0].yearBuilt != "undefined" ) {
        var year_built = j["SearchResults:searchresults"].response[0].results[0].result[0].yearBuilt;
    } else { var year_built = 0}
        
    var year_built = 0;
        if(j["SearchResults:searchresults"].response[0].results[0].result[0].lotSizeSqFt != "undefined"){


        var lot_size_sq_ft = j["SearchResults:searchresults"].response[0].results[0].result[0].lotSizeSqFt;
    } else { var lot_size_sq_ft = 0}
    if(j["SearchResults:searchresults"].response[0].results[0].result[0].finishedSqFt != "undefined" ){
        var finished_sq_ft = j["SearchResults:searchresults"].response[0].results[0].result[0].finishedSqFt;
    } else{var finished_sq_ft = 0;}
    if(j["SearchResults:searchresults"].response[0].results[0].result[0].bathrooms != "undefined"){
        var bathrooms = j["SearchResults:searchresults"].response[0].results[0].result[0].bathrooms;
    } else{ var bathrooms = 0;}
    if(j["SearchResults:searchresults"].response[0].results[0].result[0].bedrooms) {
         var bedrooms = j["SearchResults:searchresults"].response[0].results[0].result[0].bedrooms;
     } else{ var bedrooms = 0}
       
            if(typeof(j["SearchResults:searchresults"].response[0].results[0].result[0].lastSoldPrice) != "undefined") {
                var last_sold_price = j["SearchResults:searchresults"].response[0].results[0].result[0].lastSoldPrice[0]._;
            } else { var lastSoldPrice = 0;
                //console.log(year _built,lot_size_sq_ft,finished_sq_ft,bathrooms,bedrooms,last_sold_price);
            }
             if(typeof(j["SearchResults:searchresults"].response[0].results[0].result[0].zestimate) != "undefined") {
                var zestimate = j["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._;
                //console.log(zestimate);
                var value_change = j["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].valueChange[0]._;
                //console.log(value_change);
            } else {var zestimate =0; var value_change = 0; }
        var successfull = 1;
            

        //console.log(tax_assessment);
        var q = "UPDATE zillow2 SET tax_assessment = '" + tax_assessment
        + "', year_built = '" + year_built + "', lot_size_sq_ft = '" + lot_size_sq_ft + "', finished_sq_ft = '"
        + finished_sq_ft + "', bathrooms = '" + bathrooms + "', bedrooms = '" + bedrooms + 
        "', last_sold_price = '" + last_sold_price + "', zestimate = '" + zestimate + "', value_change = '" + value_change
        + "', successfull = " + successfull + " WHERE permit_id = " + p;
            
        //var sql = "UPDATE zillow SET tax_assessment =
        
        con.query(q, function (err, result) {
        if (err) throw err;
            //console.log(result.affectedRows + " record(s) updated");
        });
    }


        //= 'Canyon 123' WHERE address = 'Valley ;

    if (err) throw err;
    //console.log(result);
})
  });

}
});

function updateRow(){

    var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";


}


function testAPI2(address, callback){
        var parseString = require('xml2js').parseString;
        var addr2 = address.replace(/ /g, "+");
        //console.log(addr2);
        var id = 'X1-ZWz18may2l5hjf_1wtus';
        //console.log (id);
        var send = 'https://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=' + id + '&address=' + addr2 + '&citystatezip=Seattle%2C+WA';
        //console.log(send);
        //console.log('https://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18mhay67uob_7dhgw&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA');


        https.get(send, (resp) => {
          let data = '';
         
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
         
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            //console.log(data);
            //convert.xmlFileToJSON(data).then(json => {
            //   console.log(json);
            //});

            parseString(data, function (err, result) {
                //console.log("THIS^");
                     //console.log(JSON.stringify(result));
                     //console.log(err);
                     callback(result);
                     
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