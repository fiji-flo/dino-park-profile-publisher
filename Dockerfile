FROM node

WORKDIR /app

COPY package.json .
RUN npm install --production
COPY . .
CMD ["node", "-r", "esm", "index.js"]