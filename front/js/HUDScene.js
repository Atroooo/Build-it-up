let temp = [];
let tempT = [];

let unlocked = []; 

let loseEconomie = 0;
let loseEcologie = 0;
let loseBienEtre = 0;
let dayUntilLose = 10;

class HUDScene extends Phaser.Scene{
    timeX1(){
      this.timer.paused = false;
      this.time.timeScale = 1;
    }

    timeX2(){
      this.timer.paused = false;
      this.time.timeScale = 2;
    }

    timeX3(){
      this.timer.paused = false;
      this.time.timeScale = 3;
    }

    timePause(){
      this.timer.paused = true;
    }

  create () {
      //Boutton qui gère la liste des bâtiments
      this.button = this.add.sprite(1070, 750, "Bâtiments");
      this.button.displayWidth = 200;
      this.button.scaleY = this.button.scaleX;
      this.button.depth = 100;
      this.button.setInteractive({  useHandCursor: true});
      this.button.on('pointerdown', () => this.openBuildingList());
      this.button.setOrigin(-3, 0);
      this.button.setScrollFactor(0);
      this.button.fixedToCamera = true;

      //timer      
      this.counter = 0;
      this.timer = this.time.addEvent({
          delay: 24000,
          callback:this.updateDay,
          callbackScope:this,
          repeat: 100000,
          paused: false
      });

      this.timerMAJ = this.time.addEvent({
          delay: 100,
          callback:this.updateEverything,
          callbackScope:this,
          repeat: 100000,
          paused:false
      });

      this.text = this.add.text(10, 860, 'Jour 0', { fill: 0xffffff, font: 'bold 36px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Bouton pour changer le temps
      this.buttonX1 = this.add.sprite(70, 850, "X1");
      this.buttonX1.displayWidth = 50;
      this.buttonX1.scaleY = this.buttonX1.scaleX;
      this.buttonX1.depth = 100;
      this.buttonX1.setInteractive({  useHandCursor: true});
      this.buttonX1.on('pointerdown', () => this.timeX1());
      this.buttonX1.setOrigin(-3, 0);
      this.buttonX1.setScrollFactor(0);
      this.buttonX1.fixedToCamera = true;

      this.buttonX2 = this.add.sprite(130, 850, "X2");
      this.buttonX2.displayWidth = 50;
      this.buttonX2.scaleY = this.buttonX2.scaleX;
      this.buttonX2.depth = 100;
      this.buttonX2.setInteractive({  useHandCursor: true});
      this.buttonX2.on('pointerdown', () => this.timeX2());
      this.buttonX2.setOrigin(-3, 0);
      this.buttonX2.setScrollFactor(0);
      this.buttonX2.fixedToCamera = true;

      this.buttonX3 = this.add.sprite(190, 850, "X3");
      this.buttonX3.displayWidth = 50;
      this.buttonX3.scaleY = this.buttonX3.scaleX;
      this.buttonX3.depth = 100;
      this.buttonX3.setInteractive({  useHandCursor: true});
      this.buttonX3.on('pointerdown', () => this.timeX3());
      this.buttonX3.setOrigin(-3, 0);
      this.buttonX3.setScrollFactor(0);
      this.buttonX3.fixedToCamera = true;

      this.buttonPause = this.add.sprite(10, 850, "Pause");
      this.buttonPause.displayWidth = 50;
      this.buttonPause.scaleY = this.buttonPause.scaleX;
      this.buttonPause.depth = 100;
      this.buttonPause.setInteractive({  useHandCursor: true});
      this.buttonPause.on('pointerdown', () => this.timePause());
      this.buttonPause.setOrigin(-3, 0);
      this.buttonPause.setScrollFactor(0);
      this.buttonPause.fixedToCamera = true;

      //Affichage Stat
      //Economie
      this.barEconomie = new Phaser.GameObjects.Graphics(this);
      this.add.existing(this.barEconomie);
      this.barEconomie.fillStyle(0xFF9900);
      this.textEconomie = this.add.text(15, 24, 'Economie', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      this.rEconomie = this.add.rectangle(160, 34, 300, 20);
      this.rEconomie.setStrokeStyle(2, 0x080808);
      this.lineEconomie = this.add.line(50, -30, 110, 65, 110, 85, 0x080808);

      //Ecologie
      this.barEcologie = new Phaser.GameObjects.Graphics(this);
      this.add.existing(this.barEcologie);
      this.barEcologie.fillStyle(0x38761D);
      this.textEcologie = this.add.text(15, 74, 'Ecologie', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      this.rEcologie = this.add.rectangle(160, 84, 300, 20);
      this.rEcologie.setStrokeStyle(2, 0x080808);
      this.lineEcologie = this.add.line(50, -30, 110, 115, 110, 135, 0x080808);

      //Bien Etre
      this.barBienEtre = new Phaser.GameObjects.Graphics(this);
      this.add.existing(this.barBienEtre);
      this.barBienEtre.fillStyle(0x0B5394);
      this.textBienEtre = this.add.text(15, 124, 'Bien être', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      this.rBienEtre = this.add.rectangle(160, 134, 300, 20);
      this.rBienEtre.setStrokeStyle(2, 0x080808);
      this.lineBienEtre = this.add.line(50, -30, 110, 165, 110, 185, 0x080808);

      //Income
      this.iconeIncome = this.add.sprite(1730, 50, "income");
      this.iconeIncome.displayWidth = 60;
      this.iconeIncome.scaleY = this.iconeIncome.scaleX;
      this.iconeIncome.depth = 100;
      this.textIncome = this.add.text(1780, 40, '0', { fill: 0xffffff, font: 'bold 30px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //bank
      this.iconeBank = this.add.sprite(1480, 60, "bank");
      this.iconeBank.displayWidth = 60;
      this.iconeBank.scaleY = this.iconeBank.scaleX;
      this.iconeBank.depth = 100;
      this.textBank = this.add.text(1505, 42, '0', { fill: 0xffffff, font: 'bold 30px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //pop
      this.iconePopulation = this.add.sprite(1720, 120, "pop");
      this.iconePopulation.displayWidth = 75;
      this.iconePopulation.scaleY = this.iconePopulation.scaleX;
      this.iconePopulation.depth = 100;
      this.textPopulation = this.add.text(1780, 102, '0', { fill: 0xffffff, font: 'bold 30px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Error
      this.errorText = this.add.text(650, 850, 'Vous ne pouvez pas placer ce bâtiment ici', {
        fontFamily: 'system-ui',
        fontSize: '30px',
        color: '#ff0000',
        align : 'center',
      }).setVisible(false);
    }

    displayErrorTextBuilding(){
      this.errorText.setVisible(true);
    }

    destroyErrorTextBuilding(){
      this.errorText.setVisible(false);
    }
    
    openBuildingList(){
      this.scene.launch('stat');
    }

    updateDay(){
      this.counter++;
      statistiques.updateBank();
      this.loseCond();
      if(this.counter >= 365){ 
        this.endGame(); 
        this.timer.paused = true;
        this.timerMAJ.paused = true;
      }
    }

    updateEverything(){
      statistiques.updateIncome();
      statistiques.updateEconomie();
      statistiques.updateEcologie();
      statistiques.updateBienEtre();
      statistiques.updatePop();
    }

    updateBar(){
      this.barEconomie.clear();
      this.barEconomie.fillStyle(0xFF9900);
      this.barEcologie.clear();
      this.barEcologie.fillStyle(0x38761D);
      this.barBienEtre.clear();
      this.barBienEtre.fillStyle(0x0B5394);

      let econo = statistiques.getEconomie(), ecolo = statistiques.getEcologie(), bienE = statistiques.getBienEtre();

      //Economie
      if(econo*1.5 > 150){ this.barEconomie.fillRect(160,25, 150, 20);}
      else if(150 < econo*1.5 < 150){ this.barEconomie.fillRect(160,25, statistiques.getEconomie()*1.5, 20);}
      else if(econo*1.5 <= -150){ this.barBienEconomie.fillRect(160,125, -150, 20);}

      //Ecologie
      if(ecolo*1.5 > 150){ this.barEcologie.fillRect(160,75, 150, 20); }
      else if(150 < ecolo*1.5 < 150){ this.barEcologie.fillRect(160,75, statistiques.getEcologie()*1.5, 20); }
      else if(ecolo*1.5 <= -150){ this.barBienEcologie.fillRect(160,125, -150, 20);}
      //Bien Etre
      if(bienE*1.5 > 150){ this.barBienEtre.fillRect(160,125, 150, 20); }
      else if(150 < bienE*1.5 < 150){ this.barBienEtre.fillRect(160,125, statistiques.getBienEtre()*1.5, 20); }
      else if(bienE*1.5 <= -150){ this.barBienEtre.fillRect(160,125, -150, 20);}
    }

    update () {
      this.text.setText('Jour ' + this.counter.toFixed(0));
      this.textBank.setText(this.showBank());
      this.textIncome.setText(this.showIncome());
      this.textPopulation.setText(this.showPop());
      this.updateBar();
    }

    showBank(){
      let a = '';
      if(statistiques.getBank() >= 1000000){
        a = statistiques.getBank()/1000000 + 'M$';
        return a;
      }
      if(statistiques.getBank() < 1000000){
        a = statistiques.getBank()/1000 + 'k$';
        return a;
      }
    }

    showIncome(){
      let a = '';
      if(statistiques.getIncome() >= 1000000){
        a = statistiques.getIncome()/1000000 + 'M$/j';
        return a;
      }
      if(statistiques.getIncome() >= 1000){
        a = statistiques.getIncome()/1000 + 'k$/j';
        return a;
      }
      if(statistiques.getIncome() < 1000){
        a = statistiques.getIncome() + '$/j';
        return a;
      }
    }

    showPop(){
      let a = '';
      if(statistiques.getPop() >= 1000){
        a = statistiques.getPop()/1000 + 'k';
        return a;
      }
      if(statistiques.getPop() < 1000){
        a = statistiques.getPop();
        return a;
      }
      
    }
    endGame(){
      this.scene.launch('end');
    }

    loseCond(){
      if(loseEconomie == dayUntilLose) { 
        this.scene.launch('Perdu');
        this.timer.paused = true;
        this.timerMAJ.paused = true;
      }
      if(loseEcologie == dayUntilLose) { 
        this.scene.launch('Perdu'); 
        this.timer.paused = true;
        this.timerMAJ.paused = true;
      }
      if(loseBienEtre == dayUntilLose) { 
        this.scene.launch('Perdu');
        this.timer.paused = true;
        this.timerMAJ.paused = true;
      }

      if(statistiques.getEconomie() >= 0) loseEconomie = 0;
      else if(statistiques.getEconomie() < 0) loseEconomie++;

      if(statistiques.getEcologie() >= 0) loseEcologie = 0;
      else if(statistiques.getEcologie() < 0) loseEcologie++;

      if(statistiques.getBienEtre() >= 0) loseBienEtre = 0;
      else if(statistiques.getBienEtre() < 0) loseBienEtre++;
    }
}


class HUDStat extends Phaser.Scene{
  create(){
    let sousMenu1 = this.add.rectangle(950, 450, 700, 300, 0xffffff);
    let sousMenuRec1 = this.add.rectangle(950, 450, 700, 300);
    sousMenuRec1.setStrokeStyle(3, 0x080808);
    //Close bouton
    this.closeButton = this.add.sprite(1275, 325, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Menu Ecologie
    this.buttonEcologie = this.add.sprite(-80,350, 'ecologie');
    this.buttonEcologie.displayWidth = 290;
    this.buttonEcologie.scaleY = this.buttonEcologie.scaleX;
    this.buttonEcologie.depth = 200;
    this.buttonEcologie.setInteractive({  useHandCursor: true});
    this.buttonEcologie.on('pointerdown', () => this.openBuildingListEcologie());
    this.buttonEcologie.setOrigin(-3, 0);
    this.buttonEcologie.setScrollFactor(0);
    this.buttonEcologie.fixedToCamera = true;

    //Menu Moral
    this.buttonMoral = this.add.sprite(465, 352, 'bienetre');
    this.buttonMoral.displayWidth = 200;
    this.buttonMoral.scaleY = this.buttonMoral.scaleX;
    this.buttonMoral.depth = 100;
    this.buttonMoral.setInteractive({  useHandCursor: true});
    this.buttonMoral.on('pointerdown', () => this.openBuildingListMoral());
    this.buttonMoral.setOrigin(-3, 0);
    this.buttonMoral.setScrollFactor(0);
    this.buttonMoral.fixedToCamera = true;

    //Menu Economie
    this.buttonEconomie = this.add.sprite(20, 340, 'economie');
    this.buttonEconomie.displayWidth = 200;
    this.buttonEconomie.scaleY = this.buttonEconomie.scaleX;
    this.buttonEconomie.depth = 100;
    this.buttonEconomie.setInteractive({  useHandCursor: true});
    this.buttonEconomie.on('pointerdown', () => this.openBuildingListEconomie());
    this.buttonEconomie.setOrigin(-3, 0);
    this.buttonEconomie.setScrollFactor(0);
    this.buttonEconomie.fixedToCamera = true;
  }
  
  openBuildingListMoral(){
    this.scene.launch('moral');
    this.scene.stop('stat');
  }

  openBuildingListEcologie(){
    this.scene.launch('ecologie');
    this.scene.stop('stat');
  }

  openBuildingListEconomie(){
    this.scene.launch('economie');
    this.scene.stop('stat');
  }

  close(){
    this.scene.stop('stat');
  }
}

class HUDBuildingListEcologie extends Phaser.Scene{
  create(){
    let sousMenuEcologie = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
    let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
    sousMenuRec1.setStrokeStyle(3, 0x080808);

    //Close bouton
    this.closeButton = this.add.sprite(1680, 80, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Text Bank 2
    var scene1 = this.scene.get("hud");
    this.textBank2 = this.add.text(1400, 70, "Vous avez : " + scene1.showBank(), { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Panneau Solaire
    this.buttonBuildingPSolaire = this.add.image(-1100,100, 'panneau_solaire');
    if(statistiques.getBank() < buildingListMk1[7].price || statistiques.getConditions(buildingListMk1[7].name) > statistiques.getPop()) { 
      let croix = this.add.sprite(650, 300, 'croix');
      croix.depth = 300;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;

      this.buttonBuildingPSolaire.setInteractive({useHandCursor: true});
      this.buttonBuildingPSolaire.on('pointerdown', () => this.getConditionsP('panneau_solaire'));
    }
    else if(statistiques.getBank() >= buildingListMk1[7].price && statistiques.getConditions(buildingListMk1[7].name) <= statistiques.getPop()){
      this.buttonBuildingPSolaire.setInteractive({useHandCursor: true});
      this.buttonBuildingPSolaire.on('pointerdown', () => this.placeBuildingEcologie('panneau_solaire'));
    }
    this.buttonBuildingPSolaire.setOrigin(-3, 0);
    this.buttonBuildingPSolaire.setScrollFactor(0);
    this.buttonBuildingPSolaire.fixedToCamera = true;
    this.prixPS = this.add.text(630, 460, buildingListMk1[7].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textPS = this.add.text(590, 480, "Panneau Solaire", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Panneau Solaire Info
    this.buttonInfoPSolaire = this.add.image(390,470, 'iconeInfo');
    this.buttonInfoPSolaire.displayWidth = 50;
    this.buttonInfoPSolaire.scaleY = this.buttonInfoPSolaire.scaleX;
    this.buttonInfoPSolaire.setInteractive({useHandCursor: true});
    this.buttonInfoPSolaire.on('pointerdown', () => this.getInfo('panneau_solaire'));
    this.buttonInfoPSolaire.setOrigin(-3, 0);
    this.buttonInfoPSolaire.setScrollFactor(0);
    this.buttonInfoPSolaire.fixedToCamera = true;


    //Centrale hydraulique
    this.buttonBuildingCentralehydraulique = this.add.image(-50,110, 'centrale_hydraulique1');
    if(statistiques.getBank() < buildingListMk1[6].price || statistiques.getConditions(buildingListMk1[6].name) > statistiques.getPop()) { 
      let croix = this.add.sprite(1350, 300, 'croix');
      croix.depth = 300;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;

      this.buttonBuildingCentralehydraulique.setInteractive({useHandCursor: true});
      this.buttonBuildingCentralehydraulique.on('pointerdown', () => this.getConditionsP('centrale_hydraulique1'));
    }
    else if(statistiques.getBank() >= buildingListMk1[6].price && statistiques.getConditions(buildingListMk1[6].name) <= statistiques.getPop()){
      this.buttonBuildingCentralehydraulique.setInteractive({useHandCursor: true});
      this.buttonBuildingCentralehydraulique.on('pointerdown', () => this.placeBuildingEcologie('centrale_hydraulique1'));
    }
    this.buttonBuildingCentralehydraulique.setOrigin(-3, 0);
    this.buttonBuildingCentralehydraulique.setScrollFactor(0);
    this.buttonBuildingCentralehydraulique.fixedToCamera = true;
    this.prixHydro = this.add.text(1300, 460, buildingListMk1[6].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textHydro = this.add.text(1240, 480, "Centrale hydraulique", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Centrale hydraulique Info
    this.buttonInfoCentralehydraulique = this.add.image(1040,470, 'iconeInfo');
    this.buttonInfoCentralehydraulique.displayWidth = 50;
    this.buttonInfoCentralehydraulique.scaleY = this.buttonInfoCentralehydraulique.scaleX;
    this.buttonInfoCentralehydraulique.setInteractive({useHandCursor: true});
    this.buttonInfoCentralehydraulique.on('pointerdown', () => this.getInfo('centrale_hydraulique1'));
    this.buttonInfoCentralehydraulique.setOrigin(-3, 0);
    this.buttonInfoCentralehydraulique.setScrollFactor(0);
    this.buttonInfoCentralehydraulique.fixedToCamera = true;

    //Parc
    this.buttonBuildingParc = this.add.image(-200,500, 'parc1');
    if(statistiques.getBank() < buildingListMk1[8].price || statistiques.getConditions(buildingListMk1[8].name) > statistiques.getPop()) { 
      let croix = this.add.sprite(540, 500, 'croix');
      croix.depth = 300;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;
      croix.setOrigin(0, 0);
      croix.setScrollFactor(0);
      croix.fixedToCamera = true;

      this.buttonBuildingParc.setInteractive({useHandCursor: true});
      this.buttonBuildingParc.on('pointerdown', () => this.getConditionsP('parc1'));
    }
    else if(statistiques.getBank() >= buildingListMk1[8].price && statistiques.getConditions(buildingListMk1[8].name) <= statistiques.getPop()){
      this.buttonBuildingParc.setInteractive({useHandCursor: true});
      this.buttonBuildingParc.on('pointerdown', () => this.placeBuildingEcologie('parc1'));
    }
    this.buttonBuildingParc.setOrigin(-3, 0);
    this.buttonBuildingParc.setScrollFactor(0);
    this.buttonBuildingParc.fixedToCamera = true;
    this.prixParc = this.add.text(620, 740, buildingListMk1[8].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textParc = this.add.text(625, 760, "Parc", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Parc Info
    this.buttonInfoParc = this.add.image(420,750, 'iconeInfo');
    this.buttonInfoParc.displayWidth = 50;
    this.buttonInfoParc.scaleY = this.buttonInfoParc.scaleX;
    this.buttonInfoParc.setInteractive({useHandCursor: true});
    this.buttonInfoParc.on('pointerdown', () => this.getInfo('parc1'));
    this.buttonInfoParc.setOrigin(-3, 0);
    this.buttonInfoParc.setScrollFactor(0);
    this.buttonInfoParc.fixedToCamera = true;

    //Usine Recyclage
    this.buttonBuildingUsineRecyclage = this.add.image(500,520, 'usine_recyclage1');
    if(statistiques.getBank() < buildingListMk1[9].price || statistiques.getConditions(buildingListMk1[9].name) > statistiques.getPop()) { 
      let croix = this.add.sprite(1240, 500, 'croix');
      croix.depth = 200;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;
      croix.setOrigin(0, 0);
      croix.setScrollFactor(0);
      croix.fixedToCamera = true;

      this.buttonBuildingUsineRecyclage.setInteractive({useHandCursor: true});
      this.buttonBuildingUsineRecyclage.on('pointerdown', () => this.getConditionsP('usine_recyclage1'));
    }
    else if(statistiques.getBank() >= buildingListMk1[9].price && statistiques.getConditions(buildingListMk1[9].name) <= statistiques.getPop()){
      this.buttonBuildingUsineRecyclage.setInteractive({useHandCursor: true});
      this.buttonBuildingUsineRecyclage.on('pointerdown', () => this.placeBuildingEcologie('usine_recyclage1'));
    }
    this.buttonBuildingUsineRecyclage.setOrigin(-3, 0);
    this.buttonBuildingUsineRecyclage.setScrollFactor(0);
    this.buttonBuildingUsineRecyclage.fixedToCamera = true;
    this.prixRecy = this.add.text(1340, 740, buildingListMk1[9].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textRecy = this.add.text(1300, 760, "Usine Recyclage", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Usine Recyclage Info
    this.buttonInfoUsineRecyclage = this.add.image(1100,750, 'iconeInfo');
    this.buttonInfoUsineRecyclage.displayWidth = 50;
    this.buttonInfoUsineRecyclage.scaleY = this.buttonInfoUsineRecyclage.scaleX;
    this.buttonInfoUsineRecyclage.setInteractive({useHandCursor: true});
    this.buttonInfoUsineRecyclage.on('pointerdown', () => this.getInfo('usine_recyclage1'));
    this.buttonInfoUsineRecyclage.setOrigin(-3, 0);
    this.buttonInfoUsineRecyclage.setScrollFactor(0);
    this.buttonInfoUsineRecyclage.fixedToCamera = true;
  }

  placeBuildingEcologie(name){
    this.scene.stop('ecologie').stop('stat');
    statistiques.saveBatiment(name);
    statistiques.setBank(buildingListMk1[statistiques.getId(name)].price);
    var scene = this.scene.get("MainScene");
    var bat = scene.displaybatiment(name,false,undefined);
    this.sound.add("dollar",{loop: false, volume:0.5}).play();
  }

  getConditionsP(name){
    temp = statistiques.getInfoBuilding(name);
    this.scene.launch('CNR');
  }

  close(){
    this.scene.stop('ecologie').stop('stat');
  }

  getInfo(name){
    temp = statistiques.getInfoBuilding(name);
    this.scene.sleep('ecologie');
    this.scene.launch('info');
  }
}

class HUDBuildingListMoral extends Phaser.Scene {
    create(){
      let sousMenuMoral = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
      let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
      sousMenuRec1.setStrokeStyle(3, 0x080808);

      //Close bouton
      this.closeButton = this.add.sprite(1680, 80, 'close');
      this.closeButton.displayWidth = 50;
      this.closeButton.scaleY = this.closeButton.scaleX;
      this.closeButton.depth = 200;
      this.closeButton.setInteractive({  useHandCursor: true});
      this.closeButton.on('pointerdown', () => this.close());

      //Text Bank 2
      var scene1 = this.scene.get("hud");
      this.textBank2 = this.add.text(1400, 70, "Vous avez : " + scene1.showBank(), { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Caserne
      this.buttonBuildingCaserne = this.add.image(640,180, 'caserne1');
      if(statistiques.getBank() < buildingListMk1[0].price || statistiques.getConditions(buildingListMk1[0].name) > statistiques.getPop()) { 
        let croix = this.add.sprite(1510, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingCaserne.setInteractive({useHandCursor: true});
        this.buttonBuildingCaserne.on('pointerdown', () => this.getConditionsP('caserne1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[0].price && statistiques.getConditions(buildingListMk1[0].name) <= statistiques.getPop()){
        this.buttonBuildingCaserne.setInteractive({useHandCursor: true});
        this.buttonBuildingCaserne.on('pointerdown', () => this.placeBuildingMoral('caserne1'));
      }
      this.buttonBuildingCaserne.setOrigin(-3, 0);
      this.buttonBuildingCaserne.setScrollFactor(0);
      this.buttonBuildingCaserne.fixedToCamera = true;
      this.prixCaserne = this.add.text(1500, 440, buildingListMk1[0].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCaserne = this.add.text(1492, 460, "Caserne", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Caserne Info
      this.buttonInfoCaserne = this.add.image(1290,445, 'iconeInfo');
      this.buttonInfoCaserne.displayWidth = 50;
      this.buttonInfoCaserne.scaleY = this.buttonInfoCaserne.scaleX;
      this.buttonInfoCaserne.setInteractive({useHandCursor: true});
      this.buttonInfoCaserne.on('pointerdown', () => this.getInfo('caserne1'));
      this.buttonInfoCaserne.setOrigin(-3, 0);
      this.buttonInfoCaserne.setScrollFactor(0);
      this.buttonInfoCaserne.fixedToCamera = true;

      //Maison
      this.buttonBuildingMaison = this.add.image(150, 500, 'maison1');
      if(statistiques.getBank() < buildingListMk1[14].price || statistiques.getConditions(buildingListMk1[14].name) > statistiques.getPop()) { 
        let croix = this.add.sprite(1000, 620, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingMaison.setInteractive({useHandCursor: true});
        this.buttonBuildingMaison.on('pointerdown', () => this.getConditionsP('maison1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[14].price && statistiques.getConditions(buildingListMk1[14].name) <= statistiques.getPop()){
        this.buttonBuildingMaison.setInteractive({useHandCursor: true});
        this.buttonBuildingMaison.on('pointerdown', () => this.placeBuildingMoral('maison1'));
      }
      this.buttonBuildingMaison.setOrigin(-3, 0);
      this.buttonBuildingMaison.setScrollFactor(0);
      this.buttonBuildingMaison.fixedToCamera = true;
      this.prixMaison = this.add.text(970, 750, buildingListMk1[14].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textMaison = this.add.text(965, 770, "Maison", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Maison Info
      this.buttonInfoMaison = this.add.image(765,760, 'iconeInfo');
      this.buttonInfoMaison.displayWidth = 50;
      this.buttonInfoMaison.scaleY = this.buttonInfoMaison.scaleX;
      this.buttonInfoMaison.setInteractive({useHandCursor: true});
      this.buttonInfoMaison.on('pointerdown', () => this.getInfo('maison1'));
      this.buttonInfoMaison.setOrigin(-3, 0);
      this.buttonInfoMaison.setScrollFactor(0);
      this.buttonInfoMaison.fixedToCamera = true;

      //Centrale
      this.buttonBuildingCentrale = this.add.image(500,500, 'centrale1');
      if(statistiques.getBank() < buildingListMk1[1].price || statistiques.getConditions(buildingListMk1[1].name) > statistiques.getPop()) {
        let croix = this.add.sprite(1350, 620, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingCentrale.setInteractive({useHandCursor: true});
        this.buttonBuildingCentrale.on('pointerdown', () => this.getConditionsP('centrale1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[1].price && statistiques.getConditions(buildingListMk1[1].name) <= statistiques.getPop()){
        this.buttonBuildingCentrale.setInteractive({useHandCursor: true});
        this.buttonBuildingCentrale.on('pointerdown', () => this.placeBuildingMoral('centrale1'));
      }
      this.buttonBuildingCentrale.setOrigin(-3, 0);
      this.buttonBuildingCentrale.setScrollFactor(0);
      this.buttonBuildingCentrale.fixedToCamera = true;
      this.prixCentrale = this.add.text(1350, 750, buildingListMk1[1].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCentrale = this.add.text(1340, 770, "Centrale", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Centrale Info
      this.buttonInfoCentrale = this.add.image(1145,760, 'iconeInfo');
      this.buttonInfoCentrale.displayWidth = 50;
      this.buttonInfoCentrale.scaleY = this.buttonInfoCentrale.scaleX;
      this.buttonInfoCentrale.setInteractive({useHandCursor: true});
      this.buttonInfoCentrale.on('pointerdown', () => this.getInfo('centrale1'));
      this.buttonInfoCentrale.setOrigin(-3, 0);
      this.buttonInfoCentrale.setScrollFactor(0);
      this.buttonInfoCentrale.fixedToCamera = true;

      //Commissariat
      this.buttonBuildingCommissariat = this.add.image(250,180, 'commissariat1');
      if(statistiques.getBank() < buildingListMk1[2].price || statistiques.getConditions(buildingListMk1[2].name) > statistiques.getPop()) { 
        let croix = this.add.sprite(1120, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingCommissariat.setInteractive({useHandCursor: true});
        this.buttonBuildingCommissariat.on('pointerdown', () => this.getConditionsP('commissariat1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[2].price && statistiques.getConditions(buildingListMk1[2].name) <= statistiques.getPop()){
        this.buttonBuildingCommissariat.setInteractive({useHandCursor: true});
        this.buttonBuildingCommissariat.on('pointerdown', () => this.placeBuildingMoral('commissariat1'));
      }
      this.buttonBuildingCommissariat.setOrigin(-3, 0);
      this.buttonBuildingCommissariat.setScrollFactor(0);
      this.buttonBuildingCommissariat.fixedToCamera = true;
      this.prixCommi = this.add.text(1100, 440, buildingListMk1[2].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCommi = this.add.text(1070, 460, "Commissariat", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Commissariat Info
      this.buttonInfoBanque = this.add.image(850,445, 'iconeInfo');
      this.buttonInfoBanque.displayWidth = 50;
      this.buttonInfoBanque.scaleY = this.buttonInfoBanque.scaleX;
      this.buttonInfoBanque.setInteractive({useHandCursor: true});
      this.buttonInfoBanque.on('pointerdown', () => this.getInfo('commissariat1'));
      this.buttonInfoBanque.setOrigin(-3, 0);
      this.buttonInfoBanque.setScrollFactor(0);
      this.buttonInfoBanque.fixedToCamera = true;

      //Ecole
      this.buttonBuildingEcole = this.add.image(-250,500, 'ecole1');
      if(statistiques.getBank() < buildingListMk1[3].price || statistiques.getConditions(buildingListMk1[3].name) > statistiques.getPop()) { 
        let croix = this.add.sprite(600, 620, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingEcole.setInteractive({useHandCursor: true});
        this.buttonBuildingEcole.on('pointerdown', () => this.getConditionsP('ecole1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[3].price && statistiques.getConditions(buildingListMk1[3].name) <= statistiques.getPop()){
        this.buttonBuildingEcole.setInteractive({useHandCursor: true});
        this.buttonBuildingEcole.on('pointerdown', () => this.placeBuildingMoral('ecole1'));
      }
      this.buttonBuildingEcole.setOrigin(-3, 0);
      this.buttonBuildingEcole.setScrollFactor(0);
      this.buttonBuildingEcole.fixedToCamera = true;
      this.prixEcole = this.add.text(550, 750, buildingListMk1[3].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textEcole = this.add.text(552, 770, "Ecole", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Ecole Info
      this.buttonInfoEcole = this.add.image(350,760, 'iconeInfo');
      this.buttonInfoEcole.displayWidth = 50;
      this.buttonInfoEcole.scaleY = this.buttonInfoEcole.scaleX;
      this.buttonInfoEcole.setInteractive({useHandCursor: true});
      this.buttonInfoEcole.on('pointerdown', () => this.getInfo('ecole1'));
      this.buttonInfoEcole.setOrigin(-3, 0);
      this.buttonInfoEcole.setScrollFactor(0);
      this.buttonInfoEcole.fixedToCamera = true;

      //Hopital
      this.buttonBuildingHopital = this.add.image(-450,180, 'hopital1');
      if(statistiques.getBank() < buildingListMk1[4].price || statistiques.getConditions(buildingListMk1[4].name) > statistiques.getPop()) { 
        let croix = this.add.sprite(400, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingHopital.setInteractive({useHandCursor: true});
        this.buttonBuildingHopital.on('pointerdown', () => this.getConditionsP('hopital1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[4].price && statistiques.getConditions(buildingListMk1[4].name) <= statistiques.getPop()){
        this.buttonBuildingHopital.setInteractive({useHandCursor: true});
        this.buttonBuildingHopital.on('pointerdown', () => this.placeBuildingMoral('hopital1'));
      }
      this.buttonBuildingHopital.setOrigin(-3, 0);
      this.buttonBuildingHopital.setScrollFactor(0);
      this.buttonBuildingHopital.fixedToCamera = true;
      this.prixHopital = this.add.text(350, 440, buildingListMk1[4].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textHopital = this.add.text(345, 460, "Hopital", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Hopital Info
      this.buttonInfoHopital = this.add.image(150,445, 'iconeInfo');
      this.buttonInfoHopital.displayWidth = 50;
      this.buttonInfoHopital.scaleY = this.buttonInfoHopital.scaleX;
      this.buttonInfoHopital.setInteractive({useHandCursor: true});
      this.buttonInfoHopital.on('pointerdown', () => this.getInfo('hopital1'));
      this.buttonInfoHopital.setOrigin(-3, 0);
      this.buttonInfoHopital.setScrollFactor(0);
      this.buttonInfoHopital.fixedToCamera = true;

      //Poste
      this.buttonBuildingPoste = this.add.image(-100,180, 'poste1');
      if(statistiques.getBank() < buildingListMk1[5].price || statistiques.getConditions(buildingListMk1[5].name) > statistiques.getPop()) { 
        let croix = this.add.sprite(780, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;

        this.buttonBuildingPoste.setInteractive({useHandCursor: true});
        this.buttonBuildingPoste.on('pointerdown', () => this.getConditionsP('poste1'));
      }
      else if(statistiques.getBank() >= buildingListMk1[5].price && statistiques.getConditions(buildingListMk1[5].name) <= statistiques.getPop()){
        this.buttonBuildingPoste.setInteractive({useHandCursor: true});
        this.buttonBuildingPoste.on('pointerdown', () => this.placeBuildingMoral('poste1'));
      }
      this.buttonBuildingPoste.setOrigin(-3, 0);
      this.buttonBuildingPoste.setScrollFactor(0);
      this.buttonBuildingPoste.fixedToCamera = true;
      this.prixPoste = this.add.text(750, 440, buildingListMk1[5].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textPoste = this.add.text(752, 460, "Poste", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Poste Info
      this.buttonInfoPoste = this.add.image(550,445, 'iconeInfo');
      this.buttonInfoPoste.displayWidth = 50;
      this.buttonInfoPoste.scaleY = this.buttonInfoPoste.scaleX;
      this.buttonInfoPoste.setInteractive({useHandCursor: true});
      this.buttonInfoPoste.on('pointerdown', () => this.getInfo('poste1'));
      this.buttonInfoPoste.setOrigin(-3, 0);
      this.buttonInfoPoste.setScrollFactor(0);
      this.buttonInfoPoste.fixedToCamera = true;
    }

    placeBuildingMoral(name){
      this.scene.stop('moral').stop('stat');
      statistiques.saveBatiment(name);
      statistiques.setBank(buildingListMk1[statistiques.getId(name)].price);
      var scene = this.scene.get("MainScene");
      var bat = scene.displaybatiment(name,false,undefined);
      this.sound.add("dollar",{loop: false, volume:0.5}).play();
   }

  getConditionsP(name){
    temp = statistiques.getInfoBuilding(name);
    this.scene.launch('CNR');
  }

  close(){
    this.scene.stop('moral').stop('stat');
  }

  getInfo(name){
    temp = statistiques.getInfoBuilding(name);
    this.scene.sleep('moral');
    this.scene.launch('info');
  }
}

class HUDBuildingListEconomie extends Phaser.Scene{
    create(){
    let sousMenuEconomie = this.add.rectangle(960, 450, 1500, 700, 0xffffff);
    let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 700);
    sousMenuRec1.setStrokeStyle(3, 0x080808);

    //Close bouton
    this.closeButton = this.add.sprite(1680, 130, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Text Bank 2
    var scene1 = this.scene.get("hud");
    this.textBank2 = this.add.text(1400, 120, "Vous avez : " + scene1.showBank(), { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Banque
    this.buttonBuildingBanque = this.add.image(-750,150, 'banque1');
    if(statistiques.getBank() < buildingListMk1[10].price || statistiques.getConditions(buildingListMk1[10].name) > statistiques.getPop()) {
      let croix = this.add.sprite(980, 400, 'croix');
      croix.depth = 300;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;

      this.buttonBuildingBanque.setInteractive({useHandCursor: true});
      this.buttonBuildingBanque.on('pointerdown', () => this.getConditionsP('banque1'));

    }
    else if(statistiques.getBank() >= buildingListMk1[10].price && statistiques.getConditions(buildingListMk1[10].name) <= statistiques.getPop()){
      this.buttonBuildingBanque.setInteractive({useHandCursor: true});
      this.buttonBuildingBanque.on('pointerdown', () => this.placeBuildingEconomie('banque1'));
    }
    this.buttonBuildingBanque.setOrigin(-3, 0);
    this.buttonBuildingBanque.setScrollFactor(0);
    this.buttonBuildingBanque.fixedToCamera = true;
    this.prixBanque = this.add.text(970, 650, buildingListMk1[10].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textBanque = this.add.text(960, 675, "Banque", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Banque Info
    this.buttonInfoBanque = this.add.image(755,660, 'iconeInfo');
    this.buttonInfoBanque.displayWidth = 50;
    this.buttonInfoBanque.scaleY = this.buttonInfoBanque.scaleX;
    this.buttonInfoBanque.setInteractive({useHandCursor: true});
    this.buttonInfoBanque.on('pointerdown', () => this.getInfo('banque1'));
    this.buttonInfoBanque.setOrigin(-3, 0);
    this.buttonInfoBanque.setScrollFactor(0);
    this.buttonInfoBanque.fixedToCamera = true;

    //Magasin
    this.buttonBuildingMagasin = this.add.image(-350,300, 'magasin1');
    if(statistiques.getBank() < buildingListMk1[11].price || statistiques.getConditions(buildingListMk1[11].name) > statistiques.getPop()) {
      let croix = this.add.sprite(520, 420, 'croix');
      croix.depth = 300;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;

      this.buttonBuildingMagasin.setInteractive({useHandCursor: true});
      this.buttonBuildingMagasin.on('pointerdown', () => this.getConditionsP('magasin1'));
    }
    else if(statistiques.getBank() >= buildingListMk1[11].price && statistiques.getConditions(buildingListMk1[11].name) <= statistiques.getPop()){
      this.buttonBuildingMagasin.setInteractive({useHandCursor: true});
      this.buttonBuildingMagasin.on('pointerdown', () => this.placeBuildingEconomie('magasin1'));
    }
    this.buttonBuildingMagasin.setOrigin(-3, 0);
    this.buttonBuildingMagasin.setScrollFactor(0);
    this.buttonBuildingMagasin.fixedToCamera = true;
    this.prixMagasin = this.add.text(500, 550, buildingListMk1[11].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textMagasin = this.add.text(490, 575, "Magasin", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Magasin Info
    this.buttonInfoMagasin = this.add.image(285,560, 'iconeInfo');
    this.buttonInfoMagasin.displayWidth = 50;
    this.buttonInfoMagasin.scaleY = this.buttonInfoMagasin.scaleX;
    this.buttonInfoMagasin.setInteractive({useHandCursor: true});
    this.buttonInfoMagasin.on('pointerdown', () => this.getInfo('magasin1'));
    this.buttonInfoMagasin.setOrigin(-3, 0);
    this.buttonInfoMagasin.setScrollFactor(0);
    this.buttonInfoMagasin.fixedToCamera = true;

    //Usine
    this.buttonBuildingUsine = this.add.image(550,290, 'usine1');
    if(statistiques.getBank() < buildingListMk1[12].price || statistiques.getConditions(buildingListMk1[12].name) > statistiques.getPop()) {
      let croix = this.add.sprite(1400, 400, 'croix');
      croix.depth = 300;
      croix.displayWidth = 50;
      croix.scaleX = croix.scaleY;

      this.buttonBuildingUsine.setInteractive({useHandCursor: true});
      this.buttonBuildingUsine.on('pointerdown', () => this.getConditionsP('usine1'));
    }
    else if(statistiques.getBank() >= buildingListMk1[12].price && statistiques.getConditions(buildingListMk1[12].name) <= statistiques.getPop()){
      this.buttonBuildingUsine.setInteractive({useHandCursor: true});
      this.buttonBuildingUsine.on('pointerdown', () => this.placeBuildingEconomie('usine1'));
    }
    this.buttonBuildingUsine.setOrigin(-3, 0);
    this.buttonBuildingUsine.setScrollFactor(0);
    this.buttonBuildingUsine.fixedToCamera = true;
    this.prixUsine = this.add.text(1400, 540, buildingListMk1[12].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textUsine = this.add.text(1400, 565, "Usine", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Usine Info
    this.buttonInfoUsine = this.add.image(1200,550, 'iconeInfo');
    this.buttonInfoUsine.displayWidth = 50;
    this.buttonInfoUsine.scaleY = this.buttonInfoUsine.scaleX;
    this.buttonInfoUsine.setInteractive({useHandCursor: true});
    this.buttonInfoUsine.on('pointerdown', () => this.getInfo('usine1'));
    this.buttonInfoUsine.setOrigin(-3, 0);
    this.buttonInfoUsine.setScrollFactor(0);
    this.buttonInfoUsine.fixedToCamera = true;
  }

  getConditionsP(name){
    temp = statistiques.getInfoBuilding(name);
    this.scene.launch('CNR');
  }

  placeBuildingEconomie(name){
    this.scene.stop('economie').stop('stat');
    statistiques.saveBatiment(name);
    statistiques.setBank(buildingListMk1[statistiques.getId(name)].price);
    var scene = this.scene.get("MainScene");
    var bat = scene.displaybatiment(name,false,undefined); 
    this.sound.add("dollar",{loop: false, volume:0.5}).play();
  }

  close(){
    this.scene.stop('economie').stop('stat');
  }

  getInfo(name){
    temp = statistiques.getInfoBuilding(name);
    this.scene.sleep('economie');
    this.scene.launch('info');
  }
}


class Info extends Phaser.Scene{
  create(){
    let sousMenuInfo = this.add.rectangle(640, 450, 600, 500, 0xffffff);
    let sousMenuRec = this.add.rectangle(640, 450, 600, 500);
    sousMenuRec.setStrokeStyle(3, 0x080808);

    let batimentDesc = this.add.rectangle(1260, 450, 600, 500, 0xffffff);
    let sousMenuRec2 = this.add.rectangle(1260, 450, 600, 500);
    sousMenuRec2.setStrokeStyle(3, 0x080808);

    //Ajout Sprite image
    this.displayBuilding = this.add.image(860,450, temp[0]);
    this.displayBuilding.displayWidth = 400;
    this.displayBuilding.scaleY = this.displayBuilding.scaleX;

    //Close bouton
    this.closeButton = this.add.sprite(1530, 235, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Text Info
    this.textInfo = this.add.text(400, 270, 'Informations sur le bâtiment !', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textName = this.add.text(400, 310, 'Nom : ' + temp[8], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textPrice = this.add.text(400, 350, 'Prix : ' + temp[1] + '$', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textIncome = this.add.text(400, 390, 'Income généré : ' + temp[2] + '$/jour', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textEconomieInfo = this.add.text(400, 430, 'Impact economique : ' + temp[3], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textEcologieInfo = this.add.text(400, 470, 'Impact écologique : ' + temp[4], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textBienEtreInfo = this.add.text(400, 510, 'Impact sur le bien-être : ' + temp[5], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textPop = this.add.text(400, 550, 'Population ajouté : ' + temp[6], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Text description 
    this.titleDesc = this.add.text(1060, 250, 'Description du batiment:', {fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8); 
    this.textDesc = this.add.text(1060, 350, temp[7], {fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff0).setWordWrapWidth(400);
  }

  close(){
    this.scene.stop('info');
  }
}


class buildingMenu extends Phaser.Scene{
  create(){
    //Close bouton
    this.closeButton = this.add.sprite(1530, 235, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Button Move
    this.movebutton = this.add.sprite(750, 700, 'move');
    this.movebutton.displayWidth = 150;
    this.movebutton.scaleY = this.movebutton.scaleX;
    this.movebutton.depth = 200;
    this.movebutton.setInteractive({  useHandCursor: true});
    this.movebutton.on('pointerdown', () => this.teleportBuilding());

    //Button Upgrade
    this.upgradebutton = this.add.sprite(1150, 700, 'star');
    this.upgradebutton.displayWidth = 150;
    this.upgradebutton.scaleY = this.upgradebutton.scaleX;
    this.upgradebutton.depth = 200;
    this.upgradebutton.setInteractive({  useHandCursor: true});
    this.upgradebutton.on('pointerdown', () => this.getInfoUpgrade(temp[0]));
  }

  close(){
    this.scene.stop('menu');
  }

  teleportBuilding(name){
    this.scene.stop('info').stop('menu').stop('techno');
    var scene = this.scene.get("MainScene");
    var bat = scene.replaceBuilding(temp[0]);
  }

   getInfoUpgrade(name){
    let word = name.substring(name.length - 1);
    if( word == 2 ){
      let newword = name.slice(0, -1);
      let finalword =  newword + "3";
      temp = statistiques.getInfoBuilding(finalword);
      this.scene.launch('showUpgrade');
      this.scene.stop('info').stop('menu').stop('techno');
    }
    else if (word == 1) {
      let editedtext = name.slice(0, -1);
      let newtest = editedtext + "2";
      temp = statistiques.getInfoBuilding(newtest);
      this.scene.launch('showUpgrade');
      this.scene.stop('info').stop('menu').stop('techno');
    }
    if (word == 3 || name == "panneau_solaire"){ 
      this.scene.launch('unableToUpgrade');
      this.scene.stop('info').stop('menu').stop('techno');
    }
  }

  close(){
    this.scene.stop('info').stop('menu').stop('techno');
  }
}

class showUpgrade extends Phaser.Scene{
  create(){
    //Close bouton
    this.closeButton = this.add.sprite(1530, 235, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Rectangle
    let Upgradeinfo = this.add.rectangle(640, 450, 600, 500, 0xffffff);
    let sousMenuRec = this.add.rectangle(640, 450, 600, 500);
    sousMenuRec.setStrokeStyle(3, 0x080808);

    let batimentDesc = this.add.rectangle(1260, 450, 600, 500, 0xffffff);
    let sousMenuRec2 = this.add.rectangle(1260, 450, 600, 500);
    sousMenuRec2.setStrokeStyle(3, 0x080808);

    let buyconfirm = this.add.rectangle(980, 650, 600, 100, 0x999999);
    let sousMenuRec3 = this.add.rectangle(980, 650, 600, 100);
    sousMenuRec3.setStrokeStyle(4, 0x080808);

   //Text Info
    this.textNameUpgrade = this.add.text(400, 250, 'Nom : ' + temp[8], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textPriceUpgrade = this.add.text(400, 300, 'Prix : ' + temp[1], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textIncomeUpgrade = this.add.text(400, 350, 'Income généré : ' + temp[2], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textEconomieInfoUpgrade = this.add.text(400, 400, 'Impact economique : ' + temp[3], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textEcologieInfoUpgrade = this.add.text(400, 450, 'Impact écologique : ' + temp[4], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textBienEtreInfoUpgrade = this.add.text(400, 500, 'Impact sur le bien-être : ' + temp[5], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textPopUpgrade = this.add.text(400, 550, 'Population ajouté : ' + temp[6], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Ajout Sprite image
    this.displayBuilding = this.add.image(860,450, temp[0]);
    this.displayBuilding.displayWidth = 400;
    this.displayBuilding.scaleY = this.displayBuilding.scaleX;

    //Text description 
    this.titleDesc = this.add.text(1060, 250, 'Description du batiment:', {fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8); 
    this.textDesc = this.add.text(1060, 350, temp[7], {fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff0).setWordWrapWidth(400);

    //Text shop
    this.shopPop = this.add.text(820, 640, 'Achetez-vous ce batiment pour ' + temp[1] + '?', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);    
    
    this.confirmbutton = this.add.sprite(900, 750, 'confirm');
    this.confirmbutton.displayWidth = 150;
    this.confirmbutton.scaleY = this.confirmbutton.scaleX;
    this.confirmbutton.depth = 200;
    this.confirmbutton.setInteractive({  useHandCursor: true});
    this.confirmbutton.on('pointerdown', () => this.confirmUpgrade(temp[0]));
    
    this.cancelbutton = this.add.sprite(1100, 760, 'cancel');
    this.cancelbutton.displayWidth = 150;
    this.cancelbutton.scaleY = this.cancelbutton.scaleX;
    this.cancelbutton.depth = 200;
    this.cancelbutton.setInteractive({  useHandCursor: true});
    this.cancelbutton.on('pointerdown', () => this.close());

  }

 confirmUpgrade(name){
    if(statistiques.getLvlMairie() == 3){
      this.scene.stop('showUpgrade');
      var scene = this.scene.get("MainScene");
      var bat = scene.displaybatiment(name, true,undefined); 
       this.sound.add("dollar",{loop: false, volume:0.5}).play();
    }

    else if(statistiques.getConditions(temp[0]) <= statistiques.getPop() && statistiques.getBuildingPrice(temp[0]) <= statistiques.getBank() && statistiques.getLvlMairie() == name.substring(name.length - 1)){
      this.scene.stop('showUpgrade');
      var scene = this.scene.get("MainScene");
      var bat = scene.displaybatiment(name, true,undefined); 
       this.sound.add("dollar",{loop: false, volume:0.5}).play();
    }

    else if(name.substring(0, name.length - 1) == ('mairie') && statistiques.getConditions(temp[0]) <= statistiques.getPop() && statistiques.getBuildingPrice(temp[0]) <= statistiques.getBank()){
      this.scene.stop('showUpgrade');
      var scene = this.scene.get("MainScene");
      var bat = scene.displaybatiment(name, true,undefined); 
       this.sound.add("dollar",{loop: false, volume:0.5}).play();
    }
    
    else if(statistiques.getConditions(temp[0]) > statistiques.getPop() || statistiques.getBuildingPrice(temp[0]) > statistiques.getBank() || statistiques.getLvlMairie() != name.substring(name.length - 1)){
      this.scene.launch('CNR');
    }
  }

  close(){
    this.scene.stop('showUpgrade').stop('techno');
  }
}

class techno extends Phaser.Scene{
  create(){
    //Bouton Upgrade
    this.upgradebutton = this.add.sprite(950, 700, 'techno');
    this.upgradebutton.displayWidth = 150;
    this.upgradebutton.scaleY = this.upgradebutton.scaleX;
    this.upgradebutton.depth = 200;
    this.upgradebutton.setInteractive({  useHandCursor: true});
    this.upgradebutton.on('pointerdown', () => this.mairieTechno()); 
  }

  mairieTechno(){
    //Close button

    this.upgradebutton.setVisible(false);

    this.closeButton = this.add.sprite(1680, 80, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Mairie niveau 1
    if(temp[0] == buildingListMk1[13].name){
      this.textTechno = this.add.text(400, 270, 'Technologie', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      let sousMenuEcologie = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
      let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
      sousMenuRec1.setStrokeStyle(3, 0x080808);

      //Feu malvoyant
      this.buttonFeu1 = this.add.image(-125,160, 'feuMalvoyant');
      for(let i = 0; i < unlocked.length; i++){
        if('feuMalvoyant' == unlocked[i]){
          let check = this.add.sprite(400, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[0].price && !statistiques.isTechnoBought('feuMalvoyant')) { 
        let croix = this.add.sprite(400, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[0].price && !statistiques.isTechnoBought('feuMalvoyant')){
        this.buttonFeu1.setInteractive({useHandCursor: true});
        this.buttonFeu1.on('pointerdown', () => this.buyTechno('feuMalvoyant'));
      }
      this.buttonFeu1.setOrigin(-3, 0);
      this.buttonFeu1.setScrollFactor(0);
      this.buttonFeu1.fixedToCamera = true;
      this.prixFeu1 = this.add.text(380,350, technologieT1[0].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textFeu1 = this.add.text(310,370, technologieT1[0].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Feu malvoyant Info
      this.buttonInfoFeu1 = this.add.image(100,360, 'iconeInfo');
      this.buttonInfoFeu1.displayWidth = 50;
      this.buttonInfoFeu1.scaleY = this.buttonInfoFeu1.scaleX;
      this.buttonInfoFeu1.setInteractive({useHandCursor: true});
      this.buttonInfoFeu1.on('pointerdown', () => this.getInfoT('feuMalvoyant'));
      this.buttonInfoFeu1.setOrigin(-3, 0);
      this.buttonInfoFeu1.setScrollFactor(0);
      this.buttonInfoFeu1.fixedToCamera = true;

      //SpotWifi
      this.buttonspotWifi = this.add.image(20,140, 'spotwifi');
      for(let i = 0; i < unlocked.length; i++){
        if('spotwifi' == unlocked[i]){
          let check = this.add.sprite(720, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[1].price && !statistiques.isTechnoBought('spotwifi')) { 
        let croix = this.add.sprite(720, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[1].price && !statistiques.isTechnoBought('spotwifi')){
        this.buttonspotWifi.setInteractive({useHandCursor: true});
        this.buttonspotWifi.on('pointerdown', () => this.buyTechno('spotwifi'));
      }
      this.buttonspotWifi.setOrigin(-3, 0);
      this.buttonspotWifi.setScrollFactor(0);
      this.buttonspotWifi.fixedToCamera = true;
      this.prixspotWifi = this.add.text(690,352, technologieT1[1].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textspotWifi = this.add.text(680,372, technologieT1[1].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //spotWifi Info
      this.buttonInfospotWifi = this.add.image(470,360, 'iconeInfo');
      this.buttonInfospotWifi.displayWidth = 50;
      this.buttonInfospotWifi.scaleY = this.buttonInfospotWifi.scaleX;
      this.buttonInfospotWifi.setInteractive({useHandCursor: true});
      this.buttonInfospotWifi.on('pointerdown', () => this.getInfoT('spotwifi'));
      this.buttonInfospotWifi.setOrigin(-3, 0);
      this.buttonInfospotWifi.setScrollFactor(0);
      this.buttonInfospotWifi.fixedToCamera = true;

      //feu Smart
      this.buttonFeu2 = this.add.image(750,225, 'feuSmart');
      for(let i = 0; i < unlocked.length; i++){
        if('feuSmart' == unlocked[i]){
          let check = this.add.sprite(950, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[2].price && !statistiques.isTechnoBought('feuSmart')) { 
        let croix = this.add.sprite(950, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[2].price && !statistiques.isTechnoBought('feuSmart')){
        this.buttonFeu2.setInteractive({useHandCursor: true});
        this.buttonFeu2.on('pointerdown', () => this.buyTechno('feuSmart'));
      }
      this.buttonFeu2.setOrigin(-3, 0);
      this.buttonFeu2.setScrollFactor(0);
      this.buttonFeu2.fixedToCamera = true;
      this.prixFeu2 = this.add.text(930, 350, technologieT1[2].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textFeu2 = this.add.text(900, 370, technologieT1[2].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //feu Smart Info
      this.buttonInfoFeu2 = this.add.image(705,360, 'iconeInfo');
      this.buttonInfoFeu2.displayWidth = 50;
      this.buttonInfoFeu2.scaleY = this.buttonInfoFeu2.scaleX;
      this.buttonInfoFeu2.setInteractive({useHandCursor: true});
      this.buttonInfoFeu2.on('pointerdown', () => this.getInfoT('feuSmart'));
      this.buttonInfoFeu2.setOrigin(-3, 0);
      this.buttonInfoFeu2.setScrollFactor(0);
      this.buttonInfoFeu2.fixedToCamera = true;

      //peage Vehicule Vert
      this.buttonPeageVehiVert = this.add.image(700,182, 'peageVehiVert');
      for(let i = 0; i < unlocked.length; i++){
        if('peageVehiVert' == unlocked[i]){
          let check = this.add.sprite(1220, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[3].price && !statistiques.isTechnoBought('peageVehiVert')) { 
        let croix = this.add.sprite(1220, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[3].price && !statistiques.isTechnoBought('peageVehiVert')){
        this.buttonPeageVehiVert.setInteractive({useHandCursor: true});
        this.buttonPeageVehiVert.on('pointerdown', () => this.buyTechno('peageVehiVert'));
      }
      this.buttonPeageVehiVert.setOrigin(-3, 0);
      this.buttonPeageVehiVert.setScrollFactor(0);
      this.buttonPeageVehiVert.fixedToCamera = true;
      this.prixPeageVehiVert = this.add.text(1200, 350, technologieT1[3].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textPeageVehiVert = this.add.text(1095, 370, technologieT1[3].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //peage Vehicule Vert Info
      this.buttonInfoPeageVehiVert = this.add.image(900,360, 'iconeInfo');
      this.buttonInfoPeageVehiVert.displayWidth = 50;
      this.buttonInfoPeageVehiVert.scaleY = this.buttonInfoPeageVehiVert.scaleX;
      this.buttonInfoPeageVehiVert.setInteractive({useHandCursor: true});
      this.buttonInfoPeageVehiVert.on('pointerdown', () => this.getInfoT('peageVehiVert'));
      this.buttonInfoPeageVehiVert.setOrigin(-3, 0);
      this.buttonInfoPeageVehiVert.setScrollFactor(0);
      this.buttonInfoPeageVehiVert.fixedToCamera = true;

      //e-administration
      this.buttonE_Admin = this.add.image(990,160, 'e_Admin');
      for(let i = 0; i < unlocked.length; i++){
        if('e_Admin' == unlocked[i]){
          let check = this.add.sprite(1520, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[4].price && !statistiques.isTechnoBought('e_Admin')) { 
        let croix = this.add.sprite(1520, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[4].price && !statistiques.isTechnoBought('e_Admin')){
        this.buttonE_Admin.setInteractive({useHandCursor: true});
        this.buttonE_Admin.on('pointerdown', () => this.buyTechno('e_Admin'));
      }
      this.buttonE_Admin.setOrigin(-3, 0);
      this.buttonE_Admin.setScrollFactor(0);
      this.buttonE_Admin.fixedToCamera = true;
      this.prixE_Admin = this.add.text(1495, 350, technologieT1[4].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textE_Admin = this.add.text(1450, 370, technologieT1[4].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //e-administration Info
      this.buttonInfoE_Admin = this.add.image(1250,360, 'iconeInfo');
      this.buttonInfoE_Admin.displayWidth = 50;
      this.buttonInfoE_Admin.scaleY = this.buttonInfoE_Admin.scaleX;
      this.buttonInfoE_Admin.setInteractive({useHandCursor: true});
      this.buttonInfoE_Admin.on('pointerdown', () => this.getInfoT('e_Admin'));
      this.buttonInfoE_Admin.setOrigin(-3, 0);
      this.buttonInfoE_Admin.setScrollFactor(0);
      this.buttonInfoE_Admin.fixedToCamera = true;

      //Système de gestion des déchets intelligents
      this.buttonDechetIntell = this.add.image(-200,500, 'dechetIntell');
      for(let i = 0; i < unlocked.length; i++){
        if('dechetIntell' == unlocked[i]){
          let check = this.add.sprite(480, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[5].price && !statistiques.isTechnoBought('dechetIntell')) { 
        let croix = this.add.sprite(480, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[5].price && !statistiques.isTechnoBought('dechetIntell')){
        this.buttonDechetIntell.setInteractive({useHandCursor: true});
        this.buttonDechetIntell.on('pointerdown', () => this.buyTechno('dechetIntell'));
      }
      this.buttonDechetIntell.setOrigin(-3, 0);
      this.buttonDechetIntell.setScrollFactor(0);
      this.buttonDechetIntell.fixedToCamera = true;
      this.prixDechetIntell = this.add.text(480, 680, technologieT1[5].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textDechetIntell = this.add.text(320, 710, technologieT1[5].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //Système de gestion des déchets intelligents Info
      this.buttonInfoDechetIntell = this.add.image(115,700, 'iconeInfo');
      this.buttonInfoDechetIntell.displayWidth = 50;
      this.buttonInfoDechetIntell.scaleY = this.buttonInfoDechetIntell.scaleX;
      this.buttonInfoDechetIntell.setInteractive({useHandCursor: true});
      this.buttonInfoDechetIntell.on('pointerdown', () => this.getInfoT('dechetIntell'));
      this.buttonInfoDechetIntell.setOrigin(-3, 0);
      this.buttonInfoDechetIntell.setScrollFactor(0);
      this.buttonInfoDechetIntell.fixedToCamera = true;

      //passageCamions
      this.buttonPassageCamions = this.add.image(300,540, 'passageCamions');
      for(let i = 0; i < unlocked.length; i++){
        if('passageCamions' == unlocked[i]){
          let check = this.add.sprite(810, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[6].price && !statistiques.isTechnoBought('passageCamions')) { 
        let croix = this.add.sprite(810, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[6].price && !statistiques.isTechnoBought('passageCamions')){
        this.buttonPassageCamions.setInteractive({useHandCursor: true});
        this.buttonPassageCamions.on('pointerdown', () => this.buyTechno('passageCamions'));
      }
      this.buttonPassageCamions.setOrigin(-3, 0);
      this.buttonPassageCamions.setScrollFactor(0);
      this.buttonPassageCamions.fixedToCamera = true;
      this.prixPassageCamions = this.add.text(815, 690, technologieT1[6].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textPassageCamions = this.add.text(750, 705, technologieT1[6].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //passageCamions Info
      this.buttonInfoPassageCamions = this.add.image(550,700, 'iconeInfo');
      this.buttonInfoPassageCamions.displayWidth = 50;
      this.buttonInfoPassageCamions.scaleY = this.buttonInfoPassageCamions.scaleX;
      this.buttonInfoPassageCamions.setInteractive({useHandCursor: true});
      this.buttonInfoPassageCamions.on('pointerdown', () => this.getInfoT('passageCamions'));
      this.buttonInfoPassageCamions.setOrigin(-3, 0);
      this.buttonInfoPassageCamions.setScrollFactor(0);
      this.buttonInfoPassageCamions.fixedToCamera = true;

      //capteurPoub
      this.buttonCapteurPoub = this.add.image(600,525, 'capteurPoub');
      for(let i = 0; i < unlocked.length; i++){
        if('capteurPoub' == unlocked[i]){
          let check = this.add.sprite(1100, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[7].price && !statistiques.isTechnoBought('capteurPoub')) { 
        let croix = this.add.sprite(1100, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[7].price && !statistiques.isTechnoBought('capteurPoub')){
        this.buttonCapteurPoub.setInteractive({useHandCursor: true});
        this.buttonCapteurPoub.on('pointerdown', () => this.buyTechno('capteurPoub'));
      }
      this.buttonCapteurPoub.setOrigin(-3, 0);
      this.buttonCapteurPoub.setScrollFactor(0);
      this.buttonCapteurPoub.fixedToCamera = true;
      this.prixCapteurPoub = this.add.text(1100, 690, technologieT1[7].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCapteurPoub = this.add.text(1050, 710, technologieT1[7].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //capteurPoub Info
      this.buttonInfoCapteurPoub = this.add.image(855,700, 'iconeInfo');
      this.buttonInfoCapteurPoub.displayWidth = 50;
      this.buttonInfoCapteurPoub.scaleY = this.buttonInfoCapteurPoub.scaleX;
      this.buttonInfoCapteurPoub.setInteractive({useHandCursor: true});
      this.buttonInfoCapteurPoub.on('pointerdown', () => this.getInfoT('capteurPoub'));
      this.buttonInfoCapteurPoub.setOrigin(-3, 0);
      this.buttonInfoCapteurPoub.setScrollFactor(0);
      this.buttonInfoCapteurPoub.fixedToCamera = true;

      //LED
      this.buttonLED = this.add.image(920,525, 'LED');
      for(let i = 0; i < unlocked.length; i++){
        if('LED' == unlocked[i]){
          let check = this.add.sprite(1450, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT1[8].price && !statistiques.isTechnoBought('LED')) { 
        let croix = this.add.sprite(1450, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT1[8].price && !statistiques.isTechnoBought('LED')){
        this.buttonLED.setInteractive({useHandCursor: true});
        this.buttonLED.on('pointerdown', () => this.buyTechno('LED'));
      }
      this.buttonLED.setOrigin(-3, 0);
      this.buttonLED.setScrollFactor(0);
      this.buttonLED.fixedToCamera = true;
      this.prixLED = this.add.text(1420, 690, technologieT1[8].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textLED = this.add.text(1380, 710, technologieT1[8].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //LED Info
      this.buttonInfoLED = this.add.image(1185,700, 'iconeInfo');
      this.buttonInfoLED.displayWidth = 50;
      this.buttonInfoLED.scaleY = this.buttonInfoLED.scaleX;
      this.buttonInfoLED.setInteractive({useHandCursor: true});
      this.buttonInfoLED.on('pointerdown', () => this.getInfoT('LED'));
      this.buttonInfoLED.setOrigin(-3, 0);
      this.buttonInfoLED.setScrollFactor(0);
      this.buttonInfoLED.fixedToCamera = true;
    }

    //Mairie niveau 2
     if(temp[0] == buildingListMk2[13].name){
      this.textTechno = this.add.text(400, 270, 'Technologie', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      let sousMenuEcologie = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
      let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
      sousMenuRec1.setStrokeStyle(3, 0x080808);

      //voitureElec
      this.buttonVoitureElec = this.add.image(-115,160, 'voitureElec');
      for(let i = 0; i < unlocked.length; i++){
        if('voitureElec' == unlocked[i]){
          let check = this.add.sprite(400, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[0].price && !statistiques.isTechnoBought('voitureElec')) { 
        let croix = this.add.sprite(400, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[0].price && !statistiques.isTechnoBought('voitureElec')){
        this.buttonVoitureElec.setInteractive({useHandCursor: true});
        this.buttonVoitureElec.on('pointerdown', () => this.buyTechno('voitureElec'));
      }
      this.buttonVoitureElec.setOrigin(-3, 0);
      this.buttonVoitureElec.setScrollFactor(0);
      this.buttonVoitureElec.fixedToCamera = true;
      this.prixVoitureElec = this.add.text(395,350, technologieT2[0].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textVoitureElec = this.add.text(345,370, technologieT2[0].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //voitureElec Info
      this.buttonInfoVoitureElec = this.add.image(150,360, 'iconeInfo');
      this.buttonInfoVoitureElec.displayWidth = 50;
      this.buttonInfoVoitureElec.scaleY = this.buttonInfoVoitureElec.scaleX;
      this.buttonInfoVoitureElec.setInteractive({useHandCursor: true});
      this.buttonInfoVoitureElec.on('pointerdown', () => this.getInfoT('voitureElec'));
      this.buttonInfoVoitureElec.setOrigin(-3, 0);
      this.buttonInfoVoitureElec.setScrollFactor(0);
      this.buttonInfoVoitureElec.fixedToCamera = true;

      //routeElec
      this.buttonRouteElec = this.add.image(250,180, 'routeElec');
      for(let i = 0; i < unlocked.length; i++){
        if('routeElec' == unlocked[i]){
          let check = this.add.sprite(760, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[1].price && !statistiques.isTechnoBought('routeElec')) { 
        let croix = this.add.sprite(760, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[1].price && !statistiques.isTechnoBought('routeElec')){
        this.buttonRouteElec.setInteractive({useHandCursor: true});
        this.buttonRouteElec.on('pointerdown', () => this.buyTechno('routeElec'));
      }
      this.buttonRouteElec.setOrigin(-3, 0);
      this.buttonRouteElec.setScrollFactor(0);
      this.buttonRouteElec.fixedToCamera = true;
      this.prixRouteElec = this.add.text(750,350, technologieT2[1].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textRouteElec = this.add.text(650,370, technologieT2[1].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //routeElec Info
      this.buttonInfoRouteElec = this.add.image(450,360, 'iconeInfo');
      this.buttonInfoRouteElec.displayWidth = 50;
      this.buttonInfoRouteElec.scaleY = this.buttonInfoRouteElec.scaleX;
      this.buttonInfoRouteElec.setInteractive({useHandCursor: true});
      this.buttonInfoRouteElec.on('pointerdown', () => this.getInfoT('routeElec'));
      this.buttonInfoRouteElec.setOrigin(-3, 0);
      this.buttonInfoRouteElec.setScrollFactor(0);
      this.buttonInfoRouteElec.fixedToCamera = true;

      //parkingSmart
      this.buttonParkingSmart = this.add.image(650,200, 'parkingSmart');
      for(let i = 0; i < unlocked.length; i++){
        if('parkingSmart' == unlocked[i]){
          let check = this.add.sprite(1150, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[2].price && !statistiques.isTechnoBought('parkingSmart')) { 
        let croix = this.add.sprite(1150, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[2].price && !statistiques.isTechnoBought('parkingSmart')){
        this.buttonParkingSmart.setInteractive({useHandCursor: true});
        this.buttonParkingSmart.on('pointerdown', () => this.buyTechno('parkingSmart'));
      }
      this.buttonParkingSmart.setOrigin(-3, 0);
      this.buttonParkingSmart.setScrollFactor(0);
      this.buttonParkingSmart.fixedToCamera = true;
      this.prixParkingSmart = this.add.text(1150, 350, technologieT2[2].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textParkingSmart = this.add.text(1100, 370, technologieT2[2].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //parkingSmart Info
      this.buttonInfoParkingSmart = this.add.image(900,360, 'iconeInfo');
      this.buttonInfoParkingSmart.displayWidth = 50;
      this.buttonInfoParkingSmart.scaleY = this.buttonInfoParkingSmart.scaleX;
      this.buttonInfoParkingSmart.setInteractive({useHandCursor: true});
      this.buttonInfoParkingSmart.on('pointerdown', () => this.getInfoT('parkingSmart'));
      this.buttonInfoParkingSmart.setOrigin(-3, 0);
      this.buttonInfoParkingSmart.setScrollFactor(0);
      this.buttonInfoParkingSmart.fixedToCamera = true;

      //capteurMouv
      this.buttonCapteurMouv = this.add.image(1000,180, 'capteurMouv');
      for(let i = 0; i < unlocked.length; i++){
        if('capteurMouv' == unlocked[i]){
          let check = this.add.sprite(1500, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[6].price && !statistiques.isTechnoBought('capteurMouv')) { 
        let croix = this.add.sprite(1500, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[6].price && !statistiques.isTechnoBought('capteurMouv')){
        this.buttonCapteurMouv.setInteractive({useHandCursor: true});
        this.buttonCapteurMouv.on('pointerdown', () => this.buyTechno('capteurMouv'));
      }
      this.buttonCapteurMouv.setOrigin(-3, 0);
      this.buttonCapteurMouv.setScrollFactor(0);
      this.buttonCapteurMouv.fixedToCamera = true;
      this.prixCapteurMouv = this.add.text(1470, 350, technologieT2[6].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCapteurMouv = this.add.text(1350, 370, technologieT2[6].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //capteurMouv Info
      this.buttonInfoCapteurMouv = this.add.image(1150,360, 'iconeInfo');
      this.buttonInfoCapteurMouv.displayWidth = 50;
      this.buttonInfoCapteurMouv.scaleY = this.buttonInfoCapteurMouv.scaleX;
      this.buttonInfoCapteurMouv.setInteractive({useHandCursor: true});
      this.buttonInfoCapteurMouv.on('pointerdown', () => this.getInfoT('capteurMouv'));
      this.buttonInfoCapteurMouv.setOrigin(-3, 0);
      this.buttonInfoCapteurMouv.setScrollFactor(0);
      this.buttonInfoCapteurMouv.fixedToCamera = true;

      //bornes
      this.buttonBornes = this.add.image(0,540, 'bornes');
      for(let i = 0; i < unlocked.length; i++){
        if('bornes' == unlocked[i]){
          let check = this.add.sprite(550, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[3].price && !statistiques.isTechnoBought('bornes')) { 
        let croix = this.add.sprite(550, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[3].price && !statistiques.isTechnoBought('bornes')){
        this.buttonBornes.setInteractive({useHandCursor: true});
        this.buttonBornes.on('pointerdown', () => this.buyTechno('bornes'));
      }
      this.buttonBornes.setOrigin(-3, 0);
      this.buttonBornes.setScrollFactor(0);
      this.buttonBornes.fixedToCamera = true;
      this.prixBornes = this.add.text(500, 690, technologieT2[3].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textBornes = this.add.text(445, 710, technologieT2[3].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //bornes Info
      this.buttonInfoBornes = this.add.image(230,700, 'iconeInfo');
      this.buttonInfoBornes.displayWidth = 50;
      this.buttonInfoBornes.scaleY = this.buttonInfoBornes.scaleX;
      this.buttonInfoBornes.setInteractive({useHandCursor: true});
      this.buttonInfoBornes.on('pointerdown', () => this.getInfoT('bornes'));
      this.buttonInfoBornes.setOrigin(-3, 0);
      this.buttonInfoBornes.setScrollFactor(0);
      this.buttonInfoBornes.fixedToCamera = true;

      //compacPoub
      this.buttonCompacPoub = this.add.image(450,540, 'compacPoub');
      for(let i = 0; i < unlocked.length; i++){
        if('compacPoub' == unlocked[i]){
          let check = this.add.sprite(950, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[4].price && !statistiques.isTechnoBought('compacPoub')) { 
        let croix = this.add.sprite(950, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[4].price && !statistiques.isTechnoBought('compacPoub')){
        this.buttonCompacPoub.setInteractive({useHandCursor: true});
        this.buttonCompacPoub.on('pointerdown', () => this.buyTechno('compacPoub'));
      }
      this.buttonCompacPoub.setOrigin(-3, 0);
      this.buttonCompacPoub.setScrollFactor(0);
      this.buttonCompacPoub.fixedToCamera = true;
      this.prixCompacPoub = this.add.text(950, 690, technologieT2[4].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCompacPoub = this.add.text(900, 710, technologieT2[4].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //compacPoub Info
      this.buttonInfoCompacPoub = this.add.image(700,700, 'iconeInfo');
      this.buttonInfoCompacPoub.displayWidth = 50;
      this.buttonInfoCompacPoub.scaleY = this.buttonInfoCompacPoub.scaleX;
      this.buttonInfoCompacPoub.setInteractive({useHandCursor: true});
      this.buttonInfoCompacPoub.on('pointerdown', () => this.getInfoT('compacPoub'));
      this.buttonInfoCompacPoub.setOrigin(-3, 0);
      this.buttonInfoCompacPoub.setScrollFactor(0);
      this.buttonInfoCompacPoub.fixedToCamera = true;

      //IA_Trie
      this.buttonIA_Trie = this.add.image(900,525, 'IA_Trie');
      for(let i = 0; i < unlocked.length; i++){
        if('IA_Trie' == unlocked[i]){
          let check = this.add.sprite(1400, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT2[5].price && !statistiques.isTechnoBought('IA_Trie')) { 
        let croix = this.add.sprite(1400, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT2[5].price && !statistiques.isTechnoBought('IA_Trie')){
        this.buttonIA_Trie.setInteractive({useHandCursor: true});
        this.buttonIA_Trie.on('pointerdown', () => this.buyTechno('IA_Trie'));
      }
      this.buttonIA_Trie.setOrigin(-3, 0);
      this.buttonIA_Trie.setScrollFactor(0);
      this.buttonIA_Trie.fixedToCamera = true;
      this.prixIA_Trie = this.add.text(1390, 690, technologieT2[5].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textIA_Trie = this.add.text(1390, 710, technologieT2[5].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //IA_Trie Info
      this.buttonInfoIA_Trie = this.add.image(1190,700, 'iconeInfo');
      this.buttonInfoIA_Trie.displayWidth = 50;
      this.buttonInfoIA_Trie.scaleY = this.buttonInfoIA_Trie.scaleX;
      this.buttonInfoIA_Trie.setInteractive({useHandCursor: true});
      this.buttonInfoIA_Trie.on('pointerdown', () => this.getInfoT('IA_Trie'));
      this.buttonInfoIA_Trie.setOrigin(-3, 0);
      this.buttonInfoIA_Trie.setScrollFactor(0);
      this.buttonInfoIA_Trie.fixedToCamera = true;
    }

    //Mairie niveau 3

     if(temp[0] == buildingListMk3[13].name){
      this.textTechno = this.add.text(400, 270, 'Technologie', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      let sousMenuEcologie = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
      let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
      sousMenuRec1.setStrokeStyle(3, 0x080808);

      //voitureAuto
      this.buttonVoitureAuto = this.add.image(-240,180, 'voitureAuto');
      for(let i = 0; i < unlocked.length; i++){
        if('voitureAuto' == unlocked[i]){
          let check = this.add.sprite(450, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT3[0].price && !statistiques.isTechnoBought('voitureAuto')) { 
        let croix = this.add.sprite(450, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT3[0].price && !statistiques.isTechnoBought('voitureAuto')){
        this.buttonVoitureAuto.setInteractive({useHandCursor: true});
        this.buttonVoitureAuto.on('pointerdown', () => this.buyTechno('voitureAuto'));
      }
      this.buttonVoitureAuto.setOrigin(-3, 0);
      this.buttonVoitureAuto.setScrollFactor(0);
      this.buttonVoitureAuto.fixedToCamera = true;
      this.buttonVoitureAuto.displayWidth = 200;
      this.buttonVoitureAuto.scaleY = this.buttonVoitureAuto.scaleX;
      this.prixVoitureAuto = this.add.text(450,350, technologieT3[0].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textVoitureAuto = this.add.text(400,370, technologieT3[0].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //voitureAuto Info
      this.buttonInfoVoitureAuto = this.add.image(180,350, 'iconeInfo');
      this.buttonInfoVoitureAuto.displayWidth = 50;
      this.buttonInfoVoitureAuto.scaleY = this.buttonInfoVoitureAuto.scaleX;
      this.buttonInfoVoitureAuto.setInteractive({useHandCursor: true});
      this.buttonInfoVoitureAuto.on('pointerdown', () => this.getInfoT('voitureAuto'));
      this.buttonInfoVoitureAuto.setOrigin(-3, 0);
      this.buttonInfoVoitureAuto.setScrollFactor(0);
      this.buttonInfoVoitureAuto.fixedToCamera = true;

      //IAPolice
      this.buttonIAPolice = this.add.image(120,180, 'IAPolice');
      for(let i = 0; i < unlocked.length; i++){
        if('IAPolice' == unlocked[i]){
          let check = this.add.sprite(800, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT3[1].price && !statistiques.isTechnoBought('IAPolice')) { 
        let croix = this.add.sprite(800, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT3[1].price && !statistiques.isTechnoBought('IAPolice')){
        this.buttonIAPolice.setInteractive({useHandCursor: true});
        this.buttonIAPolice.on('pointerdown', () => this.buyTechno('IAPolice'));
      }
      this.buttonIAPolice.setOrigin(-3, 0);
      this.buttonIAPolice.setScrollFactor(0);
      this.buttonIAPolice.fixedToCamera = true;
      this.buttonIAPolice.displayWidth = 200;
      this.buttonIAPolice.scaleY = this.buttonIAPolice.scaleX;
      this.prixIAPolice = this.add.text(780,350, technologieT3[1].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textIAPolice = this.add.text(750,370, technologieT3[1].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //IAPolice Info
      this.buttonInfoIAPolice = this.add.image(540,360, 'iconeInfo');
      this.buttonInfoIAPolice.displayWidth = 50;
      this.buttonInfoIAPolice.scaleY = this.buttonInfoIAPolice.scaleX;
      this.buttonInfoIAPolice.setInteractive({useHandCursor: true});
      this.buttonInfoIAPolice.on('pointerdown', () => this.getInfoT('IAPolice'));
      this.buttonInfoIAPolice.setOrigin(-3, 0);
      this.buttonInfoIAPolice.setScrollFactor(0);
      this.buttonInfoIAPolice.fixedToCamera = true;

      //tuyauDech
      this.buttonTuyauDech = this.add.image(840,240, 'tuyauDech');
      for(let i = 0; i < unlocked.length; i++){
        if('tuyauDech' == unlocked[i]){
          let check = this.add.sprite(1160, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT3[2].price && !statistiques.isTechnoBought('tuyauDech')) { 
        let croix = this.add.sprite(1150, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT3[2].price && !statistiques.isTechnoBought('tuyauDech')){
        this.buttonTuyauDech.setInteractive({useHandCursor: true});
        this.buttonTuyauDech.on('pointerdown', () => this.buyTechno('tuyauDech'));
      }
      this.buttonTuyauDech.setOrigin(-3, 0);
      this.buttonTuyauDech.setScrollFactor(0);
      this.buttonTuyauDech.fixedToCamera = true;
      this.buttonTuyauDech.displayWidth = 100;
      this.buttonTuyauDech.scaleY = this.buttonTuyauDech.scaleX;
      this.prixTuyauDech = this.add.text(1145, 350, technologieT3[2].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textTuyauDech = this.add.text(1100, 370, technologieT3[2].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8).setWordWrapWidth(250);;

      //tuyauDech Info
      this.buttonInfoTuyauDech = this.add.image(900,370, 'iconeInfo');
      this.buttonInfoTuyauDech.displayWidth = 50;
      this.buttonInfoTuyauDech.scaleY = this.buttonInfoTuyauDech.scaleX;
      this.buttonInfoTuyauDech.setInteractive({useHandCursor: true});
      this.buttonInfoTuyauDech.on('pointerdown', () => this.getInfoT('tuyauDech'));
      this.buttonInfoTuyauDech.setOrigin(-3, 0);
      this.buttonInfoTuyauDech.setScrollFactor(0);
      this.buttonInfoTuyauDech.fixedToCamera = true;

      //IAClean
      this.buttonIAClean = this.add.image(800,200, 'IAClean');
      for(let i = 0; i < unlocked.length; i++){
        if('IAClean' == unlocked[i]){
          let check = this.add.sprite(1500, 300, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT3[3].price && !statistiques.isTechnoBought('IAClean')) { 
        let croix = this.add.sprite(1500, 300, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT3[3].price && !statistiques.isTechnoBought('IAClean')){
        this.buttonIAClean.setInteractive({useHandCursor: true});
        this.buttonIAClean.on('pointerdown', () => this.buyTechno('IAClean'));
      }
      this.buttonIAClean.setOrigin(-3, 0);
      this.buttonIAClean.setScrollFactor(0);
      this.buttonIAClean.fixedToCamera = true;
      this.buttonIAClean.displayWidth = 200;
      this.buttonIAClean.scaleY = this.buttonIAClean.scaleX;
      this.prixIAClean = this.add.text(1500, 350, technologieT3[3].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textIAClean = this.add.text(1450, 370, technologieT3[3].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //IAClean Info
      this.buttonInfoIAClean = this.add.image(1250, 360, 'iconeInfo');
      this.buttonInfoIAClean.displayWidth = 50;
      this.buttonInfoIAClean.scaleY = this.buttonInfoIAClean.scaleX;
      this.buttonInfoIAClean.setInteractive({useHandCursor: true});
      this.buttonInfoIAClean.on('pointerdown', () => this.getInfoT('IAClean'));
      this.buttonInfoIAClean.setOrigin(-3, 0);
      this.buttonInfoIAClean.setScrollFactor(0);
      this.buttonInfoIAClean.fixedToCamera = true;

      //capteurRes
      this.buttonCapteurRes = this.add.image(-170,530, 'capteurRes');
      for(let i = 0; i < unlocked.length; i++){
        if('capteurRes' == unlocked[i]){
          let check = this.add.sprite(690, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT3[4].price && !statistiques.isTechnoBought('capteurRes')) { 
        let croix = this.add.sprite(700, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT3[4].price && !statistiques.isTechnoBought('capteurRes')){
        this.buttonCapteurRes.setInteractive({useHandCursor: true});
        this.buttonCapteurRes.on('pointerdown', () => this.buyTechno('capteurRes'));
      }
      this.buttonCapteurRes.setOrigin(-3, 0);
      this.buttonCapteurRes.setScrollFactor(0);
      this.buttonCapteurRes.fixedToCamera = true;
      this.buttonCapteurRes.displayWidth = 250;
      this.buttonCapteurRes.scaleY = this.buttonCapteurRes.scaleX;
      this.prixCapteurRes = this.add.text(635, 700, technologieT3[4].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textCapteurRes = this.add.text(470, 720, technologieT3[4].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //capteurRes Info
      this.buttonInfoCapteurRes = this.add.image(270,710, 'iconeInfo');
      this.buttonInfoCapteurRes.displayWidth = 50;
      this.buttonInfoCapteurRes.scaleY = this.buttonInfoCapteurRes.scaleX;
      this.buttonInfoCapteurRes.setInteractive({useHandCursor: true});
      this.buttonInfoCapteurRes.on('pointerdown', () => this.getInfoT('capteurRes'));
      this.buttonInfoCapteurRes.setOrigin(-3, 0);
      this.buttonInfoCapteurRes.setScrollFactor(0);
      this.buttonInfoCapteurRes.fixedToCamera = true;

      //intelOpe
      this.buttonIntelOpe = this.add.image(750,580, 'intelOpe');
      for(let i = 0; i < unlocked.length; i++){
        if('intelOpe' == unlocked[i]){
          let check = this.add.sprite(1300, 650, 'check');
          check.depth = 300;
          check.displayWidth = 50;
          check.scaleX = check.scaleY;
        }
      }
      if(statistiques.getBank() < technologieT3[5].price && !statistiques.isTechnoBought('intelOpe')) { 
        let croix = this.add.sprite(1295, 650, 'croix');
        croix.depth = 300;
        croix.displayWidth = 50;
        croix.scaleX = croix.scaleY;
      }
      else if(statistiques.getBank() >= technologieT3[5].price && !statistiques.isTechnoBought('intelOpe')){
        this.buttonIntelOpe.setInteractive({useHandCursor: true});
        this.buttonIntelOpe.on('pointerdown', () => this.buyTechno('intelOpe'));
      }
      this.buttonIntelOpe.setOrigin(-3, 0);
      this.buttonIntelOpe.setScrollFactor(0);
      this.buttonIntelOpe.fixedToCamera = true;
      this.buttonIntelOpe.displayWidth = 150;
      this.buttonIntelOpe.scaleY = this.buttonIntelOpe.scaleX;
      this.prixIntelOpe = this.add.text(1250, 690, technologieT3[5].price +"$", { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.textIntelOpe = this.add.text(1160, 710, technologieT3[5].nom, { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

      //IntelOpe Info
      this.buttonInfoIntelOpe = this.add.image(955,700, 'iconeInfo');
      this.buttonInfoIntelOpe.displayWidth = 50;
      this.buttonInfoIntelOpe.scaleY = this.buttonInfoIntelOpe.scaleX;
      this.buttonInfoIntelOpe.setInteractive({useHandCursor: true});
      this.buttonInfoIntelOpe.on('pointerdown', () => this.getInfoT('intelOpe'));
      this.buttonInfoIntelOpe.setOrigin(-3, 0);
      this.buttonInfoIntelOpe.setScrollFactor(0);
      this.buttonInfoIntelOpe.fixedToCamera = true;
    }
  }

  buyTechno(name){
    statistiques.saveTechno(name);
    unlocked.push(name);
    statistiques.setBank(statistiques.getTechnoPrice(name));
    this.scene.launch('Bought').stop('techno').stop('menu').stop('info');
    this.sound.add("coin",{ volume:0.01}).play();

  }

  getInfoT(name){
    tempT = statistiques.getInfoTechno(name);
    this.scene.launch('infoTechno');
  }

  close(){
   
    this.scene.stop('info').stop('menu').stop('techno');
  }
}

class infoTechno extends Phaser.Scene{
  create(){
    let sousMenuInfo = this.add.rectangle(640, 450, 600, 500, 0xffffff);
    let sousMenuRec = this.add.rectangle(640, 450, 600, 500);
    sousMenuRec.setStrokeStyle(3, 0x080808);

    let batimentDesc = this.add.rectangle(1260, 450, 600, 500, 0xffffff);
    let sousMenuRec2 = this.add.rectangle(1260, 450, 600, 500);
    sousMenuRec2.setStrokeStyle(3, 0x080808);

    //Close bouton
    this.closeButton = this.add.sprite(1530, 235, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    //Text Info
    this.textInfoTechno = this.add.text(400, 270, 'Informations sur la technologie !', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textNameTechno = this.add.text(400, 310, 'Nom : ' + tempT[1], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textPriceTechno = this.add.text(400, 350, 'Prix : ' + tempT[2] + '$', { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textEconomieInfoTechno = this.add.text(400, 430, 'Impact economique : ' + tempT[3], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textEcologieInfoTechno = this.add.text(400, 470, 'Impact écologique : ' + tempT[4], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.textBienEtreInfoTechno = this.add.text(400, 510, 'Impact sur le bien-être : ' + tempT[5], { fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    //Text description 
    this.titleDesc = this.add.text(1060, 250, 'Description de la technologie :', {fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff00, 8); 
    this.textDesc = this.add.text(1060, 350, tempT[6], {fill: 0xffffff, font: 'bold 18px system-ui' }).setShadow(2, 2, 0xffff0).setWordWrapWidth(400);;
  }

  close(){
    this.scene.stop('infoTechno');
  }
}

class Bought extends Phaser.Scene{
    create(){
    let buyconfirm = this.add.rectangle(980, 500, 600, 100, 0x999999);
    let sousMenuRec3 = this.add.rectangle(980, 500, 600, 100);
    sousMenuRec3.setStrokeStyle(4, 0x080808);

    this.text = this.add.text(880, 480, 'Technologie achetée !', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);

    this.confirmbutton = this.add.sprite(1000, 600, 'confirm');
    this.confirmbutton.displayWidth = 150;
    this.confirmbutton.scaleY = this.confirmbutton.scaleX;
    this.confirmbutton.depth = 200;
    this.confirmbutton.setInteractive({  useHandCursor: true});
    this.confirmbutton.on('pointerdown', () => this.close());
  }

  close(){
    this.scene.stop('Bought').launch('techno').launch('info').launch('menu');
  }
}

class unableToUpgrade extends Phaser.Scene{
  create(){
    //Close bouton
    this.closeButton = this.add.sprite(1400, 320, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    let dlcBatiment = this.add.rectangle(980, 450, 900, 300, 0xffffff);
    let sousMenuRec4 = this.add.rectangle(980, 450, 900, 300);
    sousMenuRec4.setStrokeStyle(4, 0x080808);


    this.titleUpgrade = this.add.text(750, 350, "Plus d'améliorations disponibles !", { fill: 0xffffff, font: 'bold 32px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.dlcDesc = this.add.text(620, 430, "Vous trouverez nos prochains bâtiments dans notre prochain DLC !" , { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
  }
   close(){
    this.scene.stop('showUpgrade').stop('techno').stop('unableToUpgrade');
  }
}

class conditionsNonRemplies extends Phaser.Scene{
  create(){
    //Close bouton
    this.closeButton = this.add.sprite(1450, 310, 'close');
    this.closeButton.displayWidth = 50;
    this.closeButton.scaleY = this.closeButton.scaleX;
    this.closeButton.depth = 200;
    this.closeButton.setInteractive({  useHandCursor: true});
    this.closeButton.on('pointerdown', () => this.close());

    let Rec4 = this.add.rectangle(980, 450, 1000, 350, 0xffffff);
    let sousMenuRec4 = this.add.rectangle(980, 450, 1000, 350);
    sousMenuRec4.setStrokeStyle(4, 0x080808);

    let i = parseInt(statistiques.getLvlMairie().substring(statistiques.getLvlMairie().length - 1));
    i = i + 1;
    this.add.text(530, 430, 'Vous ne pouvez pas acheter ça. Il vous faut ' + statistiques.getBuildingPrice(temp[0]) + '$ et au moins ' + statistiques.getConditions(temp[0]) + ' habitants.', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    if(temp[0].substring(0,temp[0].length - 1) != 'mairie') { this.add.text(670, 460, 'Vous devez aussi avoir votre mairie au niveau ' + i + '.', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8); }
  }

  close(){
    this.scene.stop('showUpgrade').stop('techno').stop('unableToUpgrade').stop('CNR');
  }
}


class End extends Phaser.Scene{
  create(){
    let sousMenuEcologie = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
    let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
    sousMenuRec1.setStrokeStyle(3, 0x080808);

    let resultat;

    let calculFin = ((statistiques.getEconomie() * 0.1) + (statistiques.getEcologie() * 0.1) + (statistiques.getBienEtre() * 0.1)) / 3;

    
    if(calculFin <= 2){ resultat = this.add.sprite(1350, 450, 'D');} 
    if(2 < calculFin && calculFin <= 4){ resultat = this.add.sprite(1350, 450, 'C');} 
    if(4 < calculFin && calculFin <= 6){ resultat = this.add.sprite(1350, 450, 'B');}
    if(6 < calculFin && calculFin <= 8){ resultat = this.add.sprite(1350, 450, 'A');}
    if(8 < calculFin && calculFin < 10){ resultat = this.add.sprite(1350, 450, 'S');} 
    if(calculFin >= 10){ resultat = this.add.sprite(1530, 235, 'SS');}   
    this.add.text(650, 430, 'Votre mandat prend fin. Vous avez la note de : ', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.returnMenu = this.add.sprite(900, 800, 'return');
    this.returnMenu.setInteractive({  useHandCursor: true});
    this.returnMenu.on('pointerdown', () => this.returnToMenu());

    this.add.text(650, 430, 'Votre mandat prend fin. Vous avez la note de : ', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.add.text(650, 500, 'Economie :' + statistiques.getEconomie(), { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.add.text(650, 530, 'Ecologie : ' + statistiques.getEcologie(), { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
    this.add.text(650, 560, 'Bien-Être : ' + statistiques.getBienEtre(), { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
  }
   returnToMenu()
  {
document.location.reload();
  }
}

class Defeat extends Phaser.Scene{
  create(){
    var hud = this.scene.get('hud');

    let sousMenuEcologie = this.add.rectangle(960, 450, 1500, 800, 0xffffff);
    let sousMenuRec1 = this.add.rectangle(960, 450, 1500, 800);
    sousMenuRec1.setStrokeStyle(3, 0x080808);
    if (statistiques.getEconomie()*0.1  <= 0) 
    { 
      console.log("economie sous 0")
      loseEconomie = "L'Economie";
      this.statText = this.add.text(600, 650, "L'Economie", { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.piggybank = this.add.sprite(500, 600, 'poor');
      this.piggybank.displayWidth = 200;
      this.piggybank.scaleY = this.piggybank.scaleX;
    }
    else
    {
      loseEconomie ="";
    }
    if (statistiques.getEcologie()*0.1  <= 0) 
    {
      console.log("ecologie sous 0")
      loseEcologie = "L'Ecologie";
      this.statText = this.add.text(1100, 650, "L'Ecologie", { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.witedflower = this.add.sprite(1000, 600, 'flower');
      this.witedflower.displayWidth = 200;
      this.witedflower.scaleY = this.witedflower.scaleX;
    }
    else
    {
      loseEcologie ="";
    }
       if (statistiques.getBienEtre()*0.1  <= 0) 
    {
      console.log("bien-être sous 0")
      loseBienEtre = "Le Bien-Être";
      this.statText = this.add.text(1500, 650, "Le Bien-Être", { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8);
      this.brokenheart = this.add.sprite(1400, 600, 'brokenheart');
      this.brokenheart.displayWidth = 200;
      this.brokenheart.scaleY = this.brokenheart.scaleX;
    }
    else
    {
      loseBienEtre ="";
    }
  this.loseImage = this.add.sprite(1450, 270, 'lose');
  this.add.text(250,200, 'DEFAITE',{ fill: 0xffffff, font: 'bold 36px system-ui' }).setShadow(2, 2, 0xffff00, 8);
  this.add.text(250, 400, 'Les statistiques suivantes sont restées dans le négatif pendant une trop grande durée : ', { fill: 0xffffff, font: 'bold 24px system-ui' }).setShadow(2, 2, 0xffff00, 8).setWordWrapWidth(500);
  this.returnMenu = this.add.sprite(900, 800, 'return');
  this.returnMenu.setInteractive({  useHandCursor: true});
  this.returnMenu.on('pointerdown', () => this.returnToMenu());
  this.sound.add("clown",{ volume:0.5}).play();
 
  }
  returnToMenu()
  {
document.location.reload();
  }
}
