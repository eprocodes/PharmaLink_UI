--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

-- Started on 2025-06-22 14:27:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4867 (class 1262 OID 16398)
-- Name: PharmaLink_DB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "PharmaLink_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "PharmaLink_DB" OWNER TO postgres;

\connect "PharmaLink_DB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: admin_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_account (
    id integer NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(100) NOT NULL,
    admin_name character varying(100)
);


ALTER TABLE public.admin_account OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 215
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin_account.id;


--
-- TOC entry 220 (class 1259 OID 16424)
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    pharmacy_id integer,
    name character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(100)
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16423)
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_id_seq OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 219
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.customer.id;


--
-- TOC entry 222 (class 1259 OID 16439)
-- Name: medicine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicine (
    id integer NOT NULL,
    pharmacy_id integer,
    name character varying(100) NOT NULL,
    generic_name character varying(100),
    category character varying(100),
    manufacturer character varying(100),
    unit_price numeric(10,2) NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.medicine OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16438)
-- Name: medication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medication_id_seq OWNER TO postgres;

--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 221
-- Name: medication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medication_id_seq OWNED BY public.medicine.id;


--
-- TOC entry 226 (class 1259 OID 16486)
-- Name: medicine_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicine_order (
    id integer NOT NULL,
    customer_id integer,
    total_price numeric(10,2) NOT NULL,
    order_type character varying(20),
    status character varying(20),
    reminder text,
    order_date date DEFAULT CURRENT_DATE,
    CONSTRAINT medicine_order_order_type_check CHECK (((order_type)::text = ANY ((ARRAY['Delivery'::character varying, 'Pickup'::character varying])::text[]))),
    CONSTRAINT medicine_order_status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Delivered'::character varying, 'Canceled'::character varying])::text[])))
);


ALTER TABLE public.medicine_order OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16485)
-- Name: medicine_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicine_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicine_order_id_seq OWNER TO postgres;

--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 225
-- Name: medicine_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicine_order_id_seq OWNED BY public.medicine_order.id;


--
-- TOC entry 228 (class 1259 OID 16503)
-- Name: medicine_order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicine_order_item (
    id integer NOT NULL,
    order_id integer,
    medication_id integer,
    quantity integer NOT NULL,
    duration_days integer,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.medicine_order_item OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16502)
-- Name: medicine_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicine_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicine_order_item_id_seq OWNER TO postgres;

--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 227
-- Name: medicine_order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicine_order_item_id_seq OWNED BY public.medicine_order_item.id;


--
-- TOC entry 224 (class 1259 OID 16473)
-- Name: password_reset_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_token (
    id integer NOT NULL,
    user_id integer NOT NULL,
    role character varying(20) NOT NULL,
    token text NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


ALTER TABLE public.password_reset_token OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16472)
-- Name: password_reset_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.password_reset_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.password_reset_token_id_seq OWNER TO postgres;

--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 223
-- Name: password_reset_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.password_reset_token_id_seq OWNED BY public.password_reset_token.id;


--
-- TOC entry 218 (class 1259 OID 16412)
-- Name: pharmacy_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pharmacy_account (
    id integer NOT NULL,
    pharmacy_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    address text,
    mobile_phone character varying(50),
    status smallint DEFAULT 1,
    trial_expires_at timestamp without time zone DEFAULT (CURRENT_TIMESTAMP + '2 mons'::interval)
);


ALTER TABLE public.pharmacy_account OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16411)
-- Name: pharmacy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pharmacy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pharmacy_id_seq OWNER TO postgres;

--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 217
-- Name: pharmacy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pharmacy_id_seq OWNED BY public.pharmacy_account.id;


--
-- TOC entry 4664 (class 2604 OID 16403)
-- Name: admin_account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_account ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 4670 (class 2604 OID 16427)
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- TOC entry 4672 (class 2604 OID 16442)
-- Name: medicine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine ALTER COLUMN id SET DEFAULT nextval('public.medication_id_seq'::regclass);


