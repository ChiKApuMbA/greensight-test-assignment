#!/bin/bash

# Копируем содержимое .env.example в .env в текущей директории
if [ -f .env.example ]; then
  cp .env.example .env
  echo ".env файл создан в текущей директории."
else
  echo ".env.example файл не найден в текущей директории."
fi

# Копируем содержимое .env.example в .env в директории frontend
if [ -f frontend/.env.example ]; then
  cp frontend/.env.example frontend/.env
  echo ".env файл создан в директории frontend."
else
  echo ".env.example файл не найден в директории frontend."
fi

# Запускаем docker-compose up с билдом
echo "Запускаем docker-compose up..."
docker-compose up --build -d

# Выводим адреса работающих приложений
echo "Приложения работают на следующих адресах:"

echo "backend работает на http://localhost:8000"

echo "frontend работает на http://localhost:5173"

