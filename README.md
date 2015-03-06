# ThisissoonFM Socket Server

The ThisissoonFM socket server interfaces redis pub/sub events with web clients via sockets.

### Messages

The following socket messages are emitted:

 - `fm:player:play`
 - `fm:player:pause`
 - `fm:player:resume`
 - `fm:player:add`

In each case data from the redis message is passed through to the client.

## Developing ##

Ensure you have the following tools before you start developing this application:

* [NodeJS](http://nodejs.org/)
* [Git Flow](https://github.com/nvie/gitflow)

### Docker

The ThisissoonFM socket server is designed to be run under docker. This section will describe how to get the application up and running under docker.

#### Building the Docker Image

First step is to get docker installed on your system. You will need to use Boot2Docker on OSX/Windows and you can follow the basic instructions here but shout for help if you are not sure:

https://docs.docker.com/installation/#installation

Once you have docker running the first thing to do is build the docker image. In future we may host the latest image build on docker hub or similar.

    $ docker build -t soon/fm-socket .

#### Running the Application

    $ docker run --rm -it soon/fm-socket

The following configuration can be set via Environment Varibales:

- `SOCKET_PORT` Server port
- `SOCKET_LOG_LEVEL` Logging level - defaults to `info`, setting to `verbose` will log all emitted events

#### Running in Development

To run the application in development, we're using [fig](http://www.fig.sh/).

##### Fig (OSX)
Fig defines all the services that make up the app in fig.yml and runs them together in an isolated environment. Simply run:

    $ fig up

To attach your local code for development, un-comment the relevant application volumes in fig.yml.

Check it out at [http://localdocker:8080](http://localdocker:8080)