--
-- TOC entry 4675 (class 2604 OID 16489)
-- Name: medicine_order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order ALTER COLUMN id SET DEFAULT nextval('public.medicine_order_id_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 16506)
-- Name: medicine_order_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order_item ALTER COLUMN id SET DEFAULT nextval('public.medicine_order_item_id_seq'::regclass);


--
-- TOC entry 4674 (class 2604 OID 16476)
-- Name: password_reset_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token ALTER COLUMN id SET DEFAULT nextval('public.password_reset_token_id_seq'::regclass);


--
-- TOC entry 4666 (class 2604 OID 16415)
-- Name: pharmacy_account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_account ALTER COLUMN id SET DEFAULT nextval('public.pharmacy_id_seq'::regclass);


--
-- TOC entry 4849 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: admin_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin_account VALUES (3, '$2a$10$kyLu03vLTRi4Vbe8oOKr5eUQ4ZMuokRWHuXhVwMouuhw6ZDAxoE6W', '2025-06-13 16:52:12.550882', 'amjadahmadieh5@gmail.com', 'Amjad');


--
-- TOC entry 4853 (class 0 OID 16424)
-- Dependencies: 220
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4855 (class 0 OID 16439)
-- Dependencies: 222
-- Data for Name: medicine; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4859 (class 0 OID 16486)
-- Dependencies: 226
-- Data for Name: medicine_order; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4861 (class 0 OID 16503)
-- Dependencies: 228
-- Data for Name: medicine_order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4857 (class 0 OID 16473)
-- Dependencies: 224
-- Data for Name: password_reset_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.password_reset_token VALUES (1, 2, 'pharmacist', '049e72ab0cffa5d2efd37ccc1dcd67d332eca792c44f6a89bcbf0bf46d8b3eb6', '2025-06-13 17:30:55.696');
INSERT INTO public.password_reset_token VALUES (2, 2, 'pharmacist', 'bb13f54b1b06003e91f92e3e8692caf8b686a7c238a62815b0ce12e196a33481', '2025-06-13 17:34:34.266');


--
-- TOC entry 4851 (class 0 OID 16412)
-- Dependencies: 218
-- Data for Name: pharmacy_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pharmacy_account VALUES (2, 'Pharmacy XYZ', 'amjadalahmadieh270@gmail.com', '1234567890', '$2a$10$xA9ta7jnPdDKLDhMwVTSIeBYR4ki8t5vOIFBtk81DexyqPvkcwLX.', '2025-06-13 17:02:12.416585', NULL, NULL, 1, '2025-08-19 18:55:24.41758');


--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 215
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 3, true);


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 219
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 1, false);


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 221
-- Name: medication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medication_id_seq', 1, false);


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 225
-- Name: medicine_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicine_order_id_seq', 1, false);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 227
-- Name: medicine_order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicine_order_item_id_seq', 1, false);


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 223
-- Name: password_reset_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.password_reset_token_id_seq', 5, true);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 217
-- Name: pharmacy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pharmacy_id_seq', 2, true);


--
-- TOC entry 4681 (class 2606 OID 16484)
-- Name: admin_account admin_account_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_account
    ADD CONSTRAINT admin_account_email_key UNIQUE (email);


--
-- TOC entry 4683 (class 2606 OID 16408)
-- Name: admin_account admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_account
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 4689 (class 2606 OID 16432)
-- Name: customer client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- TOC entry 4691 (class 2606 OID 16445)
-- Name: medicine medication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT medication_pkey PRIMARY KEY (id);


--
-- TOC entry 4699 (class 2606 OID 16508)
-- Name: medicine_order_item medicine_order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order_item
    ADD CONSTRAINT medicine_order_item_pkey PRIMARY KEY (id);


--
-- TOC entry 4697 (class 2606 OID 16496)
-- Name: medicine_order medicine_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order
    ADD CONSTRAINT medicine_order_pkey PRIMARY KEY (id);


--
-- TOC entry 4693 (class 2606 OID 16480)
-- Name: password_reset_token password_reset_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT password_reset_token_pkey PRIMARY KEY (id);


--
-- TOC entry 4695 (class 2606 OID 16482)
-- Name: password_reset_token password_reset_token_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT password_reset_token_token_key UNIQUE (token);


--
-- TOC entry 4685 (class 2606 OID 16422)
-- Name: pharmacy_account pharmacy_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_account
    ADD CONSTRAINT pharmacy_email_key UNIQUE (email);


--
-- TOC entry 4687 (class 2606 OID 16420)
-- Name: pharmacy_account pharmacy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_account
    ADD CONSTRAINT pharmacy_pkey PRIMARY KEY (id);


--
-- TOC entry 4700 (class 2606 OID 16433)
-- Name: customer client_pharmacy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT client_pharmacy_id_fkey FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacy_account(id) ON DELETE CASCADE;


--
-- TOC entry 4701 (class 2606 OID 16446)
-- Name: medicine medication_pharmacy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT medication_pharmacy_id_fkey FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacy_account(id) ON DELETE CASCADE;


--
-- TOC entry 4702 (class 2606 OID 16497)
-- Name: medicine_order medicine_order_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order
    ADD CONSTRAINT medicine_order_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE;


--
-- TOC entry 4703 (class 2606 OID 16514)
-- Name: medicine_order_item medicine_order_item_medication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order_item
    ADD CONSTRAINT medicine_order_item_medication_id_fkey FOREIGN KEY (medication_id) REFERENCES public.medicine(id) ON DELETE CASCADE;


--
-- TOC entry 4704 (class 2606 OID 16509)
-- Name: medicine_order_item medicine_order_item_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine_order_item
    ADD CONSTRAINT medicine_order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.medicine_order(id) ON DELETE CASCADE;


-- Completed on 2025-06-22 14:27:51

--
-- PostgreSQL database dump complete
--

