class Helper{
    constructor(time,list=[]){
        this.list= list
        this.time=parseInt(300/time)
    }
    mark = async(index)=>{
        this.list[index].setAttribute("class","item current")
    }
    unmark = async(index)=>{
        this.list[index].setAttribute("class", "item")
    }
    markSpl = async(index) =>{
        this.list[index].setAttribute("class","item markSpl")
    }
    pause = async() =>{
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve()
            },this.time)
        })
    }
    compare = async(index1,index2) =>{
        await this.pause()
        let value1= Number(this.list[index1].getAttribute("value"))
        let value2= Number(this.list[index2].getAttribute("value"))
        if(value1>value2)
        {
            return true
        }
        return false
    }
    swap = async(index1,index2) =>{
        await this.pause()
        let value1= this.list[index1].getAttribute("value")
        let value2= this.list[index2].getAttribute("value")
        this.list[index1].setAttribute("value" , value2)
        this.list[index1].style.height=`${4*value2}px`
        this.list[index2].setAttribute("value" , value1)
        this.list[index2].style.height=`${4*value1}px`

    }
}