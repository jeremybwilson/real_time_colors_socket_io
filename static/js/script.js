$(document).ready(() => {
    
    var socket = io.connect();
    
    socket.on('now_btn', function(data){
        console.log('got from server >', data); //object: {now_btn: "white"}
        console.log('got from server >', JSON.stringify(data));// string {now_btn: "white"}
        console.log('got from server >', data.now_btn); //value: white
        $('#background-color').attr('style','background-color: '+ data.now_btn +';');
    })
    $('#green').click(function(){
        console.log('pressed GREEN btn');
        socket.emit('new_btn_green');
    })
    $('#blue').click(function(){
        console.log('pressed BLUE btn');
        socket.emit('new_btn_blue');
    })
    $('#pink').click(function(){
        console.log('pressed PINK btn');
        socket.emit('new_btn_pink');
    })

});