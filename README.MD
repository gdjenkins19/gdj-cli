# Install

1. git clone https://github.com/gdjenkins19/gdj-cli.git
2. cd gdj-cli
3. npm install -g

# Usage

>$ fuzion-cli
... display usage information

>$ fuzion-cli --op op-name --help
... display help for an operation

>$ fuzion-cli --op op-name
... runs an operation, or displays usage information if usage is incorrect

>$ fuzion-cli --op "op-name1|op-name2|op-name3|..."
... runs a set of operations


# Operations

    consul-start	- installs consul (if not installed) and runs consul
    db-table-info	- displays information about a table in the database
    db-tables-info	- displays a list of tables in the database
    mysql-reset	- shuts down the mysql container (fuzion-mysql) and deletes/clears the mounted volume (lmysql)
    mysql-start	- starts the the mysql container (fuzion-mysql) with mounted volume (lmysql)
    query-directory	- runs all of the .sql files in a directory in the mysql container
    query-file	- runs a .sql file in the mysql container
    query-list 	- runs the .sql files in a list file in the mysql container
    query-project	- runs all of the .sql files in a fuzion-db-scripts project (scripts + sprocs) in the mysql container
    query		- runs an arbitrary sql command in the mysql container
    sprocs-db	- generates basic sprocs for each table in the database in the mysql container
    sprocs		- generates basic sprocs for a table in the database in the mysql container

# Examples

- Run consul
>$ fuzion-cli --op consul-start

- Start the mysql container
>$ fuzion-cli --op mysql-start

- Start a new mysql container, and rebuild it from scratch
>$ fuzion-cli --op "mysql-reset|mysql-start|query-project" --api ADMIN --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN

- Run a sql command
>$ fuzion-cli --op query --api ADMIN --sql "SELECT *, hex(fuzion_security_role_id)  FROM security_role;"

- Run a sproc
>$ fuzion-cli --op query --api ADMIN --sql "call insert_security_role(null,'11E81BFC9231C8C2AB900242AC110003','gdj_role','Gary Dean Jenkins Role','Lets test adding a role shall we?',null,null,1);"

- Generate Sprocs for a table
>$ fuzion-cli --op sprocs --api ADMIN --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN/sprocs --table security_role