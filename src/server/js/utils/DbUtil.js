var Mongodb = require('mongodb'),
	  db      = Mongodb.Db,
	  MongoClient = Mongodb.MongoClient,
	  Server = Mongodb.Server,
	  _      = require('lodash');

var dbclient = null;

var getDbClientInstance = function() {
  if (_.isEmpty(dbclient)) {
		console.log('db client is emtpy..Creating a new instance');
		dbclient = new MongoClient(new Server(config.database.host, config.database.port), {native_parser: true});
	}
	return dbclient;
};

/**
 *
 */
var insertDocument = function(dbname, collectionName, collectionObj) {
	var mongoclient = this.getDbClientInstance();
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db(dbname);
		db.collection(collectionName).insert(collectionObj, function(err, inserted) {
			if (!_.isEmpty(err)) {
				console.error('Insert failed ', err);
			}
		});
	});
};

var replaceDocument = function(dbname, criteriaObj, replacementObj) {
	var mongoclient = this.getDbClientInstance();
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db(dbname);
		db.collection(collectionName).update(criteriaObj, replacementObj, function(err, updated) {
			if (!_.isEmpty(err)) {
				console.error('Update failed ', err);
			}
		});
	});
};

/**
 *
 * @param dbname
 * @param criteriaObj   {_id:"123"}
 * @param replaceFieldsObj  {author:"Jessica"}
 */
var replaceDocumentFields = function(dbname, criteriaObj, replaceFieldsObj) {
	var mongoclient = this.getDbClientInstance();
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db(dbname);
		db.collection(collectionName).update(criteriaObj, {$set: replaceFieldsObj}, function(err, updated) {
			if (!_.isEmpty(err)) {
				console.error('Update failed ', err);
			}
		});
	});
};

module.exports = {
	getDbClientInstance: getDbClientInstance,
	insertDocument: insertDocument,
	replaceDocument: replaceDocument,
	replaceDocumentFields: replaceDocumentFields
};