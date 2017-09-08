CREATE TABLE  customer(id SERIAL, firstName VARCHAR(200), email VARCHAR(200), CONSTRAINT id_pk PRIMARY KEY(id));

CREATE TABLE category(id SERIAL, categoryName VARCHAR(200), CONSTRAINT id_pkC PRIMARY KEY (id));

CREATE TABLE product(id SERIAL, productName varchar(200), CONSTRAINT id_pro PRIMARY KEY (id));

CREATE TABLE orders(order_id SERIAL CONSTRAINT ord_id PRIMARY KEY , customer_id INTEGER REFERENCES customer (id), status VARCHAR(50), date TIMESTAMP);

CREATE TABLE orderDetails(order_id INTEGER REFERENCES orders(order_id), product_id INTEGER REFERENCES product(id), quantity INTEGER,date TIMESTAMP ,CONSTRAINT compositeKey PRIMARY KEY (order_id,product_id));

CREATE TABLE ProductCategories(product_id INTEGER REFERENCES product(id), category_id INTEGER REFERENCES category(id), CONSTRAINT composite PRIMARY KEY (product_id,category_id));
