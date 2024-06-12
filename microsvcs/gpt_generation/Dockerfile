FROM node:18-alpine as build

WORKDIR /scenario-app/
COPY /app /scenario-app/
RUN npm install
CMD ["node", "index.js"]
EXPOSE 8200