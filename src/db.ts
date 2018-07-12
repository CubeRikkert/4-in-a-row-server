import { createConnection } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import User from './users/entity'
import { Player, Game } from './games/entities'

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's';
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}

export default () =>
  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://mufvauhrepuski:5ac3e11f04f695a54c6b4cd6143fc3d2ca2f431a82eddc6f168c91e0ed26042b@ec2-54-217-235-137.eu-west-1.compute.amazonaws.com:5432/d4icugvdq1b4td',
    entities: [
      User,
      Player,
      Game
    ],
    synchronize: true, // careful with this in production!
    logging: true,
    namingStrategy: new CustomNamingStrategy()
  })
    .then(_ => console.log('Connected to Postgres with TypeORM'))
