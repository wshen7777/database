CREATE DATABASE sales;

CREATE USER 'mike'@'%' IDENTIFIED WITH mysql_native_password BY 'Mike@123';

GRANT ALL ON sales.* TO 'mike'@'%';

CREATE TABLE raw_data(
    invoice varchar(32),
 	branch varchar(32),
   	city varchar(32),
    customer_type varchar(32),
    gender varchar(32),
    product_line varchar(32),
    total float,
    payment varchar(32),
    gross_income float,
    rating float
);

-- path of the csv file
load data local infile '/Users/chiaweishen/Downloads/mike/database/supermarket_sales - Sheet1.csv' 
into table raw_data fields terminated by ',' lines terminated by '\n'
ignore 1 lines;