class Random{

    static getRandom(min,max){

        return Math.floor(Math.random()*(max-min)+min);

    }
    static getRandomElements(...args){

       
        const randomIndex= Math.floor(Math.random()*args.length);
   
        return args[randomIndex];

    }

}
export {Random}