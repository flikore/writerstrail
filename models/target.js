"use strict";

var moment = require('moment');

function zeroTime(date) {
  return !date ? null : moment(date).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }).toDate();
}

module.exports = function (sequelize, DataTypes) {
  var Target = sequelize.define("Target", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: 'The name of the target must have between 3 and 255 characters'
        }
      }
    },
    notes: {
      type: DataTypes.TEXT
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      set: function (value) {
        this.setDataValue('start', zeroTime(value));
      }
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      set: function (value) {
        this.setDataValue('end', zeroTime(value));
      }
    },
    zoneOffset: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'User timezone offset in minutes'
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: 1,
          msg: 'The target count must be a positive integer'
        },
        isInt: {
          msg: 'The target count must be a positive integer'
        },
        max: {
          args: 1000000000,
          msg: 'I\'m not judging, but can\'t believe you want to write over a billion words'
        }
      }
    }
  }, {
    tableName: 'targets',
    classMethods: {
      associate: function (models) {
        Target.belongsTo(models.User, {
          as: 'owner',
          foreignKey: { name: 'ownerId', allowNull: false },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        Target.belongsToMany(models.Project, {
          as: 'projects',
          through: 'projectsTargets',
          foreignKey: { name: 'TargetId', allowNull: false },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    },
    indexes: [
      {
        name: 'targets_name',
        unique: true,
        fields: ['name', 'ownerId']
      }
    ],
    validate: {
      startBeforeEnd: function () {
        if (this.start && this.end && !(moment.utc(this.start).isBefore(this.end))) {
          throw new Error('The start date must be before the end date and both must be valid');
        }
      }
    }
  });

  return Target;
};