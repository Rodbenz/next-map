# Install dependencies only when needed
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY next.config.js ./next.config.js

# COPY pages ./pages
# COPY public ./public
# COPY styles ./styles

# RUN npm run build

# EXPOSE 3000

CMD ["npm", "run", "dev"]

