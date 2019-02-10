import sys
import os
import json
try:
    import http.client
except ImportError:
    sys.exit("""Try to execute this script with python3. module http.proxy is not available in python2""")


#######################
# Work in progress !!!!!!!!!!!!!!!!!!!!


exec(compile(open('auth0-variables.py').read()))

AUTH0TENANT="siemens-qa-bt-008.eu.auth0.com"
AUTH0CLIENTID="9y0R4skEFLpSnXxyh90QrtiNLv9uAKtf"
AUTH0CLIENTSECRET="tBQ3km4ykbXV8LLxZ4mn9BkKF381FFLHSyeCrymDZZ8PBT5dvCv8YcR2Eytb-CaW"
AUTH0APIENDPOINT="https://siemens-qa-bt-008.eu.auth0.com/api/v2/"




print("Creating a connection respecting the proxy.")
proxy = os.environ['HTTP_PROXY'].lower()
if proxy not in (None, ''):
    print("Found proxy " + proxy)

    if proxy.startswith("http://"):
        proxy = proxy[7:]
    if proxy.startswith("https://"):
        proxy = proxy[8:]

    print("Expect IP://PORT")
    splittedProxy = proxy.split(":")
    proxyHost = splittedProxy[0]
    proxyPort=splittedProxy[1]
    print("Proxy host " +proxyHost)
    print("Proxy port " +proxyPort)


    conn = http.client.HTTPSConnection(proxyHost, proxyPort,timeout=1)
    conn.set_tunnel(AUTH0TENANT)
else:
    print("no proxy found")
    conn = http.client.HTTPSConnection(AUTH0TENANT,timeout=1)




payload = '{{\"client_id\":\"{0}\",' + \
            '\"client_secret\":\"{1}\",' + \
            '\"audience\":\"{2}\",' + \
            '\"grant_type\":\"client_credentials\"}}'
payload = payload.format(AUTH0CLIENTID, AUTH0CLIENTSECRET, AUTH0APIENDPOINT)

headers = { 'content-type': "application/json" }

print("POST request.")
conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))

jsonData = json.loads(data)
accessToken = jsonData["access_token"]
expires_in = jsonData["expires_in"]
scope = jsonData["scope"]

print(accessToken)
print(expires_in)
print(scope)


# now list the clients
conn.request("GET", "/clients")

res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))