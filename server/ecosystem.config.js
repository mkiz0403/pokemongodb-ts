module.exports = {
  apps: [
    {
      name: 'myapp',
      script: 'ts-node',
      args: 'src/index.ts', // TypeScript 파일의 경로를 설정합니다.
      exec_mode: 'fork',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
