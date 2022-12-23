const model = 'user';

export default {
    Query: {
        getUser: (parent, { id }, { sequelizeModels }) => {
            return sequelizeModels[model].findOne({ where: {id} })
        },
        getAllUsers: (parent, args, { sequelizeModels }) => {
            return sequelizeModels[model].findAll()
        },
    },
    Mutation: {
        createUser: (parent, args, { sequelizeModels }, info) => {
            return sequelizeModels[model].create(args)
        }
    }
}