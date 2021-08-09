FROM node

# RUN apt-get update && apt-get install -y \
#     libgbm1 \
#     libnss3 libcups2 \
#     libasound2 libatk1.0-0 libxrandr2 libxcomposite1 libxdamage1 libxfixes3 \
#     && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]
