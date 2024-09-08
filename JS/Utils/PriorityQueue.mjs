class PriorityQueue{

    constructor() {
        this.items=[];
    }

    enQueue(element, priority){
        const newNode = {element,priority};
        let added= false;

        for(let i=0; i<this.items.length; i++){
            if(this.items[i].priority>newNode.priority){
                this.items.splice(i,0,newNode);
                added=true;
                break;
            }
        }

        if(!added){
            this.items.push(newNode);
        }
    }
    
    deQueue(){
        return this.items.shift();
    }
    peek(){
        return this.items[0];
    }
    isEmpty(){
        return this.items.length===0;
    }
    getQueue(){
        return this.items;
    }
    clearQueue(){
        this.items.length=0;
    }
}

export {PriorityQueue}