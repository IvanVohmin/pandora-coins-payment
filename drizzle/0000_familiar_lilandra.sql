CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`player` varchar(255) NOT NULL,
	`item` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
