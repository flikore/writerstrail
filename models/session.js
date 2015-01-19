"use strict";

module.exports = function (sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 255],
          msg: 'The summary must have at most 255 characters'
        }
      }
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Duration of session in seconds'
    },
    pausedTime: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: 'Paused time of session in seconds'
    },
    wordcount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'The written wordcount must be a positive integer'
        },
        isInt: {
          msg: 'The written wordcount must be a positive integer'
        },
        max: {
          args: 1000000000,
          msg: 'I\'m not judging, but can\'t believe you wrote over a billion words'
        }
      }
    },
    isCountdown: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'writing_sessions',
    classMethods: {
      associate: function (models) {
        Session.belongsTo(models.Project, {
          as: 'Project',
          foreignKey: 'project_id',
          onDelete: 'CASCADE'
        });
      }
    },
    indexes: [
      {
        name: 'start',
        fields: ['start']
      }
    ]
  });

  return Session;
};
