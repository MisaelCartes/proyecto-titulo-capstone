-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.auth_group
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_group_pkey PRIMARY KEY (id),
    CONSTRAINT auth_group_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.auth_group_permissions
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    group_id integer NOT NULL,
    permission_id integer NOT NULL,
    CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id),
    CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.auth_permission
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_permission_pkey PRIMARY KEY (id),
    CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename)
);

CREATE TABLE IF NOT EXISTS public.django_admin_log
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    action_time timestamp with time zone NOT NULL,
    object_id text COLLATE pg_catalog."default",
    object_repr character varying(200) COLLATE pg_catalog."default" NOT NULL,
    action_flag smallint NOT NULL,
    change_message text COLLATE pg_catalog."default" NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.django_content_type
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    app_label character varying(100) COLLATE pg_catalog."default" NOT NULL,
    model character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT django_content_type_pkey PRIMARY KEY (id),
    CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model)
);

CREATE TABLE IF NOT EXISTS public.django_migrations
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    app character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    applied timestamp with time zone NOT NULL,
    CONSTRAINT django_migrations_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.django_session
(
    session_key character varying(40) COLLATE pg_catalog."default" NOT NULL,
    session_data text COLLATE pg_catalog."default" NOT NULL,
    expire_date timestamp with time zone NOT NULL,
    CONSTRAINT django_session_pkey PRIMARY KEY (session_key)
);

CREATE TABLE IF NOT EXISTS public.juntas_neighborassociation
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    contact_email character varying(254) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(15) COLLATE pg_catalog."default" NOT NULL,
    territory_id integer NOT NULL,
    CONSTRAINT juntas_neighborassociation_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.noticias_noticia
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    tittle character varying(200) COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    image character varying(100) COLLATE pg_catalog."default",
    date_upload timestamp with time zone,
    date_vigencia timestamp with time zone,
    author character varying(200) COLLATE pg_catalog."default",
    category character varying(200) COLLATE pg_catalog."default",
    source character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT noticias_noticia_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.usuarios_membership
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    status integer,
    association_id bigint NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT usuarios_membership_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.usuarios_user
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    password character varying(128) COLLATE pg_catalog."default" NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(254) COLLATE pg_catalog."default",
    rut character varying(12) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(15) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    role integer,
    photo character varying(100) COLLATE pg_catalog."default",
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    mother_last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_user_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_user_rut_key UNIQUE (rut)
);

CREATE TABLE IF NOT EXISTS public.usuarios_user_groups
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    group_id integer NOT NULL,
    CONSTRAINT usuarios_user_groups_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_user_groups_user_id_group_id_7ca6624e_uniq UNIQUE (user_id, group_id)
);

CREATE TABLE IF NOT EXISTS public.usuarios_user_user_permissions
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    permission_id integer NOT NULL,
    CONSTRAINT usuarios_user_user_permissions_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_user_user_permi_user_id_permission_id_801d2da9_uniq UNIQUE (user_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.viviendas_family
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    family_name character varying(255) COLLATE pg_catalog."default",
    user_id bigint NOT NULL,
    housing_id bigint NOT NULL,
    CONSTRAINT viviendas_family_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.viviendas_familymember
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    relationship character varying(50) COLLATE pg_catalog."default" NOT NULL,
    date_of_birth date NOT NULL,
    email character varying(254) COLLATE pg_catalog."default",
    phone_number character varying(15) COLLATE pg_catalog."default",
    family_id bigint NOT NULL,
    rut character varying COLLATE pg_catalog."default",
    CONSTRAINT viviendas_familymember_pkey PRIMARY KEY (id),
    CONSTRAINT viviendas_familymember_rut_key UNIQUE (rut)
);

CREATE TABLE IF NOT EXISTS public.viviendas_housing
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    housing_type character varying(50) COLLATE pg_catalog."default",
    latitude character varying(255) COLLATE pg_catalog."default",
    longitude character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT viviendas_housing_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id)
    REFERENCES public.auth_permission (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS auth_group_permissions_permission_id_84c5c92e
    ON public.auth_group_permissions(permission_id);


ALTER TABLE IF EXISTS public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id)
    REFERENCES public.auth_group (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS auth_group_permissions_group_id_b120cbf9
    ON public.auth_group_permissions(group_id);


ALTER TABLE IF EXISTS public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id)
    REFERENCES public.django_content_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS auth_permission_content_type_id_2f476e4b
    ON public.auth_permission(content_type_id);


ALTER TABLE IF EXISTS public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id)
    REFERENCES public.django_content_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS django_admin_log_content_type_id_c4bce8eb
    ON public.django_admin_log(content_type_id);


ALTER TABLE IF EXISTS public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_usuarios_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS django_admin_log_user_id_c564eba6
    ON public.django_admin_log(user_id);


ALTER TABLE IF EXISTS public.usuarios_membership
    ADD CONSTRAINT usuarios_membership_association_id_c482f138_fk_juntas_ne FOREIGN KEY (association_id)
    REFERENCES public.juntas_neighborassociation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS usuarios_membership_association_id_c482f138
    ON public.usuarios_membership(association_id);


ALTER TABLE IF EXISTS public.usuarios_membership
    ADD CONSTRAINT usuarios_membership_user_id_57d080a3_fk_usuarios_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS usuarios_membership_user_id_57d080a3
    ON public.usuarios_membership(user_id);


ALTER TABLE IF EXISTS public.usuarios_user_groups
    ADD CONSTRAINT usuarios_user_groups_group_id_ce48ebfd_fk_auth_group_id FOREIGN KEY (group_id)
    REFERENCES public.auth_group (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS usuarios_user_groups_group_id_ce48ebfd
    ON public.usuarios_user_groups(group_id);


ALTER TABLE IF EXISTS public.usuarios_user_groups
    ADD CONSTRAINT usuarios_user_groups_user_id_327741ca_fk_usuarios_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS usuarios_user_groups_user_id_327741ca
    ON public.usuarios_user_groups(user_id);


ALTER TABLE IF EXISTS public.usuarios_user_user_permissions
    ADD CONSTRAINT usuarios_user_user_p_permission_id_32dd035e_fk_auth_perm FOREIGN KEY (permission_id)
    REFERENCES public.auth_permission (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS usuarios_user_user_permissions_permission_id_32dd035e
    ON public.usuarios_user_user_permissions(permission_id);


ALTER TABLE IF EXISTS public.usuarios_user_user_permissions
    ADD CONSTRAINT usuarios_user_user_p_user_id_6770e840_fk_usuarios_ FOREIGN KEY (user_id)
    REFERENCES public.usuarios_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS usuarios_user_user_permissions_user_id_6770e840
    ON public.usuarios_user_user_permissions(user_id);


ALTER TABLE IF EXISTS public.viviendas_family
    ADD CONSTRAINT viviendas_family_housing_id_ba3f0380_fk_viviendas_housing_id FOREIGN KEY (housing_id)
    REFERENCES public.viviendas_housing (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS viviendas_family_housing_id_ba3f0380
    ON public.viviendas_family(housing_id);


ALTER TABLE IF EXISTS public.viviendas_family
    ADD CONSTRAINT viviendas_family_user_id_c3fc2066_fk_usuarios_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS viviendas_family_user_id_c3fc2066
    ON public.viviendas_family(user_id);


ALTER TABLE IF EXISTS public.viviendas_familymember
    ADD CONSTRAINT viviendas_familymemb_family_id_c0cccb9c_fk_viviendas FOREIGN KEY (family_id)
    REFERENCES public.viviendas_family (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS viviendas_familymember_family_id_c0cccb9c
    ON public.viviendas_familymember(family_id);

END;