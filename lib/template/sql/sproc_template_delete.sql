USE `DB_NAME`;

drop procedure if exists delete_TABLE_NAME;

delimiter //
create procedure delete_TABLE_NAME (
	in in_fuzion_TABLE_NAME_id varchar(32)
)
begin
	update
		`TABLE_NAME`
	set
		`status_flag` = -1
	where
		`fuzion_TABLE_NAME_id` = unhex(in_fuzion_TABLE_NAME_id);
end //
delimiter ;
