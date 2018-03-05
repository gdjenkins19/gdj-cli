USE `DB_NAME`;

drop procedure if exists insert_TABLE_NAME;

delimiter //
create procedure insert_TABLE_NAME (
    TABLE_PARAMS
)
begin
	if not exists(select 1 from `TABLE_NAME` where `fuzion_TABLE_NAME_id` = unhex(fuzion_TABLE_NAME_id)) then
		insert into `TABLE_NAME` (
            INSERT_COLS
        )
		values (
            INSERT_VALS
        );
	end if;
end //
delimiter ;

drop procedure if exists select_TABLE_NAME_paged;

delimiter //
create procedure select_TABLE_NAME_paged (
	in skip int,
	in take int
)
begin
	select
        SELECT_COLS
	from
		`TABLE_NAME`
	where
		`status_flag` <> -1
	order by
		`create_timestamp` desc
	limit
		take
	offset
		skip;
end //
delimiter ;

drop procedure if exists select_TABLE_NAME_by_id;

delimiter //
create procedure select_TABLE_NAME_by_id (
	in fuzion_TABLE_NAME_id varchar(32)
)
begin
	select
        SELECT_COLS
	from
		`TABLE_NAME`
	where
		`fuzion_TABLE_NAME_id` = unhex(fuzion_TABLE_NAME_id)
	and
		`status_flag` <> -1;
end //
delimiter ;

drop procedure if exists select_TABLE_NAME_count;

delimiter //
create procedure select_TABLE_NAME_count()
begin
	select
		count(1) as count
	from
		`TABLE_NAME`
	where
		`status_flag` <> -1;
end //
delimiter ;

drop procedure if exists set_status_TABLE_NAME;

delimiter //
create procedure set_status_TABLE_NAME (
	in fuzion_TABLE_NAME_id varchar(32),
	in status_flag tinyint(4)
)
begin
	update
		`TABLE_NAME`
	set
		`status_flag` = status_flag
	where
		`fuzion_TABLE_NAME_id` = unhex(fuzion_TABLE_NAME_id);
end //
delimiter ;

drop procedure if exists update_TABLE_NAME;

delimiter //
create procedure update_TABLE_NAME (
    TABLE_PARAMS
)
begin
	update
		`TABLE_NAME`
	set
        UPDATE_SETS
	where
		`fuzion_TABLE_NAME_id` = unhex(fuzion_TABLE_NAME_id);
end //
delimiter ;

