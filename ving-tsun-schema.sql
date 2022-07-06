CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE videos (
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    video_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    video_url VARCHAR(100) NOT NULL
);

CREATE TABLE comments (
    username VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    video_id VARCHAR (25)
        REFERENCES videos ON DELETE CASCADE,
    comment VARCHAR (8000)
);