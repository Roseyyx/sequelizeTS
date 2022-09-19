'use strict';

import {
  Model
} from 'sequelize';

interface InviteAttributes{
  id: number;
  code: string;
  createdBy: string;
  usedBy: string;
  isUsed: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Invites extends Model <InviteAttributes> implements InviteAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    code!: string;
    createdBy!: string;
    usedBy!: string;
    isUsed!: boolean;

    static associate(models: any) {
      // define association here
      Invites.belongsTo(models.User, {
        foreignKey: 'createdBy',
      });
      Invites.belongsTo(models.User, {
        foreignKey: 'usedBy',
      });
    }
  }
  Invites.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'username',
      },
    },
    usedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'username',
      },
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Invites',
  });
  return Invites;
};