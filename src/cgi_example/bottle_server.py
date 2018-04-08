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

#servePages

@route('/<filepath:path>')
def server_static(filepath):
	return static_file(filepath, root=dir_path+'/')
    #return static_file(filepath, root='resources/')

@bottle.get('/') 
def present_signup(): 
	return bottle.redirect("/login") 

@bottle.get('/login') 
def login_page(): 
	return bottle.template("login")

@bottle.post('/login') 
def login_page_post(): 
	return bottle.redirect("/login") 


#ajax handlers

@bottle.post('/signup') 
def process_signup(): 
	return {"value":123}


@bottle.post('/getPermits')
def get_permits():
	db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT id_permit, applicant_name, action_type, category, desecription, work_type from Permit")
	data = cursor.fetchall()
	ret = {'permits':data}
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
	
bottle.debug(True) 
bottle.run(host='localhost', port=8080)