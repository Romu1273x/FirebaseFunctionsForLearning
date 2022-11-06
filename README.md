# FirebaseFunctionsForLearning
Firebase functions 学習用

## Firebase 関連

### Firebase のデプロイ先プロジェクトについて

- プロジェクトの確認
```
firebase projects:list
```

- プロジェクトの変更
```
firebase use <Project ID>
```

### デプロイ方法

- Dockerの起動
```
docker compose up
docker-compose run -p 4000:4000 -p 5001:5001 -p 8080:8080 -p 9005:9005 firebase-cli-container /bin/bash
```

- firebaseにログイン
```
firebase login
```

- デプロイ
```
firebase deploy
```
※ [--only ~~]で一部のみデプロイ可能。

```
例）firebase deploy --only functions
firebase deploy --only firestore:rules
```

- Dockerの停止
```
docker-compose down
```
