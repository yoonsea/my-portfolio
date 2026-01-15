# 맥 서버 배포 가이드 (Next.js)

이 문서는 `/Users/yschoi/WORK/git/my-portfolio/my-app` 기준으로 작성되었습니다.

## 사전 준비
- Node.js LTS 설치
- npm 사용 기준
- 도메인 사용 시: DNS에서 서버 IP로 A 레코드 설정

## 1. 프로젝트 빌드
```
cd /Users/yschoi/WORK/git/my-portfolio/my-app
npm install
npm run build
```

## 2. 프로덕션 실행 (기본)
```
npm run start
```
기본 포트는 `3000`입니다.

## 3. PM2로 상시 실행 (권장)
```
npm install -g pm2
pm2 start npm --name my-portfolio -- start
pm2 save
```

부팅 시 자동 시작:
```
pm2 startup
```
출력되는 명령을 그대로 실행하세요.

## 4. Nginx 리버스 프록시 (권장)
### 설치
```
brew install nginx
```

### 설정 예시
Nginx 설정 파일에 아래 server 블록 추가:
```
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 시작/재시작
```
sudo nginx
sudo nginx -s reload
```

## 5. HTTPS 적용 (선택)
도메인이 있다면 Certbot으로 SSL을 적용할 수 있습니다.

## 6. 운영 체크리스트
- `npm run build` 성공 확인
- `npm run start`로 3000 포트 정상 응답 확인
- Nginx 80 포트 → 3000 포트 프록시 확인
- 도메인 연결 확인

## 참고
Supabase URL/키를 바꾸려면 `my-app/.env.local`에 아래를 추가하세요.
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
