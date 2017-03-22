INSERT INTO tacos
  (Name, Description, Price, Imageurl)

Values
  ($1, $2, $3, $4)

  RETURNING *;
