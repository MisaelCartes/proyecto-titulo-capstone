-- Crear tipos ENUM
CREATE TYPE user_role AS ENUM ('ADMIN', 'STAFF', 'MEMBER', 'RESIDENT');
CREATE TYPE association_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE membership_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');
CREATE TYPE document_type AS ENUM ('RESIDENCE_CERTIFICATE', 'MINUTES', 'REGULATION');
CREATE TYPE document_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE project_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED');
CREATE TYPE notification_type AS ENUM ('EMAIL', 'WHATSAPP', 'PLATFORM');
CREATE TYPE notification_status AS ENUM ('DRAFT', 'SENT', 'FAILED');
CREATE TYPE news_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE facility_type AS ENUM ('COURT', 'ROOM', 'PLAZA');
CREATE TYPE facility_status AS ENUM ('AVAILABLE', 'UNDER_MAINTENANCE', 'RESERVED');
CREATE TYPE booking_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE event_status AS ENUM ('SCHEDULED', 'CANCELLED', 'COMPLETED');
CREATE TYPE registration_status AS ENUM ('REGISTERED', 'CANCELLED', 'ATTENDED');
CREATE TYPE activity_type AS ENUM ('LOGIN', 'DOCUMENT_REQUEST', 'PROJECT_SUBMISSION', 'FACILITY_BOOKING', 'EVENT_REGISTRATION');

-- Crear tablas
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    rut VARCHAR(20) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    role user_role NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE neighborhood_associations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    contact_email VARCHAR(100),
    phone_number VARCHAR(20),
    creation_date DATE NOT NULL,
    status association_status NOT NULL
);

CREATE TABLE memberships (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    association_id INTEGER REFERENCES neighborhood_associations(id),
    start_date DATE NOT NULL,
    end_date DATE,
    status membership_status NOT NULL,
    UNIQUE(user_id, association_id)
);

CREATE TABLE families (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    head_of_family INTEGER REFERENCES users(id)
);

CREATE TABLE family_members (
    id SERIAL PRIMARY KEY,
    family_id INTEGER REFERENCES families(id),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    relationship VARCHAR(50),
    date_of_birth DATE,
    email VARCHAR(100),
    phone_number VARCHAR(20)
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    type document_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_by INTEGER REFERENCES users(id),
    creation_date TIMESTAMP NOT NULL,
    last_modified TIMESTAMP,
    status document_status NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    submitted_by INTEGER REFERENCES users(id),
    submission_date TIMESTAMP NOT NULL,
    status project_status NOT NULL,
    approved_by INTEGER REFERENCES users(id),
    approval_date TIMESTAMP,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2)
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_by INTEGER REFERENCES users(id),
    creation_date TIMESTAMP NOT NULL,
    type notification_type NOT NULL,
    status notification_status NOT NULL
);

CREATE TABLE notification_recipients (
    notification_id INTEGER REFERENCES notifications(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (notification_id, user_id)
);

CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author INTEGER REFERENCES users(id),
    publication_date TIMESTAMP,
    last_modified TIMESTAMP,
    status news_status NOT NULL
);

CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type facility_type NOT NULL,
    capacity INTEGER,
    description TEXT,
    status facility_status NOT NULL
);

CREATE TABLE facility_bookings (
    id SERIAL PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(id),
    user_id INTEGER REFERENCES users(id),
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP NOT NULL,
    status booking_status NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    organizer INTEGER REFERENCES users(id),
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP NOT NULL,
    location VARCHAR(255),
    max_capacity INTEGER,
    status event_status NOT NULL
);

CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    user_id INTEGER REFERENCES users(id),
    registration_date TIMESTAMP NOT NULL,
    status registration_status NOT NULL
);

CREATE TABLE user_activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    activity_type activity_type NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    details JSONB
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_rut ON users(rut);
CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_association_id ON memberships(association_id);
CREATE INDEX idx_family_members_family_id ON family_members(family_id);
CREATE INDEX idx_documents_created_by ON documents(created_by);
CREATE INDEX idx_projects_submitted_by ON projects(submitted_by);
CREATE INDEX idx_notifications_created_by ON notifications(created_by);
CREATE INDEX idx_news_author ON news(author);
CREATE INDEX idx_facility_bookings_facility_id ON facility_bookings(facility_id);
CREATE INDEX idx_facility_bookings_user_id ON facility_bookings(user_id);
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);

-- Eliminar índices
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_rut;
DROP INDEX IF EXISTS idx_memberships_user_id;
DROP INDEX IF EXISTS idx_memberships_association_id;
DROP INDEX IF EXISTS idx_family_members_family_id;
DROP INDEX IF EXISTS idx_documents_created_by;
DROP INDEX IF EXISTS idx_projects_submitted_by;
DROP INDEX IF EXISTS idx_notifications_created_by;
DROP INDEX IF EXISTS idx_news_author;
DROP INDEX IF EXISTS idx_facility_bookings_facility_id;
DROP INDEX IF EXISTS idx_facility_bookings_user_id;
DROP INDEX IF EXISTS idx_event_registrations_event_id;
DROP INDEX IF EXISTS idx_event_registrations_user_id;
DROP INDEX IF EXISTS idx_user_activities_user_id;

-- Eliminar tablas
DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS facility_bookings;
DROP TABLE IF EXISTS facilities;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS notification_recipients;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS family_members;
DROP TABLE IF EXISTS families;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS neighborhood_associations;
DROP TABLE IF EXISTS users;

-- Eliminar tipos ENUM
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS association_status;
DROP TYPE IF EXISTS membership_status;
DROP TYPE IF EXISTS document_type;
DROP TYPE IF EXISTS document_status;
DROP TYPE IF EXISTS project_status;
DROP TYPE IF EXISTS notification_type;
DROP TYPE IF EXISTS notification_status;
DROP TYPE IF EXISTS news_status;
DROP TYPE IF EXISTS facility_type;
DROP TYPE IF EXISTS facility_status;
DROP TYPE IF EXISTS booking_status;
DROP TYPE IF EXISTS event_status;
DROP TYPE IF EXISTS registration_status;
DROP TYPE IF EXISTS activity_type;
