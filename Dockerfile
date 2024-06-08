FROM node:18-alpine
WORKDIR /authguard/
COPY public/ /authguard/public
COPY src/ /authguard/src
COPY package.json /authguard/
RUN npm install
CMD ["npm", "start"]

