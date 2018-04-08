#!/usr/bin/env python

import cgi
import cgitb
cgitb.enable()

ret = ""

def print_header():
    global ret
    ret += """Content-type: text\n
    <!DOCTYPE html>
    <html>
    <body>"""

def print_close():
    global ret
    ret += """</body>
    </html>"""

def display_error():
    print_header()
    print ("<p>An Error occurred parsing the parameters passed to this script.</p>")
    print ("<p>Try something like:</p>")
    print ("<p><strong>http://localhost/SimpleCgi.py?param1=1&param2=2</strong></p>")
    print_close()

def main():
    global ret
    form = cgi.FieldStorage()
    #ret += "Content-type: text\n"
    ret+="""
    <!DOCTYPE html>
    <html>
    <body>"""
    ret += "david"
    #print_close()
    print (ret)

main()