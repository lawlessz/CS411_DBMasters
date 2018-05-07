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

#Files for sending emails
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# The Login module has all the function calls related to Login,register new user and forgot password pages.

#Method is used for auto-population of user Types on the Logina nd Register user pages
def getUserTypes():
    #db = pymysql.connect(host="localhost",port=3307,user="root",passwd="DBMasters<>123",db="ProjectDatabase")
    db = pymysql.connect("localhost","root","","ProjectDatabase")
    cursor = db.cursor()
    cursor.execute("select id_user_type,type_name from Access_level")
    data = cursor.fetchall()
    return {"result": data}

#Validation of user when logging in
def performLogin(data):
    print('Entering the Login method')
    print('I got:' + data['user'] + ' ' + data['password'] + ' ' + data['role'])
    db = pymysql.connect("localhost","root","","ProjectDatabase")
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
        print(result)
    else:
        print('Nothing found!!')
    ret = {'user': result}
    return ret

#New User registration. Checks if username/email already exists first
def registerUser(data):
    print('Entered the register user method')
    print('I got:' + data['email'] + ' ' + data['userName'] + ' ' + data['password'] + ' ' + data['role'])
    db = pymysql.connect("localhost","root","","ProjectDatabase")
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

#Updating db with new password if forgot password link is clicked. Also sends a mail to the user if update successful.
def resetPassword(data):
    ret = {}
    db = pymysql.connect("localhost","root","","ProjectDatabase")
    cursor = db.cursor()
    if '@' in data['user']:
        rows_count = cursor.execute("select email,username from Users where email='" + data['user'] + "'")
    else:
        rows_count = cursor.execute("select email,username from Users where username='" + data['user'] + "'")
    result = cursor.fetchone()
    #If user is found
    if rows_count >0:
        print('The result is' + str(result[0]) + str(result[1]))
        email = str(result[0])
        username = str(result[1])
        cursor1 = db.cursor()
        # Update the password for the user
        if '@' in data['user']:
            update_count = cursor1.execute("update Users set password='" + data['new_password'] +"' where email='" + data['user'] + "'")
            db.commit()
        else:
            update_count = cursor1.execute("update Users set password='" + data['new_password'] +"' where username='" + data['user'] + "'")
            db.commit()
        if update_count >0:
            # send mail to user
            sender = 'permits.applications@yahoo.com'
            receiver = email
            try:
                msg = MIMEMultipart()
                msg['From'] = sender
                msg['To'] = receiver
                msg['Subject'] = "Permit Application password" 
        
                body = "Hi " + str(result[1]) + ", \n Your password has been reset successfully."
                msg.attach(MIMEText(body, 'plain'))
                print('Starting email server')
                s = smtplib.SMTP('smtp.mail.yahoo.com:587')
                s.set_debuglevel(True)
                s.starttls()
                s.login("permits.applications@yahoo.com", "DBMasters#123")
                s.sendmail(sender, receiver, msg.as_string())
                print('Email sent to user')
                #Close the smtp server
                s.quit()
                ret ={"success" :"Password updated"}
            except:
                print('Error: unable to send email')
        else:
            print('Error occurred while updating password. Please try again.')
            ret ={"error" :"Update error.Please try again."}
    else:
        ret ={"error" :"User not found!!"}
    return ret



