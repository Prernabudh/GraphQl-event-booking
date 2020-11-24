const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Event{
            id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User{
          userId:ID!
          email: String!
          password: String
          createdEvents: [Event]
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput{
          email: String!
          password: String!
        }

        input query{
          id: String!
        }

        type RootQuery{
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput, userId: query): Event
            createUser(userInput: UserInput): User
        }

        schema{
            query: RootQuery
            mutation:RootMutation
        }
    `);
