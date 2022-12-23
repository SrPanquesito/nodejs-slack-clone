export default `
type User {
    id: Int!
    username: String!
    email: String!
    createdAt: Int!
    teams: [Team!]!
}

type Query {
    getAllUsers(): [User!]!
    getUser(id: Int!): User!
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
}
`