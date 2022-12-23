function applyExtraSetup(sequelize) {
	const { channel, message, team, user } = sequelize.models;

	channel.belongsTo(team, { foreignKey: 'teamId' });
	channel.belongsToMany(user, { through: 'channel_member', foreignKey: 'channelId' })

	message.belongsTo(channel, { foreignKey: 'channelId' });
    message.belongsTo(user, { foreignKey: 'userId' });

	team.belongsToMany(user, { through: 'member', foreignKey: 'teamId' });
    team.belongsTo(user, { foreignKey: 'owner' });

	user.belongsToMany(team, { through: 'member', foreignKey: 'userId' });
	user.belongsToMany(channel, { through: 'channel_member', foreignKey: 'userId' })
}

module.exports = { applyExtraSetup };