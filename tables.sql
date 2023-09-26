CREATE TABLE branch (
    branch_id int PRIMARY KEY AUTO_INCREMENT,
    city_name varchar(32),
    branch varchar(32)
);

CREATE TABLE customer (
    customer_id int PRIMARY KEY AUTO_INCREMENT,
    invoice varchar(32),
    customer_type varchar(32),
    branch_id int,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id) ON DELETE CASCADE
);

CREATE TABLE gender (
    gender_id int PRIMARY KEY AUTO_INCREMENT,
    gender varchar(32) 
);

CREATE TABLE customer_gender (
    customer_gender_id int PRIMARY KEY AUTO_INCREMENT,
    customer_id int,
    gender_id int,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE
);

CREATE TABLE payment (
    payment_id int PRIMARY KEY AUTO_INCREMENT,
    method varchar(32)
);

CREATE TABLE product (
    product_id int PRIMARY KEY AUTO_INCREMENT,
    product_line varchar(32),
    total_sold float,
    gross_income float,
    customer_id int,
    payment_id int,
    rating float,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id) ON DELETE CASCADE
);
