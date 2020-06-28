import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
  return createConnection({
    "type": "postgres",
    "name": "default",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "typegraphql-example-test",
    "synchronize": drop,
    "dropSchema": drop,
    "entities": [
      __dirname + "/../entity/*.*"
    ]
  })
}