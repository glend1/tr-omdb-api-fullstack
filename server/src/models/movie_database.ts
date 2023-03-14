import {
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_TABLE, DB_USER } from '../util/environment';

export class MovieTable extends Model<
    InferAttributes<MovieTable>,
    InferCreationAttributes<MovieTable>
> {
    declare movieId: string;
}

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
});

MovieTable.init(
    {
        movieId: {
            field: 'movie_id',
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        tableName: DB_TABLE,
        timestamps: false,
        sequelize: sequelize,
    }
);
