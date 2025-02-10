# Используем образ Node.js
FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Открываем порт для разработки (обычно 5173 для Vite или 3000 для React)
EXPOSE 5173 

# Запускаем dev-сервер
CMD ["npm", "run", "dev"]
