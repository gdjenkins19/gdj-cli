USE `db_name`;

drop procedure if exists insert_table_name;

delimiter //
create procedure insert_table_name (
    TABLE_PARAMS
)
begin
	if not exists(select 1 from `table_name` where `fuzion_table_name_id` = unhex(in_fuzion_table_name_id)) then
		insert into `table_name` (
            INSERT_COLS
        )
		values (
            INSERT_VALS
        );
	end if;
end //
delimiter ;
