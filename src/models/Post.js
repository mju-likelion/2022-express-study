import { DataTypes, Model } from "sequelize";

class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Post",
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      },
    );
  }

  static associate(models) {
    models.Post.belongsTo(models.User, { foreignKey: "writer" });
  }
}

export default Post;
