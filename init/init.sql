CREATE TABLE hello_bot_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL
);

-- 어드민 유저
INSERT INTO hello_bot_user (email, password, role) VALUES ('admin@thigsflow.com', '$2b$10$1ldtVwIhwB703lKoytEVau6MIKtPsqsxfT/tMGVF4OV.oL/e1VqvS', 0);

-- 일반 유저
INSERT INTO hello_bot_user (email, password, role) VALUES ('test@thigsflow.com', '$2b$10$1ldtVwIhwB703lKoytEVau6MIKtPsqsxfT/tMGVF4OV.oL/e1VqvS', 1);