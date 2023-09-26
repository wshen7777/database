INSERT INTO gender (gender)
SELECT DISTINCT gender
FROM raw_data;

INSERT INTO branch (branch,city_name)
SELECT DISTINCT branch,city
FROM raw_data;

INSERT INTO payment (method)
SELECT DISTINCT payment
FROM raw_data;

INSERT INTO customer (invoice , customer_type , branch_id)
SELECT raw_data.invoice , raw_data.customer_type , branch.branch_id 
FROM raw_data
JOIN branch
ON raw_data.city = branch.city_name
AND raw_data.branch = branch.branch;

INSERT INTO customer_gender (customer_id , gender_id)
SELECT DISTINCT customer.customer_id,gender.gender_id
FROM customer
LEFT JOIN raw_data
ON customer.customer_type = raw_data.customer_type AND customer.invoice = raw_data.invoice
JOIN gender 
ON gender.gender = raw_data.gender;

INSERT INTO product (product_line , total_sold ,gross_income , payment_id , customer_id , rating)
SELECT DISTINCT raw_data.product_line , raw_data.total , raw_data.gross_income , payment.payment_id , customer.customer_id , raw_data.rating
FROM payment
JOIN raw_data
ON raw_data.payment = payment.method
JOIN customer
ON raw_data.invoice =customer.invoice;