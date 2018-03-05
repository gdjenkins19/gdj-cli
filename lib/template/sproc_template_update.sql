USE `DB_NAME`;

drop procedure if exists update_TABLE_NAME;

delimiter //
create procedure update_TABLE_NAME (
    TABLE_PARAMS
)
begin
	update
		`TABLE_NAME`
	set
        UPDATE_SETS
	where
		`fuzion_TABLE_NAME_id` = unhex(in_fuzion_TABLE_NAME_id);
end //
delimiter ;

