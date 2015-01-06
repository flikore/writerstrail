"use strict";

module.exports = function (sequelize, DataTypes) {
	var Invitation = sequelize.define("Invitation", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		code: {
			type: DataTypes.STRING
		},
		amount: {
			type: DataTypes.INTEGER.UNSIGNED,
			defaultValue: 1
		}
	}, {
		classMethods: {}
	});

	return Invitation;
};