const dumbPassword = "momo"

function getPassword() {
    let fetchPass = document.getElementById("pass").value;

    if (fetchPass === dumbPassword){
        window.location.href = "/home.html"
    }
    else {
        document.querySelector('#wrong').classList.add('reveal');
    }
}
let form = document.getElementById('form');
form.addEventListener('submit', getPassword);
