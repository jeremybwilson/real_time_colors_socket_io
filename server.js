const express = require("express");
const session = require('express-session');
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;
// invoke express and store the result in the variable app
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    console.log('getting to index');
    response.render('index', { title: 'Real time colors (Optional)' });
});

// const server = app.listen(1337);
const server = app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way
const io = require('socket.io')(server);

let now_btn = 'white';

io.on('connection', (socket)  => {
    console.log('user connection detected');
    io.emit('now_btn', {now_btn: now_btn});

    //listen GREEN
    socket.on('new_btn_green', function(){
        console.log('user pressed GREEN btn');
        now_btn = 'green';
        io.emit('now_btn', {now_btn: now_btn});
    })
    //listen RED
    socket.on('new_btn_blue', function(){
        console.log('user pressed BLUE btn');
        now_btn = 'blue';
        io.emit('now_btn', {now_btn: now_btn});
    })
    //listen PINK
    socket.on('new_btn_pink', function(){
        console.log('user pressed PINK btn');
        now_btn = 'pink';
        io.emit('now_btn', {now_btn: now_btn});
    })
});


// catch 404 and forward to error handler
app.use((request, response, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, request, response, next) => {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    response.status(err.status || 500);
    // render the error page
    response.render('error', {title: 'Error page'});
  });

// app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way