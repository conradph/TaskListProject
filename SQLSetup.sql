use TaskDatabase;
create table Tasks (
	id int primary key auto_increment not null, 
    TMname nvarchar(50),
    description nvarchar(50),
    dueDate datetime,
    isCompleted boolean
);
insert into Tasks values 
(0, "Phil", "Tasky Task", '2021-12-17 12:00:00', true);