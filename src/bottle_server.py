import bottle 
from bottle import static_file, route, request

import cgi 
import re 
import datetime 
import random 
import hmac 
import sys 
import os
import pymysql
import simplejson as json

path = os.path.abspath(__file__)
dir_path = os.path.dirname(path)
id_edit = 0

#servePages

@route('/<filepath:path>')
def server_static(filepath):
	return static_file(filepath, root=dir_path+'/view/')
    #return static_file(filepath, root='resources/')

@bottle.get('/') 
def present_signup():
	return bottle.redirect("/login.html") 


@bottle.get('/edit') 
def edit_page(): 
	if id_edit == 0:
		return bottle.redirect("/maps.html")
	return bottle.template("view/edit_application")


#ajax handlers

@bottle.post('/getPermits')
def get_permits():
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT id_permit, applicant_name, action_type, category, desecription, work_type from Permit")
	data = cursor.fetchall()
	ret = {'permits':data}
	print (id_edit)
	return ret

@bottle.post('/getPermitsWithFilter')
def get_permitsWithfilter():
	filter2 = request.json['filter'].lower()
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT id_permit, applicant_name, action_type, category, desecription, work_type from Permit where lower(category) like '%"+filter2+"%'")
	data = cursor.fetchall()
	ret = {'permits':data}
	print (id_edit)
	return ret

	
@bottle.post('/deletePermit')
def postResource():
	data = request.json
	id_permit = data['id_permit']
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("delete from Permit where id_permit="+str(id_permit))
	db.commit()
	return {"result": "something"}

@bottle.post('/editPermit')
def editResource():
	global id_edit
	print ("reached!")
	data = request.json
	id_edit = data['id_permit']
	print (id_edit)
	return {"result": "something"}

@bottle.post('/getPermitData')
def getDataResource():
	print ("getting Permit Data!")
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT id_permit, applicant_name, action_type, category, desecription, work_type from Permit where id_permit="+str(id_edit))
	data = cursor.fetchone()
	ret = {'data':data}
	return ret

@bottle.post('/createPermit')
def createResource():
	data = request.json['data']
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("insert into Permit(applicant_name, action_type, category, desecription, work_type) values ('"+data['applicant_name']+"', '"+data['action_type']+"', '"+data['category']+"', '"+data['description']+"', '"+data['work_type']+"')")
	db.commit()
	return {"result": "created"}

@bottle.post('/editData')
def editDataResource():
	data = request.json['data']
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("update Permit set applicant_name='"+data['applicant_name']+"', action_type='"+data['action_type']+"', category='"+data['category']+"', desecription='"+data['description']+"', work_type='"+data['work_type']+"' where id_permit="+str(id_edit))
	db.commit()
	return {"result": "created"}

	
bottle.debug(True) 
bottle.run(host='localhost', port=8080)