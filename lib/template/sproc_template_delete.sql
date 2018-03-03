USE `db_name`;

drop procedure if exists delete_table_name;

delimiter //
create procedure delete_table_name (
	in in_fuzion_table_name_id varchar(32)
)
begin
	update
		`table_name`
	set
		`status_flag` = -1
	where
		`fuzion_table_name_id` = unhex(in_fuzion_table_name_id);
end //
delimiter ;
