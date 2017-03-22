UPDATE tacos
SET description = $2
WHERE tacoid = $1   --first value  which is the 5th taco since its [5]

RETURNING *;
