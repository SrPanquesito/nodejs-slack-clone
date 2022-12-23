const model = 'user';

export default {
    Query: {
        getUser: (parent, { id }, { dataSources: { sequelizeModels } }) => {
            return sequelizeModels[model].findOne({ where: {id} })
        },
        getAllUsers: (parent, args, { dataSources: { sequelizeModels } }) => {
            return sequelizeModels[model].findAll()
        },
    },
    Mutation: {
        createUser: (parent, args, { dataSources: { sequelizeModels } }, info) => {
            return sequelizeModels[model].create(args)
        }
    }
}