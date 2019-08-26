FROM node:10-alpine

LABEL maintainer=Exzeo

RUN apk update && apk --no-cache add bash libc6-compat g++ make python

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

CMD ["npm", "run", "start"]

