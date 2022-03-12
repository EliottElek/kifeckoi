"use strict";

var db = require("./db");

var express = require("express");

var cors = require("cors");

var app = express();
app.use(require("body-parser").json());
app.use(cors());

var jwt = require("jsonwebtoken");

app.get("/", function (req, res) {
  res.send(["Server-side chat application."].join(""));
}); //verifyJWT

var verifyJWT = function verifyJWT(req, res) {
  var token = req.headers["x-access-token"];

  if (!token) {
    res.send("Token needed.");
  } else {
    jwt.verify(token, "jwtSecret", function (err, decoded) {
      if (err) {
        res.json({
          auth: false,
          message: "Authentication failed."
        });
      } else {
        res.json({
          auth: true,
          message: "You are authenticated."
        });
      }
    });
  }
}; // Channels


app.get("/channels", function _callee(req, res) {
  var channels;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.channels.list());

        case 2:
          channels = _context.sent;
          res.json(channels);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/channels", function _callee2(req, res) {
  var channel;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.channels.create(req.body));

        case 2:
          channel = _context2.sent;
          res.status(201).json(channel);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post("/channels/:id/delete", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.channels["delete"](req.params.id));

        case 2:
          res.status(201).json({
            message: "Channel successfully deleted."
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get("/channels/:id", function _callee4(req, res) {
  var channel;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.channels.get(req.params.id));

        case 2:
          channel = _context4.sent;
          res.json(channel);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post("/channels/find/", function _callee5(req, res) {
  var channel;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(db.channels.getByUser(req.body.user));

        case 2:
          channel = _context5.sent;
          res.json(channel);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.put("/channels/:id", function _callee6(req, res) {
  var channel;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(db.channels.update(req.params.id, req.body.channel));

        case 2:
          channel = _context6.sent;
          res.json(channel);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // Messages

app.get("/channels/:id/messages", function _callee7(req, res) {
  var messages;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(db.messages.list(req.params.id));

        case 2:
          messages = _context7.sent;
          res.json(messages);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.post("/channels/:id/messages", function _callee8(req, res) {
  var message;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(db.messages.create(req.params.id, req.body));

        case 2:
          message = _context8.sent;
          res.status(201).json(message);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}); // Users

app.get("/users", function _callee9(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(db.users.list());

        case 2:
          users = _context9.sent;
          res.json(users);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.post("/users", function _callee10(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(db.users.create(req.body));

        case 2:
          user = _context10.sent;
          res.status(201).json(user);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get("/users/:id", function _callee11(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(db.users.get(req.params.id));

        case 2:
          user = _context11.sent;
          res.json(user);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.put("/users/:id", function _callee12(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(db.users.update(req.params.id, req.body.user));

        case 2:
          user = _context12.sent;
          console.log(req.body);
          res.json(user);

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
}); //login

app.post("/login", function _callee13(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(db.users.login(req.body));

        case 2:
          response = _context13.sent;
          res.json(response);

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //authenticated

app.get("/authenticated", verifyJWT, function _callee14(req, res) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          res.json({
            auth: true,
            message: "You are authenticated."
          });

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
});
module.exports = app;