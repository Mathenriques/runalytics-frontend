ARG NODE_VERSION=20.11.1
ARG NPM_VERSION=10.2.4

FROM docker.io/node:${NODE_VERSION}

ARG NPM_VERSION
ENV NPM_VERSION ${NPM_VERSION}

RUN npm install --location=global npm@${NPM_VERSION}

WORKDIR /app

COPY . .
RUN npm install

RUN npm install @angular/cli -g

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
