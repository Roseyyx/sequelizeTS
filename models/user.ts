'use strict';

import {
  Model
} from 'sequelize';

interface UserAttributes{
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  invitedBy: string;
  subBeginDate: Date;
  subEndDate: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    isAdmin!: boolean;
    invitedBy!: string;
    subBeginDate!: Date;
    subEndDate!: Date;
    static associate(models: any) {
      // define association here
      User.hasOne(models.Invites, {
        foreignKey: 'createdBy',
      });
      User.hasOne(models.Invites, {
        foreignKey: 'usedBy',
      });
      User.belongsTo(models.Invites, {
        foreignKey: 'invitedBy',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    invitedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Invites',
        key: 'createdBy',
      },
    },
    subBeginDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};