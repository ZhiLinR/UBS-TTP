FROM node:18-alpine

COPY app/ /scenario-app/
WORKDIR /scenario-app/
RUN npm install
CMD ["node", "app.js"]
EXPOSE 3100