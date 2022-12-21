const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const Channel = sequelize.define('channel', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		name: {
            allowNull: false,
			type: DataTypes.STRING,
		},
        public: {
			type: DataTypes.BOOLEAN,
		},
	});

	Channel.associate = (models) => {
		Channel.belongsTo(models.team, { foreignKey: 'teamId' });
	}

	return Channel
};