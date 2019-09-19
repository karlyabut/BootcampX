const args = process.argv.slice(2);
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${args[0]}%'
LIMIT ${args[1]};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was inthe ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));