#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb 

# Create instance of FieldStorage 
form = cgi.FieldStorage() 

# Get data from fields
# input textboxes 
applicant_name = form.getvalue('applicant_name')
contractor_name  = form.getvalue('contractor_name')

# dropdown
if form.getvalue('dropdown'):
   permitType = form.getvalue('dropdown')
else:
   permitType = "Not entered"

#text area
if form.getvalue('textcontent'):
   description = form.getvalue('textcontent')
else:
   description = "Not entered"

#date-picker ?

print "Content-type:text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Hello - Second CGI Program</title>"
print "</head>"
print "<body>"
print "<h2>Hello %s %s</h2>" % (applicant_name, contractor_name)
print "</body>"
print "</html>"


# code for inserting into db.