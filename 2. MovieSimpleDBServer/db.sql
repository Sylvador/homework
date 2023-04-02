CREATE TABLE IF NOT EXISTS public.movie
(
    movie_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title character varying(64) COLLATE pg_catalog."default",
    release_year integer,
    CONSTRAINT movie_id_pk PRIMARY KEY (movie_id)
)

CREATE TABLE IF NOT EXISTS public.genre
(
    genre_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT genre_id_pk PRIMARY KEY (genre_id)
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
)