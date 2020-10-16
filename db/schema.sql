-- Schema
DROP DATABASE IF EXISTS post_db;
CREATE database post_db;

USE post_db;

CREATE TABLE posts
(
	id int NOT NULL AUTO_INCREMENT,
	ticket_url varchar(255) NOT NULL,
	response int DEFAULT 0 NOT NULL,
	agent_name varchar(255) NOT NULL,
	category varchar(255) NOT NULL,
	sub_category varchar(255) NOT NULL,
	message_relevance_1 int DEFAULT 0,
	message_relevance_2 int DEFAULT 0,
	message_relevance_3 int DEFAULT 0,
	message_relevance_3_un BOOLEAN DEFAULT false,
	tool_process_1 int DEFAULT 0,
	tool_process_2 int DEFAULT 0,
	convo_skills int DEFAULT 0,
	note varchar(255) NOT NULL,
	published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);