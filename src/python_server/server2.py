import time
from http.server import BaseHTTPRequestHandler, HTTPServer

HOST_NAME = 'localhost'
PORT_NUMBER = 9000


class MyHandler(BaseHTTPRequestHandler):
    def do_HEAD(self):
        print("do head")
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        print("do get")
        self.respond({'status': 200})

    def do_OPTIONS(self):
        print("do options")
        self.respond({'status': 200})

    def handle_http(self, status_code, path):

        print("do handle http")
        #self.send_header('Access-Control-Allow-Origin', '*')
        #self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        #self.send_response(status_code)
        #self.send_header('Content-type', 'text/html')
        #self.end_headers()

        if path=='/allan':     
            self.send_header('Access-Control-Allow-Origin', '*')    
            self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
            self.send_response(status_code)
            self.send_header('Content-type', 'text/html')
            self.end_headers()  
            return bytes('Allan', 'UTF-8')
        elif path=='/reshma':
            self.send_response(status_code)
            self.send_header('Content-type', 'text/html')
            self.end_headers() 
            return bytes('Reshma', 'UTF-8')
        else:
            print("here!")
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            #self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_response(status_code)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            return bytes('asd', 'UTF-8')

        print ("path", path)

    def respond(self, opts):
        response = self.handle_http(opts['status'], self.path)
        self.wfile.write(response)

if __name__ == '__main__':
    server_class = HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    print(time.asctime(), 'Server Starts - %s:%s' % (HOST_NAME, PORT_NUMBER))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(), 'Server Stops - %s:%s' % (HOST_NAME, PORT_NUMBER))