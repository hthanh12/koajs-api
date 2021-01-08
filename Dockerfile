FROM node:10.23-alpine
WORKDIR /app
EXPOSE 3000
CMD ["sh", "run-container.sh"]
