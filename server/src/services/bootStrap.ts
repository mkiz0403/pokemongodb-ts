import mongoose from 'mongoose';
import mongodbRepo from './mongodbRepo';
const url = mongodbRepo.url;

const bootStrap = async (useMongoDB: boolean) => {
  try {
    if (useMongoDB) {
      await mongoose.connect(url);
      console.log(`MongoDB 서버에 연결되었습니다.`);
    } else {
      console.log(`FileSystem 서버에 연결되었습니다.`);
    }
  } catch (error) {
    console.log(`서버 연결에 실패했습니다.`);
    throw new Error('서버 연결 실패');
  }
};

export default bootStrap;
