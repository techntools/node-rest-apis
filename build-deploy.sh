#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit
fi

if [ -z "$1" ]; then
    echo "No SSH key"
    exit
fi

if [ -z "$2" ]; then
    echo "No user@hostname"
    exit
fi

server="$2"

if [ -f ./build.xz ]; then
  echo 'Removing previous build...'
  rm build.tar.xz
  echo
fi

echo 'Starting npm build...'
npm run build

echo 'Zipping the build...'
tar -cJf build.tar.xz dist/

echo

echo 'Sending over secure connection...'
scp -i $1 build.tar.xz package.json package-lock.json ".env.${NODE_ENV}" $server:~/

echo

echo "Making SSH connection..."
ssh -o "IdentitiesOnly=yes" -i $1 $server << ENDSSH

    mkdir -p node-rest-apis

    mv package.json package-lock.json ".env.${NODE_ENV}" node-rest-apis/
    tar -xf build.tar.xz -C node-rest-apis/

    rm build.tar.xz

    cd node-rest-apis/

    if [ "$3" == "ni" ]; then
      echo "Installing node modules...";
      npm install --only=production;
    fi

    echo "$4" | sudo -S whoami >> /dev/null

    echo;echo

    export $(grep -v '^#' ".env.${NODE_ENV}" | xargs -d '\n')

    pm2 stop all
    pm2 start dist/server.js

ENDSSH

rm build.tar.xz
