"use strict";

module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
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
          msg: 'The name of the project must have between 3 and 255 characters'
        },
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    wordcount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: 0,
          msg: 'The starting wordcount must be a non-negative integer'
        },
        isInt: {
          msg: 'The starting wordcount must be a non-negative integer'
        },
        max: {
          args: 1000000000,
          msg: 'I\'m not judging, but can\'t believe you wrote over a billion words'
        }
      },
      set: function (v) {
        var old = this.getDataValue('wordcount');
        var diff = v - old;
        this.setDataValue('currentWordcount', this.getDataValue('currentWordcount') + diff);
        this.setDataValue('wordcount', v);
      }
    },
    targetwc: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: 0,
          msg: 'The target wordcount must be a non-negative integer'
        },
        isInt: {
          msg: 'The target wordcount must be a non-negative integer'
        },
        max: {
          args: 1000000000,
          msg: 'I\'m not judging, but can\'t believe you want to write over a billion words'
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    currentWordcount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'projects',
    classMethods: {
      associate: function (models) {
        Project.belongsTo(models.User, {
          as: 'owner',
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        Project.hasMany(models.Session, {
          as: 'sessions',
          foreignKey: 'projectId',
          onDelete: 'CASCADE'
        });
        Project.belongsToMany(models.Genre, {
          as: 'genres',
          through: 'projectsGenres',
          foreignKey: 'projectId'
        });
        Project.belongsToMany(models.Target, {
          as: 'targets',
          through: 'projectsTargets',
          foreignKey: 'projectId'
        });
        Project.beforeCreate(function (project) {
          project.currentWordcount = project.wordcount;
        });
      }
    },
    paranoid: true,
    validate: {
      uniqueName: function (next) {
        var self = this;
        Project.findOne({
          where: {
            ownerId: this.ownerId,
            name: this.name
          }
        }).then(function (p) {
          if (p && p.id !== this.id) {
            next(new Error('The project name must be unique'));
          } else {
            next();
          }
        }.bind(self)).catch(function (err) {
          next(err);
        });
      },
      targetOverStart: function (next) {
        if (parseInt(this.targetwc, 10) < parseInt(this.wordcount, 10)){
          return next(new Error('The target can\'t be less than the starting wordcount'));
        }
        next();
      } 
    }
  });

  return Project;
};