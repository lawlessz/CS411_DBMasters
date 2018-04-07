import cgitb; cgitb.enable()  ## This line enables CGI error reporting
from http.server import BaseHTTPRequestHandler, CGIHTTPServer

HOST_NAME = 'localhost'
PORT_NUMBER = 8080

server_class = HTTPServer

handler = CGIHTTPServer.CGIHTTPRequestHandler
httpd = server_class((HOST_NAME, PORT_NUMBER), handler)
#server_address = ("", 8080)
#This defaults to ['/cgi-bin', '/htbin'] and describes directories to treat as containing CGI scripts
#handler.cgi_directories = ["/cgi-bin"]
#httpd = server(server_address, handler)
print("Starting simple_httpd on port: " + str(httpd.server_port))
httpd.serve_forever()