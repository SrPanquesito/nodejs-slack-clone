const model = 'team';

export default {
    Query: {
        getAllTeams: (parent, args, { dataSources: { sequelizeModels } }) => {
            return sequelizeModels[model].findAll()
        },
    },
    Mutation: {
        createTeam: (parent, args, { dataSources: { sequelizeModels } }, info) => {
            return sequelizeModels[model].create(args)
        }
    }
}