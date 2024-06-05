FROM node:18-alpine

COPY app/build/ /scenario-app/
WORKDIR /scenario-app/
RUN npm install
CMD ["node", "app.js"]
EXPOSE 8200