module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There Was An Error While Executing This Command",
					ephemeral: true,
				});
			}
		} else if (interaction.isSelectMenu()) {
		} else if (interaction.isButton()) {
			const button = client.buttons.get(interaction.customId);
			if (!button)
				return await interaction.reply({
					content: "This Button Does Not Exist",
					ephemeral: true,
				});

			try {
				await button.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There Was An Error While Executing This Button",
					ephemeral: true,
				});
			}
		}
	},
};
