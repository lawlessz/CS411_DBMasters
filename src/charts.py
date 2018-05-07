import cgi 
import re 
import datetime 
import random 
import hmac 
import sys 
import os
import pymysql
import simplejson as json
import permitsModule as permitsModule


def plotGraphData(inputParams, filter):
    graphX= inputParams['column_name']
    graphY= inputParams['plotOption']
    aggregateOption = inputParams['aggregateOption'] #max, min, avg

    db = pymysql.connect("localhost","root","","ProjectDatabase")
    cursor = db.cursor() 
    if graphY =='count' and graphX!='zillow1' and graphX!='zillow2':
        print("select " + graphX + ",count(*) as count from Permits "+filter+" group by " + graphX)
        cursor.execute("select " + graphX + ",count(*) as count from Permits "+filter+" group by " + graphX)        
        data = cursor.fetchall()
        ret = {'result':data}
    
    if graphY =='value' and graphX!='zillow1' and graphX!='zillow2':
        print("select "+ graphX+ "," + aggregateOption + "(" +"10"+ ") as count from Permits "+filter)
        cursor.execute("select "+ graphX+ "," + aggregateOption + "(" +"10"+ ") as count from Permits "+filter)
        data = cursor.fetchall()
        ret = {'result':data}

    if graphX=='zillow1':
        sql = "select 'MIN', min(zestimate) from zillow z, permits p "+filter+ " and z.permit_id=p.permit_id and successfull=1 "
        sql += " UNION select 'MAX', max(zestimate) from zillow z, permits p "+filter+ " and z.permit_id=p.permit_id and successfull=1 "
        sql += " UNION select 'AVG', AVG(zestimate) from zillow z, permits p "+filter+ " and z.permit_id=p.permit_id and successfull=1 "

        print(sql)
        cursor.execute(sql)
        data = cursor.fetchall()
        ret = {'result':data}

    if graphX=='zillow2':
        sql = "select 'MIN', min(last_sold_price) from zillow z, permits p "+filter+ " and z.permit_id=p.permit_id and successfull=1 "
        sql += " UNION select 'MAX', max(last_sold_price) from zillow z, permits p "+filter+ " and z.permit_id=p.permit_id and successfull=1 "
        sql += " UNION select 'AVG', AVG(last_sold_price) from zillow z, permits p "+filter+ " and z.permit_id=p.permit_id and successfull=1 "

        print(sql)
        cursor.execute(sql)
        data = cursor.fetchall()
        ret = {'result':data}
        

    return ret
    