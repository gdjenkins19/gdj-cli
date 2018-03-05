USE `DB_NAME`;

drop procedure if exists insert_TABLE_NAME;

delimiter //
create procedure insert_TABLE_NAME (
    TABLE_PARAMS
)
begin
	if not exists(select 1 from `TABLE_NAME` where `fuzion_TABLE_NAME_id` = unhex(in_fuzion_TABLE_NAME_id)) then
		insert into `TABLE_NAME` (
            INSERT_COLS
        )
		values (
            INSERT_VALS
        );
	end if;
end //
delimiter ;
