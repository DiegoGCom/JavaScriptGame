class GameTimer {

    constructor() {

        if (GameTimer.instance) {
            return GameTimer.instance;
        }
        this.timers = [];
        this.nextId = 0;
        GameTimer.instance = this;

    }
    setGameTimeOut(callback, delay) {
        const id = this.nextId++;
        const startTime = performance.now();

        this.timers.push({ id, type: 'timeout', callback, delay, startTime });
        return id;
    }
    setGameInterval(callback, interval) {

        const id = this.nextId++;
        const startTime = performance.now();

        this.timers.push({ id, type: 'interval', callback, interval, startTime, lastExecution: startTime });

        //console.log('Añadida nueva tarea: '+callback);
        return id;

    }
    setLimitedInterval(callback,interval,repeats){

        const id = this.nextId++;
        const startTime = performance.now();

        this.timers.push({
            id, 
            type:'limited-interval',
            callback,
            interval,
            lastExecution:startTime,
            repeats,
            executed:0
        });

    }

    clearGameTimer(id) {

        this.timers = this.timers.filter(timer => timer.id !== id);
    }

    update() {

        const currentTime = performance.now();

        this.timers = this.timers.filter(timer => {

            if (timer.type === 'timeout') {
                const elapsedTime = currentTime - timer.startTime;

                if (elapsedTime >= timer.delay) {
                    timer.callback();
                    return false;
                }

            }//---Fin de timeout

            if (timer.type === 'interval' || timer.type==='limited-interval') {

                const elapsedTime = currentTime - timer.lastExecution;

                if (elapsedTime >= timer.interval) {
                    timer.callback();
                    timer.lastExecution = currentTime;
    
                    if(timer.type==='limited-interval'){
                        timer.executed++;
                        console.log('Cargando');
                        if(timer.executed>=timer.repeats){
                            return false;
                        }
                    }
                }
                return true;
            }//--Fin de interval
            return true;
        });//---Fin del filtro

    }//----update()

    static getInstance(){

        if(!GameTimer.instance){
            GameTimer.instance = new GameTimer();
        }
        return GameTimer.instance;

    }
}//---Fin de la clase

export{GameTimer}