var mysql = require('mysql');
var util = require('util');
var fs = require('fs');

var data = fs.readFileSync('Building_Permits___Current.csv');
var line = data.toString().split('\n');

//Combine lines
for(var i=2; i<line.length; i++)
{
    if(line[i].substring(0, 1)=='(')
    {
        line[i-1]+=line[i];
        line[i]='?';
    }
}

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'ProjectDatabase'
  });


var mysql = ['delete from Permits;'];
function insertData()
{
    for(var i=1; i<5000; i++)
    {
        if(line[i]=='?') continue;

        var k = line[i].split(",");
        var k_1 = [];
        var aux ='';
        var combining = false;

        for(var j=0; j<k.length; j++)
        {
            if(k[j].substring(0, 1) == '"')
            {
                combining=true;
                aux=k[j];
            }
            else if(k[j].substring(k[j].length-1,k[j].length) == '"') //x.substring(x.length-1,x.length) aux.substring(0,1)=='"'
            {
                combining=false;
                aux+=','+k[j];
                //k_1.push(aux);
                k_1.push(replaceAll(aux, "'", "´"));
                aux='';                
            }
            else
            {
                if(combining)
                {
                    aux+=','+k[j];
                }
                else
                {
                    //k_1.push(k[j]);
                    k_1.push(replaceAll(k[j], "'", "´"));
                }
            }
        }
        
        //var sql = "insert into Permits values ("+k[0]+",'"+k[1]+"','"+k[2]+"','"+k[3]+"','"+k[4]+"','"+k[5]+"','"+k[6]+"','"+k[7]+"','"+k[8]+"','"+k[9]+"','"+k[10]+"','"+k[11]+"','"+k[12]+"','"+k[13]+"','"+k[14]+"','"+k[15]+"','"+k[16]+"','"+k[17]+"','"+k[18]+"','"+k[19]+"')";
        var sql = "insert into Permits values ("+k_1[0]+",'"+k_1[1]+"','"+k_1[2]+"','"+k_1[3]+"','"+k_1[4]+"','"+k_1[5]+"','"+k_1[6]+"','"+k_1[7]+"','"+k_1[8]+"','"+k_1[9]+"','"+k_1[10]+"','"+k_1[11]+"','"+k_1[12]+"','"+k_1[13]+"','"+k_1[14]+"','"+k_1[15]+"','"+k_1[16]+"','"+k_1[17]+"','"+k_1[18]+"','"+k_1[19]+"');";
        
        mysql.push(sql);
    }
}

insertData();


var count = mysql.length;
var errors=0;

con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");

  for(var i=0; i<mysql.length; i++)
  {
      (function(sql)
      {
          con.query(sql, function (err, result) {
            if (err) 
            {
                console.log("*********ERROR***********")
                errors++;
                console.log(sql);
                // throw err;
            }            
            console.log('Inserting...', --count, ' -- Errors:', errors);
          }); 
      })(mysql[i]);
      
  }
   
});


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};