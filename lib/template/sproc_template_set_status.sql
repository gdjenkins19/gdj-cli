USE `db_name`;

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


