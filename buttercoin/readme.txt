1) Log in to bitnami server
2) login to myssql server : mysql -h localhost -u root -p 
	enter password:
3) Create dabase : create database `wuhumarketing`;
4) Create table: 
	CREATE TABLE IF NOT EXISTS `marketing_invites` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`email` varchar(100) NOT NULL,
		`ip` varchar(65) NOT NULL,
		`dateadded` datetime NOT NULL,
		PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
	Note: Also you can run the db dump inside data folder found inside the 'web/landing' folder under the marketing svn repository
5) Deploy the application in htdocs in apache
6) Change the database credentials in database.inc file found inside config folder in this folder.

