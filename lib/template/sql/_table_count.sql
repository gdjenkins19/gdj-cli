USE `DB_NAME`;

drop procedure if exists table_count;

-- table_count
delimiter //
create procedure table_count(
	in in_table_name varchar(64)
)
begin
	SET @sql = CONCAT('SELECT count(1) as count FROM ', in_table_name, ' WHERE `status_flag` <> -1;');
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
