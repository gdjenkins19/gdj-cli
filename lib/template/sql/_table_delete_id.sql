use 'DB_NAME';

drop procedure if exists table_delete_id;

-- table_delete_id
delimiter //
create procedure table_delete_id (
	in in_table_name varchar(64),
	in in_id varchar(64)
)
begin
	SET @sql = CONCAT('UPDATE `', in_table_name, '` SET `status_flag` = -1 WHERE `fuzion_',in_table_name,'_id` = unhex(\'',in_id,'\');');
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
