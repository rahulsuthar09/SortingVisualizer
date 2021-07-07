const start = async () =>{
    let algoValue = Number(document.querySelector("#algo-menu").value)
    let speedValue = Number(document.querySelector("#speed-menu").value)
    let sizeValue = Number(document.querySelector("#size-menu").value)
    if(algoValue===0)
    {
        alert("No Algorithm Selected")
        return ;
    }
    if(sizeValue===0){
        alert("Select size of array first")
        return;
    }
    if(speedValue===0)
    {
        speedValue=1;
    }
    details(sizeValue,speedValue)
    let algorithm = new Algorithms(speedValue)
    var v1 = performance.now();
    if(algoValue===1)
    {  
        document.getElementById("algo").innerText="Bubble Sort"
        await algorithm.BubbleSort();
    }
    if(algoValue===2)
    {
        document.getElementById("algo").innerText="Selection Sort Sort"
        await algorithm.SelectionSort();
    }
    if(algoValue===3)
    {
        document.getElementById("algo").innerText="Merge Sort"
        await algorithm.MergeSort();
    }
    if(algoValue===4)
    {
        document.getElementById("algo").innerText="Quick Sort"
        await algorithm.QuickSort();
    }
    if(algoValue===5)
    {
        document.getElementById("algo").innerText="Insertion Sort"
        await algorithm.InsertionSort();
    }
    var v2 = performance.now();
    document.getElementById("time-taken").innerHTML=`${parseInt((v2-v1)/1000)} seconds`
};



const RenderScreen = async ()=>{
    let algoValue = Number(document.querySelector("#algo-menu").value)
    await RenderList();
}
const newArray= async() =>{
    let sizeValue = Number(document.querySelector("#size-menu").value)
    if(sizeValue===0){
        alert("Select size of array first")
        return;
    }
    await RenderList();
}
const RenderList = async() =>{
    let sizeValue= Number(document.querySelector("#size-menu").value)
    await clearScreen();
    let list = await randomList(sizeValue)
    const frameNode= document.querySelector(".frame")
    for(const element of list)
    {
        const barNode = document.createElement("div")
        barNode.className="bar"
        const itemNode = document.createElement("div")
        itemNode.className="item"
        itemNode.setAttribute("value",String(element))
        itemNode.style.height=`${4*element}px`
        barNode.appendChild(itemNode)
        frameNode.appendChild(barNode)
    }
}

const randomList = async(len) =>{
    let arr= new Array();
    let upperBound = 100;
    lowerBound= 5;
    for(let i=0;i<len;i++)
    {
        let randomNumber= Math.floor(Math.random()*(upperBound-lowerBound+1) + lowerBound)
        arr.push(parseInt(randomNumber))
    }
    return arr;
}



//clear screen function

const clearScreen= async() =>{
    document.querySelector(".frame").innerHTML="";
}
// data showcase
function details(size,speed) {
    document.getElementById("size").innerText=size
    document.getElementById("speed").innerText=`${speed}x (${parseInt(1000*speed/300)} comparision/s)`
    document.getElementById("comparision").innerText="Calculating"
    document.getElementById("time-taken").innerText="Calculating"
}

//   listners
document.querySelector("#start-btn").addEventListener("click", start);
document.querySelector("#size-menu").addEventListener("change", RenderScreen);
document.querySelector("#newarray-btn").addEventListener("click", newArray);
document.querySelector("#algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen();
