FROM node:18-alpine

COPY app/ /user-msvc/
WORKDIR /user-msvc/
RUN npm install
CMD ["node", "app.js"]
EXPOSE 3100