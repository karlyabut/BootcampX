const args = process.argv.slice(2);
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = args[0];
const limit = args[1] || 5;

const queryString = `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was inthe ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));