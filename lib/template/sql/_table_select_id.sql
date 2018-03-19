use 'DB_NAME';

drop procedure if exists table_select_id;

-- table_select_id
delimiter //
create procedure table_select_id (
	in in_table_name varchar(64),
	in in_id_name varchar(64),
	in in_id varchar(32)
)
begin
	SET @sql = CONCAT('SELECT * FROM ', in_table_name, ' WHERE `', in_id_name, '` = unhex(\'', in_id, '\');');
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
