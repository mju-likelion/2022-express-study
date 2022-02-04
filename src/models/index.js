import { Sequelize } from "sequelize";
import User from "./User";
import Post from "./Post";

// test를 위해 파일에 저장했습니다
// sqlite를 메모리에서 띄우려면 아래처럼 하면 돼요
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize(`sqlite:${process.cwd()}/sqlite.db`);

const models = {
  sequelize,
  User,
  Post,
};

User.init(sequelize);
Post.init(sequelize);

User.associate(models);
Post.associate(models);

export default models;
