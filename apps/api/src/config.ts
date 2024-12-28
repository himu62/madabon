export interface Config {
  database: Database;
}

export interface Database {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

const env = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} not found`);
  }
  return value;
};

export const config = ((): Config => {
  return {
    database: {
      host: env("DATABASE_HOST"),
      port: parseInt(env("DATABASE_PORT")),
      database: env("DATABASE_NAME"),
      username: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
    },
  };
})();
