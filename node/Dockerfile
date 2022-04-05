FROM node:15 as builder

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y wget
RUN npm install

EXPOSE 3000


FROM node:15-alpine

ENV DOCKERIZE_VERSION v0.6.1

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app/

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

CMD ["node","index.js"]