USE `db_name`;

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

