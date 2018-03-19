USE `DB_NAME`;

drop procedure if exists set_status_TABLE_NAME;

delimiter //
create procedure set_status_TABLE_NAME (
	in in_fuzion_TABLE_NAME_id varchar(32),
	in in_status_flag tinyint(4)
)
begin
	update
		`TABLE_NAME`
	set
		`status_flag` = in_status_flag
	where
		`fuzion_TABLE_NAME_id` = unhex(in_fuzion_TABLE_NAME_id);
end //
delimiter ;


