-- 1. Create custom types/enums for PostgreSQL
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE user_status AS ENUM ('active', 'blocked');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'promo_type') THEN
        CREATE TYPE promo_type AS ENUM ('hearts', 'infinity');
    END IF;
END$$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(255) PRIMARY KEY, -- Firebase Auth UID
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user' NOT NULL,
    status user_status DEFAULT 'active' NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    total_xp INT DEFAULT 0 NOT NULL, -- Total units completed across all categories
    hearts_count INT DEFAULT 10 NOT NULL, -- Current numeric hearts (max defaults to 10)
    subscription_expires_at TIMESTAMP NULL, -- Infinity hearts when in the future
    last_heart_refill_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    streak INT DEFAULT 0 NOT NULL
);

-- 3. Study Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) NOT NULL,
    icon_char VARCHAR(1) NOT NULL
);

-- 4. User Category Progress Table (for leaderboards/stats)
CREATE TABLE IF NOT EXISTS user_category_progress (
    user_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
    xp INT DEFAULT 0 NOT NULL, -- Number of fully completed units in this category
    PRIMARY KEY (user_id, category_id)
);

-- 5. Units Table
CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
    unit_number INT NOT NULL, -- e.g., 1, 2, 3
    title VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) NOT NULL,
    UNIQUE (category_id, unit_number)
);

-- 6. Levels Table
CREATE TABLE IF NOT EXISTS levels (
    id VARCHAR(50) NOT NULL, -- easy, medium1, medium2, hard1, hard2
    unit_id INT REFERENCES units(id) ON DELETE CASCADE NOT NULL,
    label VARCHAR(255) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    PRIMARY KEY (unit_id, id)
);

-- 7. Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(100) PRIMARY KEY,
    unit_id INT NOT NULL,
    level_id VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- e.g., ["a", "an", "the", "none"]
    correct_answer VARCHAR(255) NOT NULL,
    explanation TEXT,
    explanation_th TEXT,
    FOREIGN KEY (unit_id, level_id) REFERENCES levels(unit_id, id) ON DELETE CASCADE
);

-- 8. Quiz Sessions Table (No correct/wrong score counters, just tracking progress)
CREATE TABLE IF NOT EXISTS user_quiz_sessions (
    user_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE NOT NULL,
    unit_id INT NOT NULL,
    level_id VARCHAR(50) NOT NULL,
    current_question_index INT DEFAULT 0 NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, unit_id, level_id),
    FOREIGN KEY (unit_id, level_id) REFERENCES levels(unit_id, id) ON DELETE CASCADE
);

-- 9. Completed Lessons Table
CREATE TABLE IF NOT EXISTS completed_lessons (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE NOT NULL,
    unit_id INT NOT NULL,
    level_id VARCHAR(50) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (unit_id, level_id) REFERENCES levels(unit_id, id) ON DELETE CASCADE,
    UNIQUE (user_id, unit_id, level_id)
);

-- 10. Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
    code VARCHAR(100) PRIMARY KEY,
    type promo_type NOT NULL,
    reward VARCHAR(50) NOT NULL, -- 'infinity' or heart count (e.g. '100')
    description TEXT,
    expires_at TIMESTAMP NULL,
    infinity_duration_minutes INT NULL,
    max_redemptions INT NULL
);

-- 11. User Promo Code Claims Table
CREATE TABLE IF NOT EXISTS user_promo_codes (
    user_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE NOT NULL,
    code VARCHAR(100) REFERENCES promo_codes(code) ON DELETE CASCADE NOT NULL,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_suspended BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (user_id, code)
);

-- 12. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    admin_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index mappings for performance
CREATE INDEX IF NOT EXISTS idx_questions_unit_level ON questions(unit_id, level_id);
CREATE INDEX IF NOT EXISTS idx_completed_lessons_user ON completed_lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_lessons_composite ON completed_lessons(user_id, unit_id, level_id);
CREATE INDEX IF NOT EXISTS idx_user_category_progress_user ON user_category_progress(user_id);
