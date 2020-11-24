const bcrypt = require("bcrypt");

const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  events: () => {
    return Event.findAll({ include: [{ model: User, as: "creator" }] })
      .then((events) => {
        return events.map((event) => {
          return {
            ...event.get({ plain: true }),
            date: new Date(event.get({ plain: true }).date).toISOString(),
          };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  users: () => {
    return User.findAll({
      include: [{ model: Event, as: "createdEvents" }],
    })
      .then((users) => {
        return users.map((user) => {
          return {
            ...user.get({ plain: true }),
          };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createEvent: (args) => {
    return Event.create({
      ...args.eventInput,
      date: new Date(args.eventInput.date),
    })
      .then(async (data) => {
        const user = await User.findOne({
          where: { userId: args.userId.id },
        });
        await data.setCreator(user);
        await user.addCreatedEvents(data);
        return {
          ...data.get({ plain: true }),
          date: new Date(data.get({ plain: true }).date).toISOString(),
        };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createUser: (args) => {
    return bcrypt
      .hash(args.userInput.password, 12)
      .then((hashedPassword) => {
        return User.create({
          ...args.userInput,
          password: hashedPassword,
        })
          .then((user) => {
            return user.get({ plain: true });
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  },
};
