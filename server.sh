#!/bin/sh

echo "Run this only on local machine to create the server."
cd API
php -S 0.0.0.0:80
