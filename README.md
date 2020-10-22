# gfgbot
discord app for moderating a stupid server

# set up instructions

# 1) Get nodejs latest
Mac: 
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    sudo brew install nodejs npm
Arch linux:
    sudo pacmam -S nodejs npm

Debian:
    sudo apt-get nodejs npm

Fedora:
    sudo dnf install nodejs npm

Suse:
    sudo zypper install nodejs npm

Windows:
    ~~get an actual os lmaoooooooooo~~ look below
Other systems check https://nodejs.org/en/download/package-manager/ MAKE SURE TO GET NPM AS WELL

# 2) install dependencies
npm install to install dependencies
(didn't work? try sudo npm install)

# 3) make your .env file
This will be where your Discord API token among other things live.
Create and empty file with the name .env
inside .env:
TOKEN=yourdiscordapitoken

# Boom! Done! Now run ```npm start``` to start up the application!