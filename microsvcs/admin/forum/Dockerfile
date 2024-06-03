FROM node:18-alpine

COPY app/ /forum-msvc/
WORKDIR /forum-msvc/
RUN npm install
CMD ["node", "app.js"]
EXPOSE 3200