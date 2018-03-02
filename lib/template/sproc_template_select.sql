USE `db_name`;

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
