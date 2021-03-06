"use strict";

var _ = require('lodash'),
  quote = function (string) {
    return "'" + string + "'";
  };

module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      verifiedEmail: {
        type: DataTypes.STRING,
        comment: 'Last email that was verified'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'moderator', 'admin', 'superadmin'],
        defaultValue: 'user',
        allowNull: false
      },
      lastAccess: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      invitationCode: {
        type: DataTypes.STRING
      },
      facebookId: {
        type: DataTypes.STRING
      },
      facebookToken: {
        type: DataTypes.STRING
      },
      facebookEmail: {
        type: DataTypes.STRING
      },
      facebookName: {
        type: DataTypes.STRING
      },
      googleId: {
        type: DataTypes.STRING
      },
      googleToken: {
        type: DataTypes.STRING
      },
      googleEmail: {
        type: DataTypes.STRING
      },
      googleName: {
        type: DataTypes.STRING
      },
      linkedinId: {
        type: DataTypes.STRING
      },
      linkedinToken: {
        type: DataTypes.STRING
      },
      linkedinEmail: {
        type: DataTypes.STRING
      },
      linkedinName: {
        type: DataTypes.STRING
      },
      wordpressId: {
        type: DataTypes.STRING
      },
      wordpressToken: {
        type: DataTypes.STRING
      },
      wordpressEmail: {
        type: DataTypes.STRING
      },
      wordpressName: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      charset: 'utf8'
    }).then(function () {
      return migration.addIndex('users', ['name'], { indexName: 'name' });
    }).then(function () {
      return migration.addIndex('users', ['email'], { indexName: 'email' });
    }).then(function () {
      return migration.addIndex('users', ['deletedAt'], {
        indexName: 'deletedAt'
      });
    }).then(function () {
      return migration.createTable('invitations', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        amount: {
          type: DataTypes.INTEGER.UNSIGNED,
          defaultValue: 1
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        }
      },
      {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('invitations', ['code'], { indexName: 'code' });
    }).then(function () {
      return migration.createTable('genres', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('genres', ['name', 'ownerId'], {
        indexName: 'name',
        indicesType: 'UNIQUE'
      });
    }).then(function () {
      return migration.createTable('projects', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT
        },
        wordcount: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0
        },
        targetwc: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0
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
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('projects', ['name', 'ownerId'], {
        indexName: 'name'
      });
    }).then(function () {
      return migration.addIndex('projects', ['deletedAt'], {
        indexName: 'deletedAt'
      });
    }).then(function () {
      return migration.createTable('projectsGenres', {
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'projects',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: 'PRIMARY'
        },
        genreId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'genres',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: 'PRIMARY'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.createTable('writingSessions', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        summary: {
          type: DataTypes.STRING,
          allowNull: true
        },
        start: {
          type: DataTypes.DATE,
          allowNull: false
        },
        zoneOffset: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'User timezone offset in minutes'
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
          allowNull: false
        },
        isCountdown: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        notes: {
          type: DataTypes.TEXT
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'projects',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        deletedAt: {
          type: DataTypes.DATE
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('writingSessions', ['start'], {
        indexName: 'start'
      });
    }).then(function () {
      return migration.addIndex('writingSessions', ['deletedAt'], {
        indexName: 'deletedAt'
      });
    }).then(function () {
      return migration.createTable('targets', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        notes: {
          type: DataTypes.TEXT
        },
        start: {
          type: DataTypes.DATE,
          allowNull: false
        },
        end: {
          type: DataTypes.DATE,
          allowNull: false
        },
        zoneOffset: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'User timezone offset in minutes'
        },
        wordcount: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('targets', ['name', 'ownerId'], {
        indexName: 'name',
        indicesType: 'UNIQUE'
      });
    }).then(function () {
      return migration.createTable('projectsTargets', {
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'projects',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: 'PRIMARY'
        },
        targetId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'targets',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: 'PRIMARY'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.createTable('settings', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        dateFormat: {
          type: DataTypes.ENUM,
          values: [
            'YYYY-MM-DD',
            'YYYY/MM/DD',
            'DD-MM-YYYY',
            'DD/MM/YYYY',
            'MM-DD-YYYY',
            'MM/DD/YYYY'
          ],
          defaultValue: 'YYYY-MM-DD',
          allowNull: false
        },
        timeFormat: {
          type: DataTypes.ENUM,
          values: [
            'H:mm:ss',
            'HH:mm:ss',
            'h:mm:ss A',
            'hh:mm:ss A',
            'h:mm:ss a',
            'hh:mm:ss a'
          ],
          defaultValue: 'HH:mm:ss',
          allowNull: false
        },        
        chartType: {
          type: DataTypes.ENUM,
          values: [
            'cumulative',
            'daily'
          ],
          defaultValue: 'cumulative',
          allowNull: false
        },
        showRemaining: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        showPondered: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        showTour: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8',
        collate: 'utf8_bin'
      });
    }).then(function () {
      return migration.createTable('tokens', {
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        expire: {
          type: DataTypes.DATE,
          allowNull: false
        },
        data: {
          type: DataTypes.STRING,
          allowNull: true
        },
        type: {
          type: DataTypes.ENUM,
          values: ['password', 'email'],
          allowNull: false,
          defaultValue: 'email'
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8',
        collate: 'utf8_bin'
      });
    }).then(function () {
      return migration.createTable('periods', {
        name: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false
        },
        start: {
          type: 'TIME',
          allowNull: false
        },
        end: {
          type: 'TIME',
          allowNull: false
        }
      }, {
        charset: 'utf8',
        collate: 'utf8_bin'
      });
    }).then(function () {
      var periods = [
        { name: 'early morning',   start: '05:00:00', end: '08:59:59'},
        { name: 'late morning',    start: '09:00:00', end: '11:59:59'},
        { name: 'early afternoon', start: '12:00:00', end: '14:59:59'},
        { name: 'late afternoon',  start: '15:00:00', end: '16:59:59'},
        { name: 'evening',         start: '17:00:00', end: '20:59:59'},
        { name: 'night',           start: '21:00:00', end: '04:59:59'}
      ],
        inserts = _.reduce(periods, function (acc, per) {
          acc.push([quote(per.name), quote(per.start), quote(per.end)].join(','));
          return acc;
        }, []).join('), (');
      var query = 'INSERT INTO `periods` (`name`,`start`,`end`) VALUES (' + inserts + ');';
      return migration.sequelize.query(query);
    }).then(function () {
      return migration.sequelize.query('CREATE ALGORITHM = MERGE VIEW `periodPerformance` AS select `p`.`ownerId` AS `ownerID`,avg((`s`.`wordcount` / (`s`.`duration` / 60))) AS `performance`,`t`.`name` AS `period`,`t`.`start` AS `start`,`t`.`end` AS `end` from ((`writingSessions` `s` join `projects` `p` on((`p`.`id` = `s`.`projectId`))) join `periods` `t` on((case when (`t`.`start` < `t`.`end`) then (cast(`s`.`start` as time) between `t`.`start` and `t`.`end`) else ((cast(`s`.`start` as time) >= `t`.`start`) or (cast(`s`.`start` as time) <= `t`.`end`)) end))) group by `p`.`ownerId`,`t`.`name` order by avg((`s`.`wordcount` / (`s`.`duration` / 60))) desc;');
    }).then(function () {
      return migration.sequelize.query('CREATE ALGORITHM = MERGE VIEW `sessionPerformance` AS SELECT `p`.`ownerId` AS `ownerId`, AVG(s.wordcount / (s.duration / 60)) AS `performance`, CASE WHEN `isCountdown` = 0 THEN \'forward\' ELSE \'countdown\' END AS `direction`, ROUND(`s`.`duration` / 60) AS `minuteDuration` FROM `writingSessions` `s` INNER JOIN `projects` `p` ON `p`.`id` = `s`.`projectId` GROUP BY `ownerId`, `minuteDuration`, `isCountdown` ORDER BY `performance` DESC;');
    }).then(function () {
      return migration.createTable('feedback', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        type: {
          type: DataTypes.ENUM,
          values: ['Bug', 'Suggestion', 'Feedback', 'Spelling/Layout'],
          defaultValue: 'Feedback',
          allowNull: false
        },
        summary: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [5, 255],
              msg: 'The summary must have between 5 and 255 characters'
            }
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        originalAuthorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        status: {
          type: DataTypes.ENUM,
          values: ['New', 'Reviewing', 'Dismissed', 'Duplicate', 'On hold', 'Accepted', 'Developing', 'Done'],
          allowNull: false,
          defaultValue: 'New'
        },
        response: {
          type: DataTypes.TEXT
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        deletedAt: {
          type: DataTypes.DATE
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('feedback', ['type'], { indexName: 'type' });
    }).then(function () {
      return migration.addIndex('feedback', ['deletedAt'], {
        indexName: 'deletedAt'
      });
    }).then(function () {
      return migration.createTable('votes', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        vote: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        voterId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'users',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        feedbackId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: 'feedback',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        charset: 'utf8'
      });
    }).then(function () {
      return migration.addIndex('votes', ['vote'], { indexName: 'vote' });
    }).then(function () {
      return migration.addIndex('votes', ['voterId', 'feedbackId'], {
        indexName: 'oneVoteOnly',
        indicesType: 'UNIQUE'
      });
    }).then(done);
  },
  
  down: function (migration, DataTypes, done) {
    migration.sequelize.query('DROP VIEW `sessionPerformance`;').then(function () {
      return migration.sequelize.query('DROP VIEW `periodPerformance`;');
    }).then(function () {
      return migration.dropTable('votes');
    }).then(function () {
      return migration.dropTable('feedback');
    }).then(function () {
      return migration.dropTable('periods');
    }).then(function () {
      return migration.dropTable('tokens');
    }).then(function () {
      return migration.dropTable('settings');
    }).then(function () {
      return migration.dropTable('projectsTargets');
    }).then(function () {
      return migration.dropTable('targets');
    }).then(function () {
      return migration.dropTable('writingSessions');
    }).then(function () {
      return migration.dropTable('projectsGenres');
    }).then(function () {
      return migration.dropTable('projects');
    }).then(function () {
      return migration.dropTable('genres');
    }).then(function () {
      return migration.dropTable('invitations');
    }).then(function () {
      return migration.dropTable('users');
    }).then(done);
  }
};
