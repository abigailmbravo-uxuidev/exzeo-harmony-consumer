FROM node:10 as dependencies
#RUN apk update && apk --no-cache add bash libc6-compat g++ make python

ARG NPM_TOKEN
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
WORKDIR /app

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app

# cleanup
RUN npm cache clean --force && \
 rm -f .npmrc

#################################

FROM node:10 as build
WORKDIR /app
COPY --from=dependencies /app /app
COPY .env /app/.env
RUN npm run build

FROM golang:alpine as server
WORKDIR /app
RUN apk add curl unzip ca-certificates
RUN curl -LO https://github.com/m3ng9i/ran/releases/download/v0.1.4/ran_linux_amd64.zip
RUN unzip ran_linux_amd64
RUN chmod 777 ran_linux_amd64
#COPY --from=build /app/build /app/build

CMD ["/app/ran_linux_amd64"]

