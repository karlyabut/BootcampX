SELECT avg(total_duration) AS average_total_duration
FROM (
  SELECT cohorts.name, sum(completed_at - started_at) AS total_duration
  FROM assistance_requests
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
  GROUP BY cohorts.name
  ORDER BY total_duration)
assistance_requests;