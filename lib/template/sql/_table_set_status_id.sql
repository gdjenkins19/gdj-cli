USE `DB_NAME`;

drop procedure if exists table_set_status_id;

-- table_set_status_id
delimiter //
create procedure table_set_status_id (
	in in_table_name varchar(64),
	in in_id_name varchar(64),
	in in_id_value varchar(32),
	in in_status_flag tinyint(4)
)
begin
	-- UPDATE `in_table_name`
	-- SET `last_mod_timestamp` = (SELECT utc_timestamp), `status_flag` = 'in_status_flag'
	-- WHERE `in_id_name` = unhex('in_id_value');
	SET @sql = CONCAT(
		'UPDATE `', in_table_name, '` ',
		'SET `last_mod_timestamp` = (SELECT utc_timestamp), `status_flag` = \'', in_status_flag, '\' ',
		'WHERE `', in_id_name, '` = unhex(\'', in_id_value, '\');'
	);
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
