import { createPool, Pool } from 'mysql2/promise';

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'Chemaesmipastor.1',
        database: 'test1jmhe'
    });
    return connection;
}