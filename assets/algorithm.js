class Algorithms{
    
    constructor(time){
        this.list = document.querySelectorAll(".item")
        this.time = time
        this.size = this.list.length
        this.help = new Helper(this.time,this.list)
        this.count= 0
    }

    //BUBBLE SORT

    BubbleSort = async() =>{
        for(let i = 0; i < this.size - 1; i++)
        {
            for(let j = 0; j < this.size - i - 1; j++)
            {
                this.count++
                await this.help.mark(j)
                await this.help.mark(j+1)
                if(await this.help.compare(j,j+1))
                {
                    await this.help.swap(j,j+1)
                }
                await this.help.unmark(j)
                await this.help.unmark(j+1)
            }
            this.list[this.size-i-1].setAttribute("class", "item done")
        }
        this.list[0].setAttribute("class", "item done")
        document.getElementById("comparision").innerHTML=this.count
    }

    //SELECTION SORT

    SelectionSort = async() =>{
        for(let i=0;i<this.size;i++)
        { 
            let idx=i;
            for(let j=i+1;j<this.size;j++)
            {
                this.count++
                await this.help.markSpl(idx)
                await this.help.mark(j)
                if(await this.help.compare(idx,j))
                {
                    await this.help.unmark(idx)
                    idx=j
                }
                await this.help.unmark(j)
                await this.help.markSpl(idx)
            }
            await this.help.pause()
            await this.help.swap(idx,i)
            await this.help.unmark(idx)
            this.list[i].setAttribute("class", "item done")
        }
        document.getElementById("comparision").innerHTML=this.count
    }

    // INSERTION SORT
    InsertionSort = async()=>{
        for(let i=0;i<this.size-1;i++){
            let j=i
            while(j>=0 && await this.help.compare(j,j+1))
            {
                this.count++
                await this.help.mark(j)
                await this.help.mark(j+1)
                await this.help.pause();
                await this.help.swap(j,j+1)
                await this.help.unmark(j)
                await this.help.unmark(j+1)
                j--
            }
            await this.help.pause()
        }
        for(let i=0;i<this.size;i++)
        {
            this.list[i].setAttribute("class", "item done")
        }
        document.getElementById("comparision").innerHTML=this.count
    }

    // MERGE SORT 
    MergeSort = async () =>{
        await this.MergeDevider(0,this.size-1)
        for(let i=0;i<this.size;i++)
            this.list[i].setAttribute("class" , "item done")
        document.getElementById("comparision").innerHTML=this.count
    }
    
    MergeDevider = async(start,end) =>{
        if(start < end){
            this.count++
            let mid = start + Math.floor((end - start)/2)
            await this.MergeDevider(start,mid)
            await this.MergeDevider(mid+1,end)
            await this.Merge(start , mid , end)
        }
    }
    Merge =  async(start,mid,end) =>{
        let n1 = start
        let n2 = mid+1
        let newList = new Array()
        while(n1<=mid && n2<=end)
        {
            this.count++
            let fvalue = Number(this.list[n1].getAttribute("value"))
            let svalue = Number(this.list[n2].getAttribute("value"))
            if(fvalue<=svalue)
            {
                this.count++
                newList.push(fvalue)
                n1++
            }
            else{
                this.count++
                newList.push(svalue)
                n2++
            }
        }
        while(n1<=mid)
        {
            this.count++
            newList.push(Number(this.list[n1].getAttribute("value")))
            n1++
        }
        while(n2<=end)
        {
            this.count++
            newList.push(Number(this.list[n2].getAttribute("value")))
            n2++
        }
        for(let i=start;i<=end;i++){
            this.list[i].setAttribute("class", "item current")
        }
        for(let i=start,j=0;i<=end && j<=newList.length;i++,j++){
            await this.help.pause()
            this.list[i].setAttribute("value", newList[j])
            this.list[i].style.height=`${4*newList[j]}px`
        }
        for(let i= start;i<=end;i++)
        {
            this.list[i].setAttribute("class", "item")
        }
    }


    // QUICK SORT 
    QuickSort =  async() =>{
        await this.Quick(0,this.size-1)
        for(let i=0 ;i<this.size;i++)
            this.list[i].setAttribute("class" , "item done")
        document.getElementById("comparision").innerHTML=this.count
    }
    Quick = async(start,end) =>{
        if(start<end){
            this.count++
            let j=  await this.Partition(start,end)
            await this.Quick(start,j-1)
            await this.Quick(j+1,end)
        }
    }
    Partition = async(start , end) =>{
        let pivot = Number(this.list[start].getAttribute("value"))
        await this.help.markSpl(start)
        let l=start
        let h=end+1
        while(l<h)
        {
            this.count++
            do{
                l++
                this.count++
            }while(Number(this.list[l].getAttribute("value")) <= pivot && l<end)
            do{
                h--
                this.count++
            }while(Number(this.list[h].getAttribute("value")) > pivot && h>=l) 

            if(l<=h){
                this.count++
                await this.help.mark(l)
                await this.help.mark(h)
                await this.help.swap(l,h)
                await this.help.unmark(l)
                await this.help.unmark(h)
            }
        }
        await this.help.markSpl(h)
        await this.help.swap(start,h)
        await this.help.unmark(h)
        await this.help.unmark(start)
        return h
    }
}