USE `db_name`;

drop procedure if exists set_status_table_name;

delimiter //
create procedure set_status_table_name (
	in in_fuzion_table_name_id varchar(32),
	in in_status_flag tinyint(4)
)
begin
	update
		`table_name`
	set
		`status_flag` = in_status_flag
	where
		`fuzion_table_name_id` = unhex(in_fuzion_table_name_id);
end //
delimiter ;


