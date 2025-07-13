import { test as teardown } from '@playwright/test';
import { Client } from 'pg';

teardown('delete values from database table', async ({}) => {
  await deleteTables('user_backend', ['user_table']);
  await deleteTables('mentorship_backend', [
    'applications_table',
    'mentor_profiles_table',
    'skills_table',
    'categories_table',
  ]);
  await deleteTables('rating_backend', ['ratings_table']);
  // TODO: fix teardown (genai, no permission)
  // await deleteTables('genai_backend', ['summarization_logs']);
});

function getClient(database: string): Client {
  return new Client({
    host: 'localhost',
    port: 5432,
    user: 'merge_doctor_backend',
    password: 'qweasdzxc',
    database: database,
  });
}

async function deleteTables(database: string, tables: string[]) {
  const client = getClient(database);

  try {
    await client.connect();

    for (const table of tables) {
      await client.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
    }
  } catch (error) {
    console.error(`Error deleting ${database} data:`, error);
  } finally {
    await client.end();
  }
}
