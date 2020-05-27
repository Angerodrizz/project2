document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('#myMessage').onkeyup = () => {
    if (document.querySelector('#myMessage').value.length > 0)
        document.querySelector('#sendbutton').disabled = false;
    else
        document.querySelector('#sendbutton').disabled = true;
    };


var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
socket.on('connect', () => {


    document.querySelector('#send_message').onsubmit = () => {


                const message = document.querySelector('#myMessage').value;
                const name = localStorage.getItem('user');
                const chosen_channel = localStorage.getItem('chosen_channel');
                socket.emit('message sent', {'message': message, 'name': name, 'room': chosen_channel});
                document.querySelector('#myMessage').value = '';
                document.querySelector('#sendbutton').disabled = true;

                return false;
            };

});

socket.on('prt message', data => {
    var new_message = data.slice(32);
    const li = document.createElement('li');
    li.innerHTML = new_message;

    var sid = data.slice(0,32);

   if (sid == socket.id)
      {
          li.className += "list1";
      }

   else li.className += "list";

   document.querySelector('#messages').prepend(li);
});

const chosen_channel = localStorage.getItem('chosen_channel');
document.querySelector('.channel_crt').innerHTML = `You are in ${chosen_channel}`;

//Personal Touch: logout

document.querySelectorAll("#salir").forEach(funct => {
    funct.onclick = () => {
        localStorage.clear()

    }
});

//Personal Touch 2: Hide Button

document.addEventListener('click', event => {
    const element = event.target;
    if (element.className === 'hide') {
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', () =>  {
            element.parentElement.remove();
        });
    }
});

});


