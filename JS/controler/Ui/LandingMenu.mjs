class LandingMenu{

    constructor(canvasGroup) {

        /**@type {CanvasGroupControler} */
        this.canvasGroup=canvasGroup;

        //------LANDING MENU------------------
        this.landingMenuContainer = document.getElementById('landingMenuContainer');
        this.landingMenuButtons = Array.from(document.getElementsByClassName('landingMenuButtons'));

        //------MAP CREATOR MENU------------
        this.mapCreatorMenu = document.getElementById('mapCreatorMenu');
        this.acceptButtonCreator = document.getElementById('acceptButtonCreator')
        this.cancelButtonCreator = document.getElementById('cancelButtonCreator')

        this.setupListeners();
    }

    setupListeners(){
        this.landingMenuContainer.addEventListener('contextmenu', (e)=> e.preventDefault());
        
        this.landingMenuButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.landingMenuContainer.classList.toggle('slide-out', true);
                this.landingMenuContainer.classList.toggle('slide-in-reverse', false);

                if (button.innerHTML === 'MAPCREATOR') {
                    this.mapCreatorMenu.classList.toggle('slide-in', true);
                }
            });
        });
        this.cancelButtonCreator.addEventListener('click', () => {

            this.landingMenuContainer.classList.toggle('slide-in-reverse', true);
            this.landingMenuContainer.classList.toggle('slide-out', false); 
            this.mapCreatorMenu.classList.toggle('slide-out-reverse', true); 
            this.mapCreatorMenu.classList.toggle('slide-in', false);

        });
    }
    
}
export {LandingMenu}