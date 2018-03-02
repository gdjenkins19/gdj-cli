USE `db_name`;

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
