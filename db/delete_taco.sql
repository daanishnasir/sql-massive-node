DELETE FROM tacos
WHERE tacoid = $1

RETURNING *;
