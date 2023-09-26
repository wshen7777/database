-- question 1
SELECT product.product_line , gender.gender , count(*) as count
FROM product 
JOIN customer_gender
ON product.customer_id = customer_gender.customer_id
JOIN gender
ON gender.gender_id = customer_gender.gender_id
GROUP BY gender.gender , product.product_line;

-- question 2
SELECT product.product_line , customer.customer_type , COUNT(*) as count
FROM product 
JOIN customer
ON product.customer_id = customer.customer_id
GROUP BY customer.customer_type , product.product_line

-- question 3
SELECT product_line , SUM(gross_income) as sum
FROM product
GROUP BY product_line
ORDER BY sum DESC;                                                                                                                                                                      `