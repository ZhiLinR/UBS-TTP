FROM node:18-alpine
COPY app/ /scenario-app/

WORKDIR /scenario-app/
RUN npm install

CMD [ "npm", "run", "start" ]
EXPOSE 8200