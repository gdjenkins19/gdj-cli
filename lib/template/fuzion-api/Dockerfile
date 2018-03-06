# specify the node base image with your desired version node:<version>
FROM node:9.2.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install
#RUN npm install pm2 -g

# Bundle app source
COPY . .

# ENV NODE_ENV=dev
# ENV FUZION_DB_TYPE=mysql
# ENV FUZION_DB_LIMIT=3
# ENV FUZION_DB_HOST=fuzion-mysql
# ENV FUZION_DB_USER=root
# ENV FUZION_DB_PASS=coffeetime
# ENV FUZION_DB_SCHEMA=fuzion-admin-api

#app default port
EXPOSE 3012

CMD [ "npm", "start" ]