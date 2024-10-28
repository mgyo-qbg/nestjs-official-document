# Node.js의 LTS(Long Term Support) 버전을 기반으로 한 Alpine Linux 이미지를 사용
FROM node:lts-alpine

# /app 디렉토리를 작업 디렉토리로 설정
# 이 디렉토리에서 이후의 모든 명령어가 실행
WORKDIR /app

# 환경 변수 NODE_ENV를 development로 설정
# 이 변수는 애플리케이션이 개발 모드로 실행됨을 나타냄
ENV NODE_ENV development

# 현재 디렉토리의 package.json과 yarn.lock 파일을 컨테이너의 /app 디렉토리로 복사함
# 이 파일들은 의존성 설치에 필요함
COPY package.json yarn.lock ./

# Prisma 관련 파일들을 컨테이너의 /app/prisma 디렉토리로 복사함
 COPY prisma ./prisma/

# yarn 명령어를 사용하여 package.json에 정의된 의존성을 설치함
RUN yarn

# 현재 디렉토리의 모든 파일을 컨테이너의 /app 디렉토리로 복사함
# 이 단계에서 애플리케이션의 소스 코드와 기타 파일들이 복사됨
COPY . .

# 컨테이너가 3000 포트를 외부에 노출
EXPOSE 3000

# 컨테이너가 시작될 때 실행할 명령어를 정의
# 이 경우, 'yarn start' 명령어를 실행하여 애플리케이션을 시작
CMD [ "yarn", "start" ]