use `DB_NAME`;

drop procedure if exists table_delete_id;

-- table_delete_id
delimiter //
create procedure table_delete_id (
	in in_table_name varchar(64),
	in in_id_name varchar(64),
	in in_id varchar(32)
)
begin
	SET @sql = CONCAT('UPDATE `', in_table_name, '` SET `status_flag` = -1 WHERE `',in_id_name,'` = unhex(\'',in_id,'\');');
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
