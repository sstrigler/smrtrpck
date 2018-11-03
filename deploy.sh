#!/bin/sh

echo "starting ...."
while [ 1 ]; do
  if [ -f travis ]; then
    echo "deploying"
    rm -f travis
    /usr/local/bin/docker-compose pull web
    /usr/local/bin/docker-compose up -d web
  fi
  sleep 1
done
