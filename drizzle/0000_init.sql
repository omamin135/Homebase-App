CREATE TABLE `Core_Setting` (
	`Id` text PRIMARY KEY NOT NULL,
	`CreateDate` text NOT NULL,
	`ModifiedDate` text NOT NULL,
	`DeletedDate` text,
	`SettingKey` text NOT NULL,
	`SettingValue` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Core_Setting_SettingKey_unique` ON `Core_Setting` (`SettingKey`);