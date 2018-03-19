use 'DB_NAME';


drop procedure if exists table_set_status_id;

-- table_set_status_id
delimiter //
create procedure table_set_status_id (
	in in_table_name varchar(64),
	in in_id varchar(32),
	in in_status_flag tinyint(4)
)
begin
	SET @sql = CONCAT('UPDATE `', in_table_name, '` SET `status_flag` = ', in_status_flag, ' WHERE `fuzion_', in_table_name, '_id` = unhex(\'', in_id, '\');');
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
