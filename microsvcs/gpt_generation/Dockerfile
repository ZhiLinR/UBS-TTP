FROM node:18-alpine as build

WORKDIR /scenario-app/
COPY /app /scenario-app/
RUN npm install
CMD ["node", "app.js"]
EXPOSE 8200