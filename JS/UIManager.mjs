class UIManager {

    constructor() {
        this.characterDropMenu = document.getElementById('dropdownMenu');
        this.characters=[];
    }

    addNewCharacter(character) {

        this.characters.push(character);

        const p = document.createElement('p');
  
        p.textContent = character.name;

        this.characterDropMenu.appendChild(p);

    }
}

export{UIManager};