let startBtn = document.querySelector('.startBtn button');
let optionBtn = document.querySelector('.optionBtn');

startBtn.addEventListener('click', ()=> {
    startBtn.style.display='none';
    optionBtn.removeAttribute('hidden');
});

let userBtn=document.querySelector('.user');
userBtn.addEventListener('click',()=>{
    document.location.href='../user.html';
})

let computerBtn=document.querySelector('.computer');
computerBtn.addEventListener('click',()=>{
    document.location.href='../computer.html';
})