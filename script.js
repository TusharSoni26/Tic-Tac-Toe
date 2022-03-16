const selectBox = document.querySelector(".select-box"),
selectAbtn = selectBox.querySelector(".playerA"),
selectBbtn = selectBox.querySelector(".playerB"),
playBoard = document.querySelector(".playBoard"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result"),
replayBtn = resultBox.querySelector(".btn button"),
wonText = resultBox.querySelector(".won");

const selectMode = document.querySelector(".select-mode"),
selectModeABtn = selectMode.querySelector(".modeA"),
selectModeBBtn = selectMode.querySelector(".modeB");

let flag = 0,turn=0;

window.onload = ()=>{
    selectAbtn.onclick = ()=>{
        selectBox.classList.add("hide");
        selectMode.classList.add("show");
    }
    selectBbtn.onclick = ()=>{
        selectBox.classList.add("hide");
        selectMode.classList.add("show");
        players.setAttribute("class","players active player");
    }
    selectModeABtn.onclick = ()=>{
        selectMode.classList.replace("show","hide");
        playBoard.classList.add("show");
    }
    selectModeBBtn.onclick = ()=>{
        selectMode.classList.replace("show","hide");
        playBoard.classList.add("show");
        flag = 1;
    }

    for(let i = 0; i < allBox.length; i++)
    {
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
}

let playerXicon = "fas fa-times";
let playerOicon = "far fa-circle";
let playerSign = "X";

function clickedBox(element)
{
    if(flag == 0)
    {   
        if(players.classList.contains("player"))
        {
            playerSign = "O";
            element.innerHTML = `<i class="${playerOicon}"></i>`;
            players.classList.remove("active");
            element.setAttribute("id",playerSign);
        }
        else
        {
            element.innerHTML = `<i class="${playerXicon}"></i>`;
            players.classList.add("active");
            element.setAttribute("id",playerSign);
        }
        selectWinner(playerSign);
        playBoard.style.pointerEvents = "auto";
        element.style.pointerEvents = "none";
        setTimeout(()=>{
            botClicked();
        },1000);
    }
    else
    {
        if(turn == 0)
        {
            if(players.classList.contains("player"))
            {
                playerSign = "O";
                element.innerHTML = `<i class="${playerOicon}"></i>`;
                players.classList.remove("active");
                element.setAttribute("id",playerSign);
            }
            else
            {
                element.innerHTML = `<i class="${playerXicon}"></i>`;
                players.classList.add("active");
                element.setAttribute("id",playerSign);
            }
            selectWinner(playerSign);
            playBoard.style.pointerEvents = "auto";
            element.style.pointerEvents = "none";
            turn = 1;
        }
        else
        {
            playerSign = "O";
            let array = [];
            for(let i = 0;i<allBox.length; i++)
            {
                if(allBox[i].childElementCount == 0)
                {
                    array.push(i);
                }
            }
            // let randomBox = array[Math.floor(Math.random() * array.length)];
            if(array.length > 0)
            {
                if(players.classList.contains("player"))
                {
                    playerSign = "X";
                    element.innerHTML = `<i class="${playerXicon}"></i>`;
                    players.classList.add("active");
                    element.setAttribute("id",playerSign);
                }
                else
                {
                    element.innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    element.setAttribute("id",playerSign);
                }
                element.style.pointerEvents = "none";
                selectWinner(playerSign);
            }
            playBoard.style.pointerEvents = "auto";
            playerSign = "X";
            turn = 0;
        }
    }
}

function botClicked()
{
    playerSign = "O";
    let array = [];
    for(let i = 0;i<allBox.length; i++)
    {
        if(allBox[i].childElementCount == 0)
        {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length > 0)
    {
        if(players.classList.contains("player"))
        {
            playerSign = "X";
            allBox[randomBox].innerHTML = `<i class="${playerXicon}"></i>`;
            players.classList.add("active");
            allBox[randomBox].setAttribute("id",playerSign);
        }
        else
        {
            allBox[randomBox].innerHTML = `<i class="${playerOicon}"></i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",playerSign);
        }
        allBox[randomBox].style.pointerEvents = "none";
        selectWinner(playerSign);
    }
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
}

function getID(idname){
    return document.querySelector(".box" + idname).id;
}

function checkClass(val1,val2,val3,sign){
    if(getID(val1) == sign && getID(val2) == sign && getID(val3) == sign)
    {
        return true;
    }
}

function selectWinner(playsign){
    console.log(playerSign);
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign))
    {
        setTimeout(()=>{
            playBoard.classList.replace("show","hide");
            resultBox.classList.add("show");
        },800)
        wonText.innerHTML = `Player ${playerSign} has won the game!`;
    }
    else
    {
        if(getID(1) != "" && getID(2) != "" && getID(3) != "" && getID(4) != "" &&getID(5) != "" && getID(6) != "" && getID(7) != "" && getID(8) != "" && getID(9) != "" )
        {
            setTimeout(()=>{
                playBoard.classList.replace("show","hide");
                resultBox.classList.add("show");
            },800)
            wonText.innerHTML = `Match has been drawn`;
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}
