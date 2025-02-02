let rowsButtonElement = document.getElementsByClassName('rows-btn')[0];
let rowsInputElement = document.getElementsByClassName('rows-input')[0];
let blockEle = document.getElementsByClassName('block-el')[0];
let tableBodyElement = document.getElementById('table-body');
let layoutBntElement = document.getElementById('layout-btn');
let numberOfRows = 0;
let block1Inputs=[];
let block2Inputs=[];
rowsButtonElement.addEventListener('click', function() {
    numberOfRows = rowsInputElement.value;
    tableBodyElement.innerHTML = '';
    for(let i=0;i<numberOfRows;i++) {
        let rowElement = document.createElement('tr');

        let col1 = document.createElement('td');
        col1.textContent = `R${i + 1}`; 

        let col2=document.createElement('td');
        let inputElement1 = document.createElement('input');
        inputElement1.type = 'number';
        inputElement1.className = 'block-input';
        col2.appendChild(inputElement1);

        let col3=document.createElement('td');
        let inputElement2 = document.createElement('input');
        inputElement2.type = 'number';
        inputElement2.className = 'block-input';
        col3.appendChild(inputElement2);

        rowElement.appendChild(col1);
        rowElement.appendChild(col2);
        rowElement.appendChild(col3);
        tableBodyElement.appendChild(rowElement);
    }
});

layoutBntElement.addEventListener('click', function() {

    let blockInputs = document.getElementsByClassName('block-input');
    let blockValues = [];
    for(let i=0;i<blockInputs.length;i++) {
        blockValues.push(blockInputs[i].value);
    }

    blockValues.reverse();
    for(let i=0;i<blockValues.length;i+=2){

        let block1Value = blockValues[i+1];
        let block2Value = blockValues[i];

        block1Inputs.push(block1Value);
        block2Inputs.push(block2Value);
        let rowOuterDiv1=document.createElement('div');
        let rowOuterDiv2=document.createElement('div');
        rowOuterDiv1.className = 'row-outer-div';
        rowOuterDiv2.className = 'row-outer-div';  

    }
    createCurvedSeats(numberOfRows,block2Inputs,block1Inputs);
})

function createCurvedSeats(rows, block2Inputs, block1Inputs) {

    blockEle.innerHTML = '';

    const container1 = document.getElementById('seatContainer1');
    const container2 = document.getElementById('seatContainer2');

    const max1 = Math.max(...block1Inputs);
    const max2 = Math.max(...block2Inputs);
    const maxi = Math.max(max1, max2);

    const centerX = 700;
    const centerY = 700;

    for (let row = 0; row < rows; row++) {
        const radius = 550 - row * 50;

        for (let i = block1Inputs[row] - 1; i >= 0; i--) {
            const angle = -Math.PI / 2 - (Math.PI / 2) * (i / (maxi - 1));
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.style.left = `${x}px`;
            seat.style.top = `${y}px`;

            seat.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
            seat.textContent = i+1; 
            container1.appendChild(seat);
        }

        for (let i = 0; i < block2Inputs[row]; i++) {
            const angle = (Math.PI / 2) * (i / (maxi - 1)) - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) + 100;
            const y = centerY + radius * Math.sin(angle);

            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.style.left = `${x}px`;
            seat.style.top = `${y}px`;

            seat.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
            seat.textContent = i + 1;
            container2.appendChild(seat);
        }
    }
}


   


