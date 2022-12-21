function applyExtraSetup(sequelize) {
	const { channel, message, team, user } = sequelize.models;

	channel.belongsTo(team, { foreignKey: 'teamId' });

	message.belongsTo(channel, { foreignKey: 'channelId' });
    message.belongsTo(user, { foreignKey: 'userId' });

	team.belongsToMany(user, { through: 'member', foreignKey: 'teamId' });
    team.belongsTo(user, { foreignKey: 'owner' });

	user.belongsToMany(team, { through: 'member', foreignKey: 'userId' })
}

module.exports = { applyExtraSetup };