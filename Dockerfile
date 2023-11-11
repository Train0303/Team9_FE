# Build stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
ENV REACT_APP_API_URL=https://kc709aacd7d14a.user-app.krampoline.com \
    REACT_APP_NOTION_OAUTH_CLIENT_ID=4a7f422e-a150-4ad8-bb23-031a097f449f \
    REACT_APP_NOTION_AUTH_URL=https://api.notion.com/v1/oauth/authorize?client_id=4a7f422e-a150-4ad8-bb23-031a097f449f&response_type=code&owner=user&redirect_uri=https://kc709aacd7d14a.user-app.krampoline.com/notion/redirect \ 
    REACT_APP_GOOGLE_ID=100068937397-u2552r2432h5bqup23gm4fvrn5me1hat.apps.googleusercontent.com \
    REACT_APP_GOOGLE_TOKEN=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
WORKDIR /usr/src/app
COPY link-namu/ ./
RUN npm ci
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
