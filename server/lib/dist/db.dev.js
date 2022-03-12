"use strict";

var _require = require("uuid"),
    uuid = _require.v4;

var _require2 = require("mixme"),
    clone = _require2.clone,
    merge = _require2.merge;

var microtime = require("microtime");

var level = require("level");

var db = level(__dirname + "/../db");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

db.clear();
module.exports = {
  channels: {
    "delete": function _delete(id) {
      var original;
      return regeneratorRuntime.async(function _delete$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(id);
              _context.next = 3;
              return regeneratorRuntime.awrap(db.del("channels:".concat(id)));

            case 3:
              original = _context.sent;
              console.log("Successfully deleted.");

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    create: function create(channel) {
      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (channel.name) {
                _context2.next = 2;
                break;
              }

              throw Error("Invalid channel");

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(db.put("channels:".concat(channel.id), JSON.stringify(channel)));

            case 4:
              return _context2.abrupt("return", merge(channel, {
                id: channel.id
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    get: function get(id) {
      var data, channel;
      return regeneratorRuntime.async(function get$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (id) {
                _context3.next = 2;
                break;
              }

              throw Error("Invalid id");

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(db.get("channels:".concat(id)));

            case 4:
              data = _context3.sent;
              channel = JSON.parse(data);
              return _context3.abrupt("return", merge(channel, {
                id: id
              }));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    getByUser: function getByUser(user) {
      return regeneratorRuntime.async(function getByUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                var channels = [];
                db.createReadStream({
                  gt: "channels:",
                  lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1)
                }).on("data", function (_ref) {
                  var key = _ref.key,
                      value = _ref.value;
                  channel = JSON.parse(value);
                  channel.id = key.split(":")[1];
                  if (user.channelsList.findIndex(function (x) {
                    return x === channel.id;
                  }) !== -1) channels.push(channel);
                }).on("error", function (err) {
                  reject(err);
                }).on("end", function () {
                  resolve(channels);
                });
              }));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    list: function list() {
      return regeneratorRuntime.async(function list$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", new Promise(function (resolve, reject) {
                var channels = [];
                db.createReadStream({
                  gt: "channels:",
                  lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1)
                }).on("data", function (_ref2) {
                  var key = _ref2.key,
                      value = _ref2.value;
                  channel = JSON.parse(value);
                  channel.id = key.split(":")[1];
                  channels.push(channel);
                }).on("error", function (err) {
                  reject(err);
                }).on("end", function () {
                  resolve(channels);
                });
              }));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    update: function update(id, channel) {
      var original;
      return regeneratorRuntime.async(function update$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(db.get("channels:".concat(id)));

            case 2:
              original = _context6.sent;

              if (original) {
                _context6.next = 5;
                break;
              }

              throw Error("Unregistered channel id");

            case 5:
              _context6.next = 7;
              return regeneratorRuntime.awrap(db.del("channels:".concat(id)));

            case 7:
              _context6.next = 9;
              return regeneratorRuntime.awrap(db.put("channels:".concat(id), JSON.stringify(channel)));

            case 9:
              return _context6.abrupt("return", merge(channel, {
                id: channel.id
              }));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  },
  messages: {
    create: function create(channelId, message) {
      return regeneratorRuntime.async(function create$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (channelId) {
                _context7.next = 2;
                break;
              }

              throw Error("Invalid channel");

            case 2:
              if (message.author) {
                _context7.next = 4;
                break;
              }

              throw Error("Invalid message");

            case 4:
              if (message.content) {
                _context7.next = 6;
                break;
              }

              throw Error("Invalid message");

            case 6:
              _context7.next = 8;
              return regeneratorRuntime.awrap(db.put("messages:".concat(channelId, ":").concat(message.creation), JSON.stringify({
                author: message.author,
                content: message.content,
                creation: message.creation
              })));

            case 8:
              return _context7.abrupt("return", merge(message, {
                channelId: channelId,
                creation: message.creation
              }));

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    list: function list(channelId) {
      return regeneratorRuntime.async(function list$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise(function (resolve, reject) {
                var messages = [];
                db.createReadStream({
                  gt: "messages:".concat(channelId, ":"),
                  lte: "messages:".concat(channelId) + String.fromCharCode(":".charCodeAt(0) + 1)
                }).on("data", function (_ref3) {
                  var key = _ref3.key,
                      value = _ref3.value;
                  message = JSON.parse(value);
                  message.channelId = key.split(":")[1];
                  messages.push(message);
                }).on("error", function (err) {
                  reject(err);
                }).on("end", function () {
                  resolve(messages);
                });
              }));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  },
  users: {
    create: function create(user) {
      return regeneratorRuntime.async(function create$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (user.firstname) {
                _context9.next = 2;
                break;
              }

              throw Error("Invalid user");

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(db.put("users:".concat(user.id), JSON.stringify(user)));

            case 4:
              return _context9.abrupt("return", merge(user, {
                id: user.id
              }));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      });
    },
    get: function get(id) {
      var data, user;
      return regeneratorRuntime.async(function get$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (id) {
                _context10.next = 2;
                break;
              }

              throw Error("Invalid id");

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(db.get("users:".concat(id)));

            case 4:
              data = _context10.sent;
              user = JSON.parse(data);
              return _context10.abrupt("return", merge(user, {
                id: id
              }));

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      });
    },
    list: function list() {
      return regeneratorRuntime.async(function list$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", new Promise(function (resolve, reject) {
                var users = [];
                db.createReadStream({
                  gt: "users:",
                  lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1)
                }).on("data", function (_ref4) {
                  var key = _ref4.key,
                      value = _ref4.value;
                  user = JSON.parse(value);
                  user.id = key.split(":")[1];
                  users.push(user);
                }).on("error", function (err) {
                  reject(err);
                }).on("end", function () {
                  resolve(users);
                });
              }));

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      });
    },
    update: function update(id, user) {
      var original;
      return regeneratorRuntime.async(function update$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(db.get("users:".concat(id)));

            case 2:
              original = _context12.sent;

              if (original) {
                _context12.next = 5;
                break;
              }

              throw Error("Unregistered user id");

            case 5:
              _context12.next = 7;
              return regeneratorRuntime.awrap(db.del("users:".concat(id)));

            case 7:
              _context12.next = 9;
              return regeneratorRuntime.awrap(db.put("users:".concat(id), JSON.stringify(user)));

            case 9:
              return _context12.abrupt("return", merge(user, {
                id: user.id
              }));

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      });
    },
    "delete": function _delete(id, user) {
      var original = store.users[id];
      if (!original) throw Error("Unregistered user id");
      delete store.users[id];
    },
    login: function login(resp) {
      return new Promise(function (resolve, reject) {
        var users = [];
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1)
        }).on("data", function (_ref5) {
          var key = _ref5.key,
              value = _ref5.value;
          user = JSON.parse(value);
          user.id = key.split(":")[1];
          users.push(user);
        }).on("error", function (err) {
          reject(err);
        }).on("end", function () {
          var user = users.find(function (u) {
            return u.email === resp.email;
          });

          if (!user) {
            resolve({
              auth: false,
              message: "Could not find account"
            });
          }

          if (user && !bcrypt.compareSync(resp.password, user.password)) {
            resolve({
              auth: false,
              message: "Password is incorect."
            });
          }

          if (user && bcrypt.compareSync(resp.password, user.password)) {
            var id = user.id;
            var token = jwt.sign({
              id: id
            }, "jwtSecret", {
              expiresIn: 300
            });
            resolve({
              auth: true,
              token: token,
              user: user
            });
          }
        });
      });
    }
  },
  admin: {
    clear: function clear() {
      return regeneratorRuntime.async(function clear$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(db.clear());

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      });
    }
  }
};