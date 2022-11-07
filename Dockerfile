FROM node:16 AS base

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./ tsconfig.json ./ .env ./
RUN npm install
COPY /dist /dist

#RUN npm ci

RUN npm run build

EXPOSE 8080
CMD [ "npm", "run","start:dev" ]
#CMD [ "node", "dist/main.js" ]

