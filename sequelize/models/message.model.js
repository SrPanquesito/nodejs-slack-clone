const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const Message = sequelize.define('message', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		text: {
			type: DataTypes.STRING,
		},
	});

	Message.associate = (models) => {
		Message.belongsTo(models.channel, { foreignKey: 'channelId' });
        Message.belongsTo(models.user, { foreignKey: 'userId' });
	}

	return Message
};