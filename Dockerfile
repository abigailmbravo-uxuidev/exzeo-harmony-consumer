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

FROM golang as server
WORKDIR /app
RUN apt-get update && apt-get -y install curl unzip
RUN curl -LO https://github.com/m3ng9i/ran/releases/download/v0.1.4/ran_linux_amd64.zip && \
    unzip ran_linux_amd64 && \
    cp ran_linux_amd64 ran && \
    chmod 777 ran
#RUN chmod 777 ran_linux_amd64
COPY --from=build /app/build /app/build

CMD ["/app/ran -r /app/build -p 8181"]

