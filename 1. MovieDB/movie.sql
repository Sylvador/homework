CREATE TABLE IF NOT EXISTS public.movie
(
    movie_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title text COLLATE pg_catalog."default" NOT NULL,
    writers character varying(64) COLLATE pg_catalog."default" NOT NULL,
    tagline text COLLATE pg_catalog."default",
    storyline text COLLATE pg_catalog."default",
    year integer NOT NULL,
    budget text COLLATE pg_catalog."default",
    marketing text COLLATE pg_catalog."default",
    gross_us text COLLATE pg_catalog."default",
    gross_worldwide text COLLATE pg_catalog."default",
    release_date_ru character varying(32) COLLATE pg_catalog."default",
    release_date_world character varying(32) COLLATE pg_catalog."default",
    length character varying(32) COLLATE pg_catalog."default" NOT NULL,
    rating numeric(2,2),
    country character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT pk_movie_id PRIMARY KEY (movie_id)
)

CREATE TABLE IF NOT EXISTS public.genre
(
    genre_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_genre_id PRIMARY KEY (genre_id)
)

CREATE TABLE IF NOT EXISTS public.movie_genre
(
    movie_id integer NOT NULL,
    genre_id integer NOT NULL,
    CONSTRAINT movie_genre_pk PRIMARY KEY (movie_id, genre_id),
    CONSTRAINT genre_id FOREIGN KEY (genre_id)
        REFERENCES public.genre (genre_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT movie_id FOREIGN KEY (movie_id)
        REFERENCES public.movie (movie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

CREATE TABLE IF NOT EXISTS public.person
(
    person_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(64) COLLATE pg_catalog."default" NOT NULL,
    role_type character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_person_id PRIMARY KEY (person_id)
)

CREATE TABLE IF NOT EXISTS public.movie_person
(
    movie_id integer NOT NULL,
    person_id integer NOT NULL,
    CONSTRAINT movie_person_pk PRIMARY KEY (movie_id, person_id),
    CONSTRAINT movie_id FOREIGN KEY (movie_id)
        REFERENCES public.movie (movie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT person_id FOREIGN KEY (person_id)
        REFERENCES public.person (person_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS public.view_by_country
(
    fk_movie_id integer NOT NULL,
    country character varying(64) COLLATE pg_catalog."default" NOT NULL,
    view_count integer NOT NULL DEFAULT 0,
    CONSTRAINT view_by_country_pkey PRIMARY KEY (country),
    CONSTRAINT fk_movie_id FOREIGN KEY (fk_movie_id)
        REFERENCES public.movie (movie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)
