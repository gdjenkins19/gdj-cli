USE `DB_NAME`;

drop procedure if exists select_TABLE_NAME_count;

delimiter //
create procedure select_TABLE_NAME_count()
begin
	select
		count(1) as count
	from
		`TABLE_NAME`
	where
		`status_flag` <> -1;
end //
delimiter ;
