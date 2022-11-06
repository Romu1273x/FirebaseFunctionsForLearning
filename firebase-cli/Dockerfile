# FROM: ベースイメージを指定
# 現在(2022/11/06)Firebaseでサポートされているバージョン14〜16
FROM node:16
# FROM node:16-alpine

# SHELL: デフォルトのシェルをオーバーライド
# 下記コマンドの意味 https://y-ni-shi.hatenablog.com/entry/2022/01/03/135000
# SHELL ["/bin/ash","-ouex","pipefail","-c"]

# WORKDIR: 作業ディレクトリを指定
WORKDIR /firebase/workdir

# Firebase toolsのインストール
# RUN npm install firebase-functions@latest firebase-admin@latest --save
RUN npm install -g firebase-tools

# ポート
# ENV HOST 0.0.0.0
# # Emulator Suite UI
# EXPOSE 4000
# # Firebase Hosting
# EXPOSE 5000
# # Clound Functions
# EXPOSE 5001
# # Cloud Firestore
# EXPOSE 8080
# # firebase login
# EXPOSE 9005
