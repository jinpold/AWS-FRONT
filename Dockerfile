# Stage 1: 빌드 환경
FROM node:18 AS builder

# 앱 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json만 먼저 복사하여 의존성 캐시 최적화
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install --legacy-peer-deps

# 앱 소스 코드 복사
COPY . .

# Next.js 빌드
RUN npm run build

# Stage 2: 실행 환경
FROM node:18-slim

WORKDIR /app

# 빌드된 결과물과 필요한 파일만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# 포트 노출
EXPOSE 3000

# Next.js 앱 실행
CMD ["npm", "start"]
