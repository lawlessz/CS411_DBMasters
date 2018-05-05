import cgi 
import re 
import datetime 
import random 
import hmac 
import sys 
import os
import pymysql
import simplejson as json

def plotGraphData(inputParams):
    graphX= inputParams['column_name']
    graphY= inputParams['plotOption']
    aggregateOption = inputParams['aggregateOption']

    db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
    cursor = db.cursor() 
    if graphY =='count':
        cursor.execute("select " + graphX + ",count(*) from Permits group by " + graphX)
        data = cursor.fetchall()
        ret = {'result':data}
    return ret
    