USE `DB_NAME`;

drop procedure if exists table_select;

-- table_select
delimiter //
create procedure table_select(
	in in_table_name varchar(64),
    in in_skip int,
    in in_take int
)
begin
	SET @sql = CONCAT('SELECT * FROM ', in_table_name, ' WHERE `status_flag` <> -1 ORDER BY `create_timestamp` DESC LIMIT ', in_take, ' OFFSET ', in_skip, ';');
	PREPARE statement FROM @sql;
	EXECUTE statement;
	DEALLOCATE PREPARE statement;
end //
delimiter ;
