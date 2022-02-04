import { DataTypes, Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
      },
      {
        sequelize,
        modelName: "User",
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      },
    );
  }

  static associate(models) {
    models.User.hasMany(models.Post, { foreignKey: "writer" });
    models.User.belongsToMany(models.User, {
      through: "Follow",
      as: "followers",
      foreignKey: "followingId",
    });
    models.User.belongsToMany(models.User, {
      through: "Follow",
      as: "following",
      foreignKey: "followerId",
    });
  }
}

export default User;
