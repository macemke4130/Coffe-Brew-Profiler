CREATE SCHEMA `brewprofiler`;

create user 'brewprofiler_user'@'localhost' identified by 'root';
GRANT ALL ON brewprofiler.* TO 'brewprofiler_user'@'localhost';

USE brewprofiler;

create table roles (
	id int primary key auto_increment not null,
    name varchar(32) not null
);
insert into roles (name) values
("Admin"), ("Guest");

create table baristas (
	id int primary key auto_increment not null,
    is_active bool default true,
    role int default 2,
		foreign key (role) references roles (id),
    username varchar(64) unique not null,
    email varchar(64) unique not null,
    password varchar(64) not null,
    _created timestamp default now()
);

create table brewmethods (
	id int primary key auto_increment not null,
    name varchar(32) not null
);
insert into brewmethods (name) values
("Chemex 3-Cup"), ("Chemex 6-Cup"), ("Chemex 8-Cup"), ("Chemex 10-Cup"),
("Hario V60"), ("Kona"), ("Aero-Press"), ("French Press"),
("Kalita Wave"), ("Clever");

create table brands (
	id int primary key auto_increment not null,
    name varchar(64) not null
);
insert into brands (name) values
("Hyperion Coffee Company"), ("Peace Coffee Company"), ("Anodyne Coffee Company");

create table grinders (
	id int primary key auto_increment not null,
    name varchar(64) not null
);
insert into grinders (name) values
("Baratza Encore"), ("Baratza Virtuoso+"), ("Baratza Sette 30"),
("Baratza Sette 270"), ("Baratza Vario"), ("Baratza Vario-W"), ("Baratza Forte AP");

create table processes (
	id int primary key auto_increment not null,
    name varchar(64) not null
);
insert into processes (name) values
("Washed / Wet"), ("Natural / Dry"), ("Honey");

create table brewphotos (
	id int primary key auto_increment not null,
    url varchar(1000) not null
);

create table coffeebags (
	id int primary key auto_increment not null,
    is_active bool default true,
    barista int not null,
		foreign key (barista) references baristas (id),
	brand int not null,
		foreign key (brand) references brands (id),
    name varchar(64) not null,
    region varchar(64),
    elevationabovesealevelinmeters int,
    breed varchar(64),
    process int,
		foreign key (process) references processes (id),
    blend bool
);

create table tastingnotes (
	id int primary key auto_increment not null,
    notes varchar(10000)
);

create table brews (
	id int primary key auto_increment not null,
    is_active bool default true,
    _createdat timestamp default now(),
    barista int not null,
		foreign key (barista) references baristas (id),
	brewmethod int not null,
		foreign key (brewmethod) references brewmethods (id),
    coffeebag int not null,
		foreign key (coffeebag) references coffeebags (id),
	roasteddate date,
    grinder int,
		foreign key (grinder) references grinders (id),
	grindsize tinyint(1),
    gramspregrind decimal(5, 2),
    gramspostgrind decimal(5, 2),
    watertempprebrew decimal(5, 2),
    watertemppostbrew decimal(5, 2),
    bloomtimeinsec int,
    bloomweight decimal(5, 2),
    brewtimeinsec int,
    brewweight decimal(5, 2),
    tastingnote int,
		foreign key (tastingnote) references tastingnotes (id),
	brewphoto int,
		foreign key (brewphoto) references brewphotos (id)
);