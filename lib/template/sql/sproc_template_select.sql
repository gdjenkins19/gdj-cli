USE `DB_NAME`;

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
