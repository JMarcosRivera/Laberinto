let S = 0;
let E = 35;
let rows = 4;
let columns = 9;
let Size_Matrix = 36;
let movx = [0 , 0 , 1 , -1];
let movy = [1 , -1 , 0 , 0];

///****************Clases****************** */

class queue{
    
    constructor(){
        this.items = [];
    }
    
    push(x){
        this.items.push(x);
    }

    pop(){
        if(this.items.length == 0)return;
        this.items.shift();
    }

    front(){
        if(this.items.length == 0)return null;
        return this.items[0];
    }

    size(){
        return this.items.length;
    }

    empty(){
        return this.items.length==0;
    }
}

///**************************************** */

calcRow = (n) => {
    let div = parseInt(n/columns);
    return div;  
} 
calcColumn = (n) =>{
    let div = parseInt(n) % columns;
    return div;
}

movimientos = (n) =>{

    let col = calcColumn(n);
    let row = calcRow(n);

    let nextCells = [];
    for(let k=0;k<4;k++){
        let newCol = col + movy[k];
        let newRow = row + movx[k];
        if(newCol < columns && newCol >= 0 && newRow < rows && newRow >= 0){
            nextCells.push([newRow , newCol]);
        }
    }

    return nextCells;
}

calcIntCell = (i , j) =>{
    let intI = parseInt(i);
    let intJ = parseInt(j);
    let res = (intI * columns) + intJ;
    return res;
}

defineStart = (n) =>{
    S = n;
}
defineEnd = (n) =>{
    E = n;
}

function BFS(){
    let mk = Array(Size_Matrix).fill(0);
    let parent = Array(Size_Matrix).fill(-1);
    let q = new queue();

    q.push(S);
    mk[S] = 1;

    while(q.size() > 0){
        let ac = q.front();
        q.pop();

        let movs = movimientos(ac);

        for(let k=0;k<movs.length;k++){
            let newCell = calcIntCell(movs[k][0],movs[k][1]);
            if(!mk[newCell]){
                mk[newCell] = 1;
                q.push(newCell);
                parent[newCell] = ac;
            }
        }
    }
    let ac = E;
    let path = [];
    while(true){
        path.push(ac);
        if(parent[ac] == -1)break;
        ac = parent[ac];
    }
    path.reverse();
    return path;
}

function drawPath(){
    let path = BFS();

    let myMatrix = document.getElementsByClassName("cell");

    const styleMarcado = {
        backgroundColor : "blue",
    };
    
    for(let k=0;k<path.length;k++){
        Object.assign(myMatrix[path[k]].style,styleMarcado);

    }
}

drawPath();
