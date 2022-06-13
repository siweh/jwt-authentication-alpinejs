create table love_user(
	id serial not null primary key,
	username text not null,
	hash_password varchar not null,
	love_user integer,
	email text not null
);