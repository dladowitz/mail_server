CREATE TABLE emails(
  id int primary key not null,
  name varchar(100) not null,
  content text not null,
  created_at timestamptz DEFAULT localtimestamp not null
);

CREATE TABLE users(
  id int primary key not null,
  email_address varchar(100) not null,
  first_name    varchar(100) not null,
  created_at timestamptz DEFAULT localtimestamp not null
);

CREATE TABLE sent_emails(
  id int primary key not null,
  email_id int references emails(id),
  user_id  int references users(id)
);