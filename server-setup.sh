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
    echo "No user@server"
    exit
fi

if [ -z "$3" ]; then
    echo "No sudo password"
    exit
fi

echo "Making SSH connection..."
ssh -o "IdentitiesOnly=yes" -i $1 $2 << ENDSSH

    echo "$3" | sudo -S whoami >> /dev/null

    echo;echo

    sudo apt-get update && sudo apt-get upgrade -y

    # Install Node
    curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
    sudo apt-get install nodejs -y

    sudo npm i -g pm2

    # Install MongoDB
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod

ENDSSH
