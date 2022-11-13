import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// firebaseの初期化
admin.initializeApp();
// firestoreのインスタンスを取得
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getBooks = functions.https.onRequest(async (request, response) => {
  try {
    // firestoreのインスタンスを取得
    const db = admin.firestore();

    // インスタンスからコレクションを取得
    const ref = await db.collection("books").get();
    response.send(ref.docs.map((book) => book.data()));
  } catch (e) {
    console.error(e);
    response.status(500).send(e);
  }
});

export const store = functions.https.onRequest(async (request, response) => {
  if (request.method !== "POST") {
    response.status(400).send("【不正】リクエストタイプが不正です。");
  }

  const body = request.body;

  try {
    const db = admin.firestore();
    await db.collection("books").add({body});
    response.send("Complete");
  } catch (e) {
    console.error(e);
    response.status(500).send(e);
  }
});

// https://qiita.com/aokHNaiab/items/eaa9ace619d4313b8c16
export const onCreateByBook =
functions.firestore.document("books/{isbn}")
    .onCreate(async (snapshot, context) => {
      const storedData = snapshot.data();
      const isbn = context.params.isbn;
      const title = storedData.body.title;
      const price = storedData.body.price;
      console.log(`【新着本追加】ISBN: ${isbn}, タイトル: ${title}, 価格: ${price}`);
    }
    );

export const onUpdateByBook =
 functions.firestore
     .document("books/{isbn}").onUpdate(async (change) => {
       const before = change.before.data();
       const after = change.after.data();
       console.log(`【変更前】: ${before.body.price}, [変更後]: ${after.body.price}`);
     }
     );

exports.onDeleteByBook =
functions.firestore
    .document("books/{isbn}").onDelete(async (snapshot, context) => {
      const data = snapshot.data();
      const isbn = context.params.isbn;
      const title = data.body.title;
      const price = data.body.price;
      console.log(`【削除】ISBN: ${isbn}, タイトル: ${title}, 価格: ${price}`);
    });


// お試し

// booksを作成
export const createBook =
functions.https.onRequest(async (request, response) => {
  const userId = "user01";
  const bookshelfId = "bookshelf01";
  // const bookDate = {
  //   "title": "title",
  //   "isbn": "isbn",
  //   "titleKana": "titleKana",
  //   "subTitle": "subTitle",
  //   "subTitleKana": "subTitleKana",
  //   "seriesName": "seriesName",
  //   "seriesNameKana": "seriesNameKana",
  //   "contents": "contents",
  //   "contentsKana": "contentsKana",
  //   "author": "author",
  //   "authorKana": "authorKana",
  //   "publisherName": "publisherName",
  //   "size": "size",
  //   "itemCaption": "itemCaption",
  //   "salesDate": "salesDate",
  //   "itemPrice": "itemPrice",
  //   "itemUrl": "itemUrl",
  //   "affiliateUrl": "affiliateUrl",
  //   "smallImageUrl": "smallImageUrl",
  //   "mediumImageUrl": "mediumImageUrl",
  //   "largeImageUrl": "largeImageUrl",
  //   "registeredDateTime": "registeredDateTime", // DateTime
  // };
  const userRef = db.collection("users");
  try {
    for (let i=0; i<10; i++) {
      const bookDate = {
        "title": "title" + i,
        "isbn": "isbn" + i,
        "titleKana": "titleKana" + i,
        "subTitle": "subTitle" + i,
        "subTitleKana": "subTitleKana" + i,
        "seriesName": "seriesName" + i,
        "seriesNameKana": "seriesNameKana" + i,
        "contents": "contents" + i,
        "contentsKana": "contentsKana" + i,
        "author": "author" + i,
        "authorKana": "authorKana" + i,
        "publisherName": "publisherName" + i,
        "size": "size" + i,
        "itemCaption": "itemCaption" + i,
        "salesDate": "salesDate" + i,
        "itemPrice": "itemPrice" + i,
        "itemUrl": "itemUrl" + i,
        "affiliateUrl": "affiliateUrl" + i,
        "smallImageUrl": "smallImageUrl" + i,
        "mediumImageUrl": "mediumImageUrl" + i,
        "largeImageUrl": "largeImageUrl" + i,
        "registeredDateTime": "registeredDateTime" + i, // DateTime
      };
      await userRef.doc(userId).collection("bookshelfs").doc(
          bookshelfId).collection("books").doc(bookDate.isbn).set(bookDate);
    }

    response.send("Complete");
  } catch (e) {
    console.error(e);
    response.status(500).send(e);
  }
});

