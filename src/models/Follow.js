import { DataTypes, Model } from "sequelize";
import User from "./User";

class Follow extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        followingId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        followerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "Follow",
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      },
    );
  }
}

export default Follow;
