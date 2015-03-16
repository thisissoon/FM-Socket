#
# ThisissoonFM Sockets
# Builds a docker image to run the node socket server for thisissoon.fm
#

FROM google/nodejs

# Install global dependencies
RUN npm install forever -g

# Install app dependencies
WORKDIR /fm-socket
ADD package.json /fm-socket/package.json
RUN npm install

# Bundle app source
ADD . /fm-socket

EXPOSE  8080
CMD ["npm", "start"]
