from http.server import BaseHTTPRequestHandler, HTTPServer
import logging, pymysql

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        get_dealer(self)

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), post_data.decode('utf-8'))

        self._set_response()
        self.wfile.write("POST request for {}".format(self.path).encode('utf-8'))

def get_dealer(self):
    logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
    #get_data()
    self._set_response()
    self.wfile.write(("CS411 GET request for {}"+get_data()).format(self.path).encode('utf-8'))

def get_data():
    mystr = "<!DOCTYPE html><html><head><title>Stage 3</title><meta charset=\"UTF-8\"/><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><meta http-equiv=\"Content-Type:application/json; charset=UTF-8\" /></head><body align='center'><h1>Getting team name from database!</h1><br><br>"
    db = pymysql.connect("localhost","root","DBMasters<>123","ProjectDatabase")
    cursor = db.cursor()
    cursor.execute("SELECT firstname, lastname from team order by firstname asc")
    data = cursor.fetchall()
    mystr += "<table align='center' border=2><tr align='center'><th>First Name</th><th>Last Name</th></tr>"
    for row in data:
        mystr += "<tr align='center'><td>"+row[0]+ "</td><td> "+row[1]+"</td></tr>"

    mystr += "</table></body></html>"
    db.close()
    return mystr

     
def run(server_class=HTTPServer, handler_class=S, port=8080):
    logging.basicConfig(level=logging.INFO)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')

if __name__ == '__main__':
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
