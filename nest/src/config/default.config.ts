export default () => ({
  PORT: parseInt(process.env.PORT, 10),
  MONGODB_STRING: process.env.MONGODB_STRING,
});
