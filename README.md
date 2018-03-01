# gdj-cli
Testing CLI Tool Creation

# install
npm install -g https://github.com/gdjenkins19/gdj-cli.git

# alternative install
git clone https://github.com/gdjenkins19/gdj-cli.git
cd gdj-cli
npm install -g

# Usage

Required: --op

fuzion-cli --op OP_NAME
fuzion-cli --op "OP_NAME_1|OP_NAME_2|OP_NAME_3|..."

# --op
mysql-reset -
mysql-start -
db-builder - tool for building the db tables from sql files detailed below

## --op mysql-reset
Stops mysql container (fuzion-mysql) and deletes the disk volume (lmysql)

## --op mysql-start
Stops mysql system service, start the mysql container (fuzion-mysql) and maps it to the disk voume (lmysql)

## --op db-builder
Send SQL File(s) to fuzion-mysql container.

Required Args:
	--api    - Datadisco API Name (ADMIN, EVENT, CONTACT, SHOW, etc ...)
	--source - 'file', 'directory', 'project', 'list'
	--path   - Fully qualified path to SQL file, Directory containing SQL Files, Directory of fuzion-db-script project, or files containing list of SQL files

Optional Args:
	--list - Fully qualified path to TXT file for writing SQL file names and paths to for using later.

# Examples:

	Single SQL File
		fuzion-cli --op db-builder --api ADMIN --source file --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN/scripts/00_build_fuzionDBs.sql

	Directory of SQL Files
		fuzion-cli --op db-builder --api ADMIN --source directory --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN/scripts

	Project SQL Files (fuzion-db-scripts subproject scripts and sprocs sub-folders)
		fuzion-cli --op db-builder --api ADMIN --source project --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN

	Don't send files, but save them to a list file.
		fuzion-cli --op db-builder --api ADMIN --source project --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN --list fuzion_admin_list.txt

	Use the saved list (which also can be manually altered).
		fuzion-cli --op db-builder --api ADMIN --source list --path fuzion_admin_list.txt


	Multiple operations:
		fuzion-cli --op 'mysql-reset|mysql-start|db-builder' --source project --path /Users/gdjenkins19/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN --api ADMIN
		Note:
			Stops mysql container (fuzion-mysql)
			Deletes the disk volume (lmysql) ... losing data/state
			Starts a new mysql container (fuzion-mysql)
			Sends all SQL scripts in the 01_FUZION_ADMIN project.