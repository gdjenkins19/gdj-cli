USE `db_name`;

drop procedure if exists delete_table_name;

delimiter //
create procedure delete_table_name (
	in fuzion_table_name_id varchar(32)
)
begin
	update
		`table_name`
	set
		`status_flag` = -1
	where
		`fuzion_table_name_id` = unhex(fuzion_table_name_id);
end //
delimiter ;
