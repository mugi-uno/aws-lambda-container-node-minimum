FROM node:12-buster

RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY src/ ./src/
COPY fonts/ ./fonts/
COPY app.ts ./
RUN npm run build

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["app.handler"]
