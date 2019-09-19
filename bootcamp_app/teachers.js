const args = process.argv.slice(2);
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = args[0];

const queryString = `SELECT DISTINCT teachers.name AS teacher_name, cohorts.name AS cohort_name
FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teachers.name;`;

const value = [cohortName]

pool.query(queryString, value)
.then(res => {
  res.rows.forEach(assisted => {
    console.log(`${assisted.cohort_name}: ${assisted.teacher_name}`)
  });
})
.catch(err => console.error('query error', err.stack));