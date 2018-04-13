USE `DB_NAME`;

drop function if exists create_uuid;

delimiter //
create function create_uuid ()
returns
	varchar(32)
begin
	declare retv binary(16);
	set @temp_uuid = uuid();
	set @temp_reorder = CONCAT(SUBSTR(@temp_uuid, 15, 4),SUBSTR(@temp_uuid, 10, 4), SUBSTR(@temp_uuid, 1, 8),SUBSTR(@temp_uuid, 20, 4),SUBSTR(@temp_uuid, 25));
	set retv = unhex(@temp_reorder);
	return retv;
end //
delimiter ;