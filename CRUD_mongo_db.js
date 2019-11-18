
 var MongoClient = require('mongodb').MongoClient;
 var url ="mongodb+srv://luanpham:01667376890@cluster0-toeuz.gcp.mongodb.net/test?retryWrites=true&w=majority/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("top10", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [{ top: 1, name: "Quần tây nam",id:"A!1101",quanty:30,sum:10000},
    { top: 1, name: "Quần đùi nam",id:"A!1102",quanty:29,sum:99000},
    { top: 2, name: "Váy",id:"A!1106",quanty:20,sum:10000},
    { top: 3, name: "Yếm",id:"A!1109",quanty:19,sum:10000},
    { top: 4, name: "Quần jeans nam",id:"A!1Q01",quanty:16,sum:10000},
    { top: 5, name: "Áo thun",id:"A!1109",quanty:15,sum:10000},
    { top: 6, name: "Vớ",id:"A!1141",quanty:14,sum:10000},
    { top: 7, name: "Giày mọi",id:"A!1331",quanty:13,sum:10000},
    { top: 8, name: "Quần ống rộng",id:"A!4501",quanty:31,sum:10000}];
    dbo.collection("top10").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });

