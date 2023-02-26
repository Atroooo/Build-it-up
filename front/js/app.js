let statistiques = new gameStat();

let gameConfig = {
  width : 1900,
    height : 910,
  backgroundColor : "4488AA",
    type : Phaser.AUTO,
  scene: [preloadmenu,playmenu,MainScene,
  new tutoriel({key: 'tutoriel'}),
  new Tuto2({key: 'Tuto2'}),
  new Tuto3({key: 'Tuto3'}),
  new Tuto4({key: 'Tuto4'}),
  new HUDScene({key: 'hud'}), 
  new HUDStat({key: 'stat'}), 
  new HUDBuildingListEcologie({key: 'ecologie'}), 
  new HUDBuildingListMoral({key: 'moral'}),  
  new HUDBuildingListEconomie({key: 'economie'}), 
  new Info({key: 'info'}), 
  new buildingMenu({key: 'menu'}), 
  new showUpgrade({key:'showUpgrade'}), 
  new unableToUpgrade({key:'unableToUpgrade'}), 
  new techno({key: 'techno'}),
  new infoTechno({key: 'infoTechno'}),
  new Bought({key:'Bought'}),
  new End({key: 'end'}),
  new conditionsNonRemplies({key: 'CNR'}),
  new Defeat({key: 'Perdu'})]
}


let game = new Phaser.Game(gameConfig);
