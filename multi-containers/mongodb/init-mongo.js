db.createUser({
  user: "mark",
  password: "secretPass",
  roles: [
    {
      roles: "readWrite",
      db: "admin",
    },
  ],
});
