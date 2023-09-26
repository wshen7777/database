const express = require('express');
const mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
const app = express();
const webPort = 8088;
const path = require('path');
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.engine('html', mustacheExpress());   
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(webPort, function () {
    console.log("Server started , listen to " + webPort);
});
const mysql = require('mysql');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'mike',
        password: 'Mike@123',
        database: 'sales'
    }
)

db.connect((err) => {
    if (err) {
        print(err);
        throw err;
    }
    console.log("Connected to database");
});

app.get('/', function(req, res){
    res.render('index.html');

})

app.get('/artist', function (req, res) {
    res.render('artist.html');

})

app.get('/track', function (req, res) {
    res.render('track.html');

})

app.get('/genre', function (req, res) {
    res.render('genre.html');

})

app.get('/gender', function (req, res) {
    query = 'SELECT product.product_line , gender.gender , count(*) as count FROM product JOIN customer_gender ON product.customer_id = customer_gender.customer_id JOIN gender ON gender.gender_id = customer_gender.gender_id GROUP BY gender.gender , product.product_line;'
    db.query(query, (err, result) => {
        if (err) {
            res.redirect("/");
        }
        res.render('gender.html',
            {
                result: result,
            })
    })
})

app.get('/member', function (req, res) {
    query = 'SELECT product.product_line , customer.customer_type , COUNT(*) as count FROM product JOIN customer ON product.customer_id = customer.customer_id GROUP BY customer.customer_type , product.product_line'
    db.query(query, (err, result) => {
        if (err) {
            res.redirect("/");
        }
        res.render('member.html',
            {
                result: result,
            })
    })
})

app.get('/income', function (req, res) {
    query = 'SELECT product_line , SUM(gross_income) as sum FROM product GROUP BY product_line ORDER BY sum DESC; '
    db.query(query, (err, result) => {
        if (err) {
            res.redirect("/");
        }
        res.render('income.html',
            {
                result: result,
            })
    })
})

app.get('/genre-info', function (req, res) {
    inYear = req.query.genre_y
    if(inYear == 'all')
    {
        var query = "SELECT g.genre_name , count(*) as count FROM track t JOIN track_genre tg ON t.track_id = tg.track_id JOIN genre g ON g.genre_id = tg.genre_id GROUP BY g.genre_name ORDER BY count DESC LIMIT 10;"
        var y = '2018-2022'
    }else{
        // var query = "SELECT g.genre_name, count(*) as count FROM track t JOIN genre g on t.track_id = g.track_id where t.inYear = " + inYear +" GROUP BY g.genre_name ORDER BY count(*) DESC LIMIT 10;";
        var query = "SELECT g.genre_name , count(*) as count FROM track t JOIN track_genre tg ON t.track_id = tg.track_id JOIN genre g ON g.genre_id = tg.genre_id WHERE t.inYear ="+ inYear +" GROUP BY g.genre_name ORDER BY count DESC LIMIT 10;"
        var y = inYear
    }
    db.query(query, (err, result) => {
        if (err) {
            res.redirect("/");
        }
        res.render('genre-info.html',
            {
                tracks: result,
                y : y
            })
    })
})

app.get('/most-winner', function (req, res) {
    var query = 'SELECT track.track_name , artist.artist_name , track.danceability , track.popularity, track.valence , track.energy , track.tempo , track.loudness , track.speechiness , track.instrumentalness, track.liveness , track.acousticness , track.track_key , count(*) as count FROM track JOIN artist ON track.artist_id = artist.artist_id GROUP BY track.track_name , artist.artist_name , track.danceability , track.popularity, track.valence , track.energy , track.tempo , track.loudness , track.speechiness , track.instrumentalness,track.liveness , track.acousticness , track.track_key HAVING count>1 ORDER BY count DESC , track.popularity DESC;'
    db.query(query, (err, result) => {
        if (err) {
            res.redirect("/");
        }
        res.render('most-winner.html',
            {
                tracks: result,

            })
    })
})