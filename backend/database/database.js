const { Client } = require('pg');

const connectionString = 'postgresql://drifasoley@localhost/vefforritun2'//`${process.env.DATABASE_URL}?ssl=true`;

exports.query = async (query, params) => {
  const client = new Client({ connectionString });
  await client.connect();

  try {
    const result = await client.query(query, params);

    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error running query: ' + err);
    throw err;
  } finally {
    await client.end();
  }
};
