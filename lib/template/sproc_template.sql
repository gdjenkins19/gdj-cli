USE `db_name`;

drop procedure if exists insert_table_name;

delimiter //
create procedure insert_table_name (
    TABLE_PARAMS
)
begin
	if not exists(select 1 from `table_name` where `fuzion_table_name_id` = unhex(fuzion_table_name_id)) then
		insert into `table_name` (
            INSERT_COLS
        )
		values (
            INSERT_VALS
        );
	end if;
end //
delimiter ;

drop procedure if exists select_table_name_paged;

delimiter //
create procedure select_table_name_paged (
	in skip int,
	in take int
)
begin
	select
        SELECT_COLS
	from
		`table_name`
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

drop procedure if exists select_table_name_by_id;

delimiter //
create procedure select_table_name_by_id (
	in fuzion_table_name_id varchar(32)
)
begin
	select
        SELECT_COLS
	from
		`table_name`
	where
		`fuzion_table_name_id` = unhex(fuzion_table_name_id)
	and
		`status_flag` <> -1;
end //
delimiter ;

drop procedure if exists select_table_name_count;

delimiter //
create procedure select_table_name_count()
begin
	select
		count(1) as count
	from
		`table_name`
	where
		`status_flag` <> -1;
end //
delimiter ;

drop procedure if exists set_status_table_name;

delimiter //
create procedure set_status_table_name (
	in fuzion_table_name_id varchar(32),
	in status_flag tinyint(4)
)
begin
	update
		`table_name`
	set
		`status_flag` = status_flag
	where
		`fuzion_table_name_id` = unhex(fuzion_table_name_id);
end //
delimiter ;

drop procedure if exists update_table_name;

delimiter //
create procedure update_table_name (
    TABLE_PARAMS
)
begin
	update
		`table_name`
	set
        UPDATE_SETS
	where
		`fuzion_table_name_id` = unhex(fuzion_table_name_id);
end //
delimiter ;

