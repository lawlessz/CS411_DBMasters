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
import loginModule as loginMod
import permitsModule as permitsModule
import charts as charts
#Files for sending emails
import smtplib


path = os.path.abspath(__file__)
dir_path = os.path.dirname(path)

global filter
filter="where true"

#servePages

@route('/<filepath:path>')
def server_static(filepath):
	print (dir_path)
	return static_file(filepath, root=dir_path+'/view/')
    #return static_file(filepath, root='resources/')

@bottle.get('/') 
def present_signup():
	return bottle.redirect("login.html") 

@bottle.get('/edit') 
def edit_page(): 
	if id_edit == 0:
		return bottle.redirect("/maps.html")
	return bottle.template("view/edit_application")

#ajax handlers

@bottle.post('/getPermits')
def get_permits():
	global filter
	return permitsModule.get_permits(filter)

@bottle.post('/getPermitsWithFilter')
def get_permitsWithfilter():
	global filter
	print("getPermitsWithFilter")
	d = request.json
	filter2 = d['filter'].lower()
	filter1 = d['column'].lower()
	#input column = request.
	db = pymysql.connect("localhost","root","","ProjectDatabase")
	cursor = db.cursor()
	cursor.execute("SELECT * from Permits where "+filter1+" like '%"+filter2+"%'")
	filter = "where "+filter1+" like '%"+filter2+"%'"
	data = cursor.fetchall()
	ret = {'permits':data}
	return ret

	
@bottle.post('/deletePermit')
def deletePermit():
	data = request.json
	id_permit = data['id_permit']
	return permitsModule.deletePermit(id_permit)

@bottle.post('/getEditPermitData')
def getDataforEdit():
	print ("getting Permit Data!")
	params = request.json
	return permitsModule.getDataforEditPermits(params)

@bottle.post('/createPermit')
def createResource():
	data = request.json['data']
	return permitsModule.createPermitRecord(data)

@bottle.post('/editData')
def editPermitData():
	params = request.json['data']
	return permitsModule.editPermitData(params)

@bottle.post('/getEstimate')
def getEstimate():
	params = request.json
	print(params)
	return permitsModule.estimateTime(str(params['id_permit']))

@bottle.post('/getUserTypes')
def getUserTypes():
    return loginMod.getUserTypes()


@bottle.post('/loginAction')
def performLogin():
	global filter
	filter="where true"
	print('Navigating to login Mod - perform login!!')
	data = request.json
	# Navigating to loginModule.py
	return loginMod.performLogin(data)

@bottle.post('/registerAction')
def performRegistration():
	print('Navigating to login Mod - register!!')
	data = request.json
	# Navigating to loginModule.py
	return loginMod.registerUser(data)

@bottle.post('/forgotPassword')
def resetPassword():
    print('Navigating to reset Password')
    data = request.json
    return loginMod.resetPassword(data)


@bottle.post('/plotGraphData')
def getDataforGraph():
	global filter
	inputs=request.json['inputs']
	print(str(inputs))
	return charts.plotGraphData(inputs, filter)


bottle.debug(True) 
#application = bottle.default_app()
bottle.run(host='209.124.64.198', port=800)
#bottle.run(host='localhost', port=8080)
#bottle.run(host='localhost', port=8090)