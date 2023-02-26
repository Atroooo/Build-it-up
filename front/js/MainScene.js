let mapVar = new Array(30);
let batiments = new Array();

var batVarModif;

let isPlaced = new Array();

for(let i=0;i<30;i++){
    mapVar[i] = new Array(30);
}

for(bat in buildingListMk1){
    batiments[buildingListMk1[bat].name] = new Array(30);
    isPlaced[buildingListMk1[bat].name] = new Array(30);

    batiments["caserne1"] = new Array(3);     
    isPlaced["caserne1"] = new Array(3);

    batiments["commissariat1"] = new Array(3);     
    isPlaced["commissariat1"] = new Array(3);

    batiments["ecole1"] = new Array(3);     
    isPlaced["ecole1"] = new Array(3);

    batiments["hopital1"] = new Array(3);     
    isPlaced["hopital1"] = new Array(3);

    batiments["poste1"] = new Array(3);     
    isPlaced["poste1"] = new Array(3);
}

for(bat in buildingListMk2){
    batiments[buildingListMk2[bat].name] = new Array(30);
    isPlaced[buildingListMk2[bat].name] = new Array(30);

    batiments["caserne2"] = new Array(3);     
    isPlaced["caserne2"] = new Array(3);

    batiments["commissariat2"] = new Array(3);     
    isPlaced["commissariat2"] = new Array(3);

    batiments["ecole2"] = new Array(3);     
    isPlaced["ecole2"] = new Array(3);

    batiments["hopital2"] = new Array(3);     
    isPlaced["hopital2"] = new Array(3);

    batiments["poste2"] = new Array(3);     
    isPlaced["poste2"] = new Array(3);
}

for(bat in buildingListMk3){
    batiments[buildingListMk3[bat].name] = new Array(30);
    isPlaced[buildingListMk3[bat].name] = new Array(30);

    batiments["caserne3"] = new Array(3);     
    isPlaced["caserne3"] = new Array(3);

    batiments["commissariat3"] = new Array(3);     
    isPlaced["commissariat3"] = new Array(3);

    batiments["ecole3"] = new Array(3);     
    isPlaced["ecole3"] = new Array(3);

    batiments["hopital3"] = new Array(3);     
    isPlaced["hopital3"] = new Array(3);

    batiments["poste3"] = new Array(3);     
    isPlaced["poste3"] = new Array(3);
}

for(bat in buildingListMk1){
    for(let i=0;i<30;i++){
        isPlaced[buildingListMk1[bat].name][i] = false;
    }
}
for(bat in buildingListMk2){
    for(let i=0;i<30;i++){
        isPlaced[buildingListMk2[bat].name][i] = false;
    }
}

for(bat in buildingListMk3){
    for(let i=0;i<30;i++){
        isPlaced[buildingListMk3[bat].name][i] = false;
    }
}

let positionY;
let positionX;

let flag = 0;

class MainScene extends Phaser.Scene{
	constructor(){
		super('MainScene');
	}

    getCoordCenter(name_build){
        let center_coord = new Array();
        for(const center_temp in buildingListMk1){
            if(buildingListMk1[center_temp].name == name_build){
                center_coord[0] = buildingListMk1[center_temp].x;
                center_coord[1] = buildingListMk1[center_temp].y;
                return center_coord;
            }
        }
        for(const center_temp in buildingListMk2){
            if(buildingListMk2[center_temp].name == name_build){
                center_coord[0] = buildingListMk2[center_temp].x;
                center_coord[1] = buildingListMk2[center_temp].y;
                return center_coord;
            }
        }
        for(const center_temp in buildingListMk3){
            if(buildingListMk3[center_temp].name == name_build){
                center_coord[0] = buildingListMk3[center_temp].x;
                center_coord[1] = buildingListMk3[center_temp].y;
                return center_coord;
            }
        }
    }
    moveBuilding(posX,posY,building){
        building.x = -(posX*grassTile.width/2)+grassTile.width/2+posY*grassTile.width/2 + this.getCoordCenter(building.texture.key)[0];
        building.y = (posX+posY)*grassTile.height/2 +this.getCoordCenter(building.texture.key)[1];
    }
 
    getPosInPixels(x,y){ //entre 0 et 30
        let tab = new Array(2);
        tab[0] = -(x*grassTile.width/2)+grassTile.width/2+y*grassTile.width/2;
        tab[1] = y * grassTile.height/2 + x*grassTile.height/2;
        return tab; 
    }

    GenerateMap(){
        //Map Gen
        for (let i=0;i<30;i++){
            for (let j=0;j<30;j++){
                if(map[i][j] == 'ground'){
                    mapVar[i][j] = this.add.image(this.getPosInPixels(j,i)[0],this.getPosInPixels(j,i)[1],"terre").setInteractive({useHandCursor: true});
                }
            }
        }
    }
    attributeDepth(building,posX,posY){
        building.depth = posX + posY;
    }
	
	create(){
        var cam = this.cameras.main;
        //Map
        this.GenerateMap();

        this.sound.add("bgm",{loop: true, volume:0.1}).play();
    	
		//Gestion scroll
		this.input.on('pointermove', function (p){
            if (!p.isDown) return;
                cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
                cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;  
        });

		//Zoom
		this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY) => {
			if (deltaY > 0) {
				if(cam.zoom > 0.35){
					cam.zoom -= .02;
				}
			}
			if (deltaY < 0){
				if(cam.zoom < 1){
					cam.zoom += .02;
				}
			}
		});

        cam.scrollX -= 4*193;
        cam.scrollY += 12.5*193;

        //placement Mairie 1
        batiments["mairie1"][0] = this.add.image(0,0,"mairie1");
        isPlaced["mairie1"][0] = true;
        this.moveBuilding(15,15,batiments["mairie1"][0]);
        map[15][15] = "mairie10";
        statistiques.listeBatiment.push("mairie1");

        batiments["mairie1"][0].setInteractive();
        batiments["mairie1"][0].on("pointerdown", () => {
            var scene = this.scene.get("ecologie");
            scene.getInfo("mairie1");
            this.scene.launch('menu');
            if("mairie1" == buildingListMk1[13].name || "mairie1" == buildingListMk2[13].name || "mairie1" == buildingListMk3[13].name) { this.scene.launch('techno'); }
        });

	
    }

    hideBuilding(building,bat_var){
        let index = 0;

        for(bat in batiments){
            for (let i = 0; i < 10 ; i++){
                if (batiments[bat][i] != undefined){
                    batiments[bat][i].setVisible(false); 
                }   
            }
        }

        for (let i = 0; i < 30 ; i++){
            for (let j = 0 ; j < 30 ; j++) {
                if (map[i][j] != 'ground') mapVar[i][j].setTint("000");
            }
        }

        batiments[building][bat_var].setVisible(true);
    }

    showBuilding(){
        for(bat in batiments){
            for (let i = 0; i < 10 ; i++){
                if (batiments[bat][i] != undefined){
                    batiments[bat][i].setVisible(true); 
                }   
            }
        }

        for (let i = 0; i < 30 ; i++){
            for (let j = 0 ; j < 30 ; j++) {
                if (map[i][j] != 'ground') mapVar[i][j].clearTint();
            }
        }
    }


    replaceBuilding(building){

        for(let i = 0; i < 30 ; i++){
            for (let j = 0; j < 30; j++){
                if (map[i][j] == building + batVarModif.toString()){
                    map[i][j] = 'ground';
                }
            }
        }
        batiments[building][batVarModif].destroy();
        isPlaced[building][batVarModif] = false;
        this.displaybatiment(building, false,batVarModif);
    }


    displaybatiment(building, isupgrade, bat_vor){
        var cam = this.cameras.main;
        let pointer = this.input.mousePointer; 
        let bat_var = 0;
        let flag;
        let errorText;
        let sizeX = 0;let sizeY = 0;let prevSizeX = 0;let prevSizeY = 0;
        let batVorDefined = false;

        //Variables pour placement si taille batiment != 1x1
        let tabNumber = parseInt(building.charAt(building.length - 1));
        switch(tabNumber){
            case 1:
                if(buildingListMk1[statistiques.getId(building)].sizeX == 1 || buildingListMk1[statistiques.getId(building)].sizeX == 2){
                   sizeX = buildingListMk1[statistiques.getId(building)].sizeX; sizeY = buildingListMk1[statistiques.getId(building)].sizeY;
                }
            break;
            case 2:
                if(buildingListMk2[statistiques.getId(building)].sizeX == 1 || buildingListMk2[statistiques.getId(building)].sizeX == 2){
                   sizeX = buildingListMk2[statistiques.getId(building)].sizeX;sizeY = buildingListMk2[statistiques.getId(building)].sizeY;
                }
            break;
            case 3:
                if(buildingListMk3[statistiques.getId(building)].sizeX == 1 || buildingListMk3[statistiques.getId(building)].sizeX == 2){
                   sizeX = buildingListMk3[statistiques.getId(building)].sizeX;sizeY = buildingListMk3[statistiques.getId(building)].sizeY;
                }
            break;
        }
        if (building == 'panneau_solaire') {sizeX = 2; sizeY = 2};
        while(batiments[building][bat_var] != undefined){
            bat_var ++;
        }
        if(batiments[building].length - 1 < bat_var){
            statistiques.removeBuilding(building);
            statistiques.setBank(-statistiques.getBuildingPrice(building));
            return;
        }

        if (bat_vor != undefined) {
            bat_var = bat_vor;
            batVorDefined = true;
        }


        
        batiments[building][bat_var] = this.add.image(0,0,building);       
        this.input.mouse.requestPointerLock();

        if(isupgrade){
            if (building == "mairie1" || building == "mairie2" || building == "mairie3") batVarModif = 0;
            let arraybuilding = building.split('');
            let last_char = arraybuilding[building.length-1];
            arraybuilding.pop();
            arraybuilding.push(last_char-1);
            let old_batiment = arraybuilding.toString();
            let oldbatiment2 = old_batiment.replace(/[\s,]+/g,'').trim();
            statistiques.setBank(statistiques.getBuildingPrice(building))
            statistiques.upgradeBuilding(building, oldbatiment2);

            batiments[oldbatiment2][batVarModif].destroy();

            let prevTabNumber = tabNumber - 1;
            switch(prevTabNumber){
                case 1: 
                    prevSizeX = buildingListMk1[statistiques.getId(oldbatiment2)].sizeX;prevSizeY = buildingListMk1[statistiques.getId(oldbatiment2)].sizeY;
                break;
                case 2:
                    prevSizeX = buildingListMk2[statistiques.getId(oldbatiment2)].sizeX;prevSizeY = buildingListMk2[statistiques.getId(oldbatiment2)].sizeY;
                break;
            }
            
            for(let i = 0; i < 30 ; i++){
                for (let j = 0; j < 30; j++){
                    if (map[i][j] == oldbatiment2 + batVarModif.toString()){
                        map[i][j] = 'ground';
                    }
                }
            }
        }
        this.hideBuilding(building,bat_var);
        this.input.mouse.locked = true;

        for (let i=0;i<30;i++){ 
            for (let j=0;j<30;j++){
                mapVar[i][j].on("pointerover", () => {
                    if (isPlaced[building][bat_var] == false && !batVorDefined){
                        mapVar[i][j].y -= 30;
                        positionX = j;
                        positionY = i;
                    }   
                });
                mapVar[i][j].on("pointerout", () => {
                    if (isPlaced[building][bat_var] == false && !batVorDefined){
                        if(mapVar[i][j].y != this.getPosInPixels(j,i)[1]) mapVar[i][j].y += 30; 
                    } 
                });       
            }
        }

        this.input.on("pointerdown", () => { //Conditions placer batiments et placement si good
            let scene = this.scene.get("hud");
            if(!isPlaced[building][bat_var] && !batVorDefined){
                if(map[positionY][positionX] != 'ground'){ //condition si place déjà prise   
                    flag = 1;
                    scene.displayErrorTextBuilding();
                }
                else if(map[positionY][positionX - 1] != 'ground' && sizeX == 2 && sizeY == 1){ 
                    flag = 1;
                    scene.displayErrorTextBuilding();
                }
                else if(map[positionY - 1][positionX] != 'ground' && sizeX == 1 && sizeY == 2){
                    flag = 1;
                    scene.displayErrorTextBuilding();
                }
                else if((map[positionY - 1][positionX] != 'ground' || map[positionY][positionX - 1] != 'ground' || map[positionY - 1][positionX - 1] != 'ground') && sizeX == 2 && sizeY == 2 ){
                    flag = 1;
                    scene.displayErrorTextBuilding();
                }

                else{         
                    this.showBuilding();
                    if (flag == 1) {scene.destroyErrorTextBuilding();flag = 0;}
                    
                    if (sizeX == 0 && sizeY == 0) map[positionY][positionX] = building + bat_var;
                    if (sizeX == 1 && sizeY == 2){
                        map[positionY][positionX] = building + bat_var;
                        map[positionY - 1][positionX] = building + bat_var;   
                    }
                    if(sizeX == 2 && sizeY == 1){
                        map[positionY][positionX] = building + bat_var;
                        map[positionY][positionX - 1] = building + bat_var;
                    }
                    if(sizeX == 2 && sizeY == 2){
                        map[positionY][positionX] = building + bat_var;
                        map[positionY - 1][positionX] = building + bat_var;
                        map[positionY][positionX - 1] = building + bat_var;
                        map[positionY - 1][positionX - 1] = building + bat_var;
                    }
                    this.attributeDepth(batiments[building][bat_var],positionX,positionY);
                    mapVar[positionY][positionX].y += 30;
                    isPlaced[building][bat_var] = true;
                    this.input.mouse.locked = false;
                    this.input.mouse.releasePointerLock();
                    this.moveBuilding(positionX,positionY,batiments[building][bat_var]);
                    batiments[building][bat_var].setInteractive();
                    batiments[building][bat_var].on("pointerdown", () => {
                        if(isPlaced[building][bat_var] && !batVorDefined){
                            batVarModif = bat_var;
                            var scene = this.scene.get("ecologie");
                            scene.getInfo(building);
                            this.scene.launch('menu');
                            
                            if(building == buildingListMk1[13].name || building == buildingListMk2[13].name || building == buildingListMk3[13].name) { this.scene.launch('techno'); }
                        }
                    });
                }
            }
        });

        this.input.on("pointermove", () => {
            if(isPlaced[building][bat_var] == false && !batVorDefined){ 
                cam.scrollX += pointer.event.movementX / cam.zoom;
                cam.scrollY += pointer.event.movementY / cam.zoom;
                
                //centre le batiment sur la map
                batiments[building][bat_var].x = cam.scrollX + pointer.x;
                batiments[building][bat_var].y = cam.scrollY + pointer.y;
                }                
        });     
    }

    removeOnClickBuilding(){
        for(bat in batiments){
            for (let i = 0; i < 10 ; i++){
                if (batiments[bat][i] != undefined){
                    batiments[bat][i].removeInteractive(); 
                }   
            }
        } 
    }

    addOnClickBuilding(){
        for(bat in batiments){
            for (let i = 0; i < 10 ; i++){
                if (batiments[bat][i] != undefined){
                    batiments[bat][i].setInteractive(); 
                }   
            }
        } 
    }


	update(){
	}
}




