USE `DB_NAME`;

drop procedure if exists select_TABLE_NAME_by_id;

delimiter //
create procedure select_TABLE_NAME_by_id (
	in in_fuzion_TABLE_NAME_id varchar(32)
)
begin
	select
        SELECT_COLS
	from
		`TABLE_NAME`
	where
		`fuzion_TABLE_NAME_id` = unhex(in_fuzion_TABLE_NAME_id)
	and
		`status_flag` <> -1;
end //
delimiter ;
