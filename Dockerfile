# Stage 1: Build the NestJS application
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY package.json package-lock.json ./
RUN npm install

COPY . .
COPY packages/api ./
RUN npm run build --prefix packages/api

# Stage 2: Create the production image
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/packages/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
