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

# The Login module has all the function calls related to Login,register new user and forgot password pages.

def getUserTypes():
    #db = pymysql.connect(host="localhost",port=3307,user="root",passwd="DBMasters<>123",db="ProjectDatabase")
    db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
    cursor = db.cursor()
    cursor.execute("select id_user_type,type_name from Access_level")
    data = cursor.fetchall()
    return {"result": data}

def performLogin(data):
    print('Entering the Login method')
    print('I got:' + data['user'] + ' ' +
          data['password'] + ' ' + data['role'])
    #db = pymysql.connect(host="localhost", port=3307, user="root",
    #                    passwd="DBMasters<>123", db="ProjectDatabase")
    db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
    cursor = db.cursor()
    # If user name or email has been passed
    if '@' in data['user']:
        i = cursor.execute(
            "select * from Users where email='" + data['user'] + "'")
    else:
        i = cursor.execute(
            "select * from Users where username='" + data['user'] + "'")
    result = cursor.fetchall()
    if i > 0:
       # Check if the inputted username and password match or not
        print(result)
    else:
        print('Nothing found!!')
    ret = {'user': result}
    return ret


def registerUser(data):
    print('Entered the register user method')
    print('I got:' + data['email'] + ' ' + data['userName'] +
          ' ' + data['password'] + ' ' + data['role'])
    #db = pymysql.connect(host="localhost", port=3307, user="root",passwd="DBMasters<>123", db="ProjectDatabase")
    db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
    cursor = db.cursor()
    # First check for duplicates insertion
    rows_count = cursor.execute("select username,email from Users where username='" + data['userName']+"' or email='" + data['email']+"'")
    # If record with username exists
    print('Row count is: ' + str(rows_count)) 
    ret={}
    if rows_count > 0:
        ret = {"error": "User already exists"}
    else:
        try:
            cursor1 = db.cursor()
            insert_count = cursor1.execute("insert into Users(username, email, password, id_user_type) values('" + data['userName'] + "','" + data['email'] + "','" + data['password'] + "','" + data['role'] + "')")
            db.commit()
            print('Insertion returned:' + str(insert_count))
            ret = {"result": str(insert_count)}
        except:
            print('Some exception occurred')
    return ret
    
