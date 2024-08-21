FROM ubuntu:22.04

# Обновляем пакетный менеджер и устанавливаем Node.js и npm
RUN apt-get update && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# Копируем package.json и package-lock.json и устанавливаем зависимости
COPY ./server/package*.json ./
RUN npm install

# Копируем все файлы сервера
COPY ./server ./server

# Копируем все файлы фронтенда
COPY ./frontend/build ./build

# Порт
ENV PORT=8085
EXPOSE 8085

# Запускаем сервер
CMD ["node", "server/server.js"]