openssl genrsa -out host.key 3072
openssl req -new -x509 -key host.key -sha256 -out host.crt -days 3650 -config openssl.cnf