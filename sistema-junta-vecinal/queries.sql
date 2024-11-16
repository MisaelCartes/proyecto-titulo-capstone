-- INSERT USUARIOS

INSERT INTO public.usuarios_user (id, password, last_login, is_superuser, email, rut, last_name, phone_number, address, is_active, is_staff, role, photo, first_name, mother_last_name, date_of_birth)
VALUES 
(1, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 10:00:00', false, 'juan.perez@email.com', '12345678-9', 'Pérez', '+56912345678', 'Av. Principal 123, Santiago', true, false, 1, NULL, 'Juan', 'González', '1990-05-15'),

(2, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 11:00:00', false, 'maria.silva@email.com', '23456789-0', 'Silva', '+56923456789', 'Los Robles 456, Valparaíso', true, false, 1, NULL, 'María', 'Rodríguez', '1988-08-22'),

(3, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 12:00:00', true, 'admin@email.com', '34567890-1', 'Muñoz', '+56934567890', 'Las Condes 789, Santiago', true, true, 2, NULL, 'Carlos', 'López', '1985-03-30'),

(4, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 13:00:00', false, 'ana.torres@email.com', '45678901-2', 'Torres', '+56945678901', 'Viña del Mar 234, Viña del Mar', true, false, 1, NULL, 'Ana', 'Martínez', '1992-11-10'),

(5, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 14:00:00', false, 'pedro.ramirez@email.com', '56789012-3', 'Ramírez', '+56956789012', 'Maipú 567, Santiago', true, false, 1, NULL, 'Pedro', 'Sánchez', '1987-07-25'),

(6, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 15:00:00', false, 'laura.garcia@email.com', '67890123-4', 'García', '+56967890123', 'Providencia 890, Santiago', true, false, 1, NULL, 'Laura', 'Flores', '1995-01-18'),

(7, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 16:00:00', false, 'diego.castro@email.com', '78901234-5', 'Castro', '+56978901234', 'Recoleta 123, Santiago', true, false, 1, NULL, 'Diego', 'Vargas', '1991-09-05'),

(8, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 17:00:00', true, 'supervisor@email.com', '89012345-6', 'Morales', '+56989012345', 'La Florida 456, Santiago', true, true, 3, NULL, 'Carmen', 'Rojas', '1983-12-15'),

(9, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 18:00:00', false, 'roberto.diaz@email.com', '90123456-7', 'Díaz', '+56990123456', 'Conchalí 789, Santiago', true, false, 1, NULL, 'Roberto', 'Pizarro', '1993-04-28'),

(10, 'pbkdf2_sha256$600000$123456$8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '2024-03-13 19:00:00', false, 'sofia.mendez@email.com', '01234567-8', 'Méndez', '+56901234567', 'Ñuñoa 012, Santiago', true, false, 1, NULL, 'Sofía', 'Guzmán', '1989-06-20');

--insert solicitudes de certificado

-- Insertando registros para septiembre
INSERT INTO public.documents_certificaterequest (id, status, creation_date, rejection_reason, certificate_file, family_member_id, user_id)
VALUES
(7, 'rejected', '2024-09-01 17:13:45.984202-03', NULL, NULL, 3, NULL),
(8, 'approved', '2024-09-02 14:43:24.401867-03', NULL, NULL, 5, NULL),
(9, 'approved', '2024-09-04 21:34:14.421734-03', NULL, NULL, 5, NULL),
(10, 'requested', '2024-09-09 18:12:41.413003-03', NULL, NULL, 2, NULL),
(11, 'approved', '2024-09-09 18:12:26.055067-03', NULL, NULL, 2, NULL);

-- Insertando registros para noviembre
INSERT INTO public.documents_certificaterequest (id, status, creation_date, rejection_reason, certificate_file, family_member_id, user_id)
VALUES
(12, 'rejected', '2024-11-01 17:13:45.984202-03', NULL, NULL, 3, NULL),
(13, 'approved', '2024-11-02 14:43:24.401867-03', NULL, NULL, 5, NULL),
(14, 'approved', '2024-11-04 21:34:14.421734-03', NULL, NULL, 5, NULL);
