// MIT License
// Copyright (c) 2020 Luis Espino

function reflexAgent(location, state) {
   	if (state=="DIRTY") 
       return "CLEAN";
   	else if (location=="A") 
       return "RIGHT";
   	else
       return "LEFT";
}

function test(states) {
    let location = states[0];
    let state = states[0] == "A" ? states[1] : states[2];
    let action = reflexAgent(location, state);

    document.getElementById("log").innerHTML += `<br><strong>State:</strong> ${states[1]} - ${states[2]}`;
    document.getElementById("log").innerHTML += `<br><strong>Location: ${location}</strong> | Action: ${action}<br>`;

    if (action == "CLEAN"){
    	if (location == "A")
            states[1] = "CLEAN";
        else if (location == "B")
            states[2] = "CLEAN";
    }else if (action == "RIGHT")
        states[0] = "B";
    else if (action == "LEFT")
      states[0] = "A";

    count();

    randomDirty();

    const flag = checkIfDone(counter);

    document.getElementById("summary").innerHTML = 
    `<table class="table">
        <thead>
        <tr>
            <th>S0</th>
            <th>S1</th>
            <th>S2</th>
            <th>S3</th>
            <th>S4</th>
            <th>S5</th>
            <th>S6</th>
            <th>S7</th>
        </tr>
        <tbody>
            ${getCounterRow()}
        </tbody>
        </thead>
    </table>`;

    if(flag)
        document.getElementById("log").innerHTML += `<br>TERMINADO`;
    else
        setTimeout(() => { test(states); }, 2000);
}

function getCounterRow(){
    let row = '';
    for (let i = 0; i < counter.length; i++) {
        row += `<td>${counter[i]}</td>`
    }
    return row;
}

function count() {
    if(states[0] === "A") {
        if(states[1] === "DIRTY" && states[2] === "DIRTY"){
            counter[0]++;
        }else if(states[1] === "CLEAN" && states[2] === "DIRTY"){
            counter[1]++;
        }else if(states[1] === "CLEAN" && states[2] === "CLEAN"){
            counter[4]++;
        }else if(states[1] === "DIRTY" && states[2] === "CLEAN"){
            counter[5]++;
        }
    }else{
        if(states[1] === "CLEAN" && states[2] === "DIRTY"){
            counter[2]++;
        }else if(states[1] === "CLEAN" && states[2] === "CLEAN"){
            counter[3]++;
        }else if(states[1] === "DIRTY" && states[2] === "DIRTY"){
            counter[6]++;
        }else if(states[1] === "DIRTY" && states[2] === "CLEAN"){
            counter[7]++;
        }
    }
}

function randomDirty() {
    let random = Math.floor(Math.random() * 3);
    console.log(random);
    if(random === 0){//Dirty A
        states[1] = "DIRTY";
    }else if(random === 1){//Dirty B
        states[2] = "DIRTY";
    }
}

function checkIfDone(array) {
    for (let i = 0; i < array.length; i++) {
        if(array[i] < 2)
            return false;
    }
    return true;
}

//Initial state and counter
const states = ["A","DIRTY","DIRTY"];
const counter = [1, 0, 0, 0, 0, 0, 0, 0];

test(states);