-- schema.sql (create tables + seed)
CREATE TABLE IF NOT EXISTS stocks (
  id serial PRIMARY KEY,
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  price numeric(12,2) DEFAULT 0,
  quantity integer DEFAULT 0,
  min_qty integer DEFAULT 0,
  image_url text,
  last_update timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS spr_history (
  id serial PRIMARY KEY,
  code text,
  name text,
  quantity integer,
  requester text,
  status text,
  timestamp timestamptz DEFAULT now(),
  image_url text
);

CREATE TABLE IF NOT EXISTS pr_history (
  id serial PRIMARY KEY,
  code text,
  name text,
  quantity integer,
  requester text,
  job_code text,
  remark text,
  status text,
  timestamp timestamptz DEFAULT now(),
  image_url text
);

CREATE TABLE IF NOT EXISTS stock_history (
  id serial PRIMARY KEY,
  time timestamptz DEFAULT now(),
  code text,
  name text,
  change_text text,
  type text,
  admin_user text
);

-- sample seed data
INSERT INTO stocks(code,name,price,quantity,min_qty,image_url)
VALUES
('ITEM001','ปากกา',15.50,5,10,NULL),
('ITEM002','กระดาษ A4',120.00,25,10,NULL),
('ITEM003','คลิปหนีบกระดาษ',8.00,100,30,NULL);

INSERT INTO spr_history(code,name,quantity,requester,status)
VALUES ('ITEM001','ปากกา',2,'นายน้อย','done'),
       ('ITEM002','กระดาษ A4',10,'นางสาวใจดี','pending');

INSERT INTO pr_history(code,name,quantity,requester,job_code,remark,status)
VALUES ('ITEM004','หมึกพิมพ์',1,'แผนกไอที','JOB123','ด่วน','pending');

INSERT INTO stock_history(code,name,change_text,type,admin_user)
VALUES ('ITEM001','ปากกา','+5','นำเข้า','admin1'),
       ('ITEM002','กระดาษ A4','-10','เบิก','admin2');
