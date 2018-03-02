USE `db_name`;

drop procedure if exists select_table_name_count;

delimiter //
create procedure select_table_name_count()
begin
	select
		count(1) as count
	from
		`table_name`
	where
		`status_flag` <> -1;
end //
delimiter ;
