import cgi 
import re 
import datetime 
import random 
import hmac 
import sys 
import os
import pymysql
import simplejson as json

#Add a new Record to DB.
def createPermitRecord(inputParams):
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("insert into Permits(applicant_name,contractor,action_type,permit_type,category,work_type,address,application_date,description,value,status) values('"+inputParams['applicant_name']+"','"+inputParams['contractor']+"','"+inputParams['action_type']+"','"+inputParams['permit_type']+"','"+inputParams['category']+"','"+inputParams['work_type']+"','"+inputParams['address']+"','"+inputParams['application_date']+"','"+inputParams['description']+"','"+inputParams['value']+"','Permit Started')")
	db.commit()
	return {"result": "created"}

#Get all the permit data for tables
def get_permits():
	#db = pymysql.connect(host="localhost",port=3307,user="root",passwd="DBMasters<>123",db="ProjectDatabase")
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT * from Permits")
	data = cursor.fetchall()
	ret = {'permits':data}
	return ret

#To get the data of the record to be edited
def getDataforEditPermits(params):
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT * from Permits where permit_id="+str(params['permit_id']))
	data = cursor.fetchone()
	ret = {'data':data}
	return ret

#delete called from the tables page
def deletePermit(id_permit):
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("delete from Permits where permit_id="+str(id_permit))
	db.commit()
	return {"result": "something"}

#Edit call from tables page
def editPermitData(params):
	#db = pymysql.connect(host="localhost",port=3307,user="root",passwd="DBMasters<>123",db="ProjectDatabase")
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("update Permits set applicant_name='"+params['applicant_name'] +"', contractor='" + params['contractor'] +"', action_type='"+params['action_type'] +"', permit_type='"+params['permit_type'] +"', category='"+params['category'] +"', work_type='"+params['work_type'] +"', address='"+params['address'] +"', application_date='"+params['application_date'] +"', description='"+params['description'] +"', value='"+params['value'] +"' where permit_id=" +params['permit_id']) 
	db.commit()
	return {"result": "created"}
