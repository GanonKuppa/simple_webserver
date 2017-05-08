# simple_webserver
nodejsで動く簡易WEBサーバ

デフォルトではpublicフォルダ内のファイルにアクセスが可能
app.js起動後, ブラウザのアドレスバーに

    "http://IPアドレス:3030/ファイル名"
と入力するとファイルにアクセス可能.

## 例

    http://IPアドレス:3030/test1.html
    http://IPアドレス:3030/test2.html
    http://IPアドレス:3030/              default.htmlが表示される

## コマンドメモ

### サーバを起動
    node app.js

### サーバをデーモン化
    forever start app.js
