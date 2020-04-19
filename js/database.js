// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: 'db/loginInfo.db', autoload: true });
dr = new Datastore({ filename: 'db/DigitalRecords.db', autoload: true });
users = new Datastore({ filename: 'db/user.db', autoload: true });

//////////////////////// *************************** User Data ************************************


exports.getUsers = function(fnc) {
  users.find({}, function(err, docs) {
    fnc(docs);
  });
}

exports.addUsers = function(name, pass, recovery) {
  var usradd = {
    "username": name,
    "password": pass,
    "recovery": recovery
  };
  users.insert(usradd, function(err, newDoc) {
    // Do nothing
  });
};

////// ******************************* loginInfo ******************************************************
exports.addDetail = function(name, username, password, url) {

  var detail = {
    "name": name,
    "username": username,
    "password": password,
    "url": url
  };
  db.insert(detail, function(err, newDoc) {
    // Do nothing
  });
};

exports.getDetail = function(fnc) {

  db.find({}, function(err, docs) {
    // Execute the parameter function
    fnc(docs);
  });
}

exports.deleteDetail = function(id) {

  db.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
}


////////////////////// ********************* DigitalRecords ********************

exports.addRecord = function(type, cat1, cat2, cat3, cat4, cat5) {

  var record = {
    "type": type,
    "cat1": cat1,
    "cat2": cat2,
    "cat3": cat3
  };
  dr.insert(record, function(err, newDoc) {
    // Do nothing
  });
};

exports.getRecord = function(fnc) {

  dr.find({}, function(err, docs) {
    // Execute the parameter function
    fnc(docs);
  });
}

exports.deleteRecord = function(id) {

  dr.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
}