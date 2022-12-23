export default `
type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
}

type Query {
    getAllTeams: [Team!]!
}

type Mutation {
    createTeam(name: String!): Boolean!
}
`;