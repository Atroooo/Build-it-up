class preloadmenu extends Phaser.Scene{
    constructor(){
      super("preloadmenu");
    }
    preload(){
      // load all assets tile sprites
      this.load.image("skybg", "./images/skybg.jpg");
      this.load.image("city", "./images/city.png");
      this.load.image("info", "./images/info.png");
      this.load.image("play", "./images/play.png");


      // load audio and sound effect
      this.load.audio("bgm", "./images/bgm.mp3");
      this.load.audio("dollar", "./images/dollar.mp3");
      this.load.audio("clown", "./images/clown.mp3");
      this.load.audio("coin", "./images/coin.mp3");
      this.load.audio("button", "./images/button.mp3");
      this.load.audio("sonictheme", "./images/sonictheme.mp3");

      //load tutorial assets
      this.load.image("flecheL", "./images/flecheL.png");
      this.load.image("flecheR", "./images/flecheR.png");

      this.load.image("tutorielStart", "./images/tutorielStart.png");
      this.load.image("tutorielStats", "./images/tutorielStats.png");
      this.load.image("tutorielIncome", "./images/tutorielIncome.png");
      this.load.image("tutorielShop", "./images/tutorielShop.png");
      this.load.image("tutorielShopping", "./images/tutorielShopping.png");
      this.load.image("tutorielBat", "./images/tutorielBatiment.png");
      this.load.image("tutorielJour", "./images/tutorielJour.png");
      this.load.image("tutorielMairie", "./images/tutorielMairie.png");
      this.load.image("tutorielTechno", "./images/tutorielTechno.png");
      this.load.image('arrow', "../images/HUD/arrow.png");
      this.load.image('boom', "../images/HUD/boom.png");
      
      // load spritesheet
      this.load.spritesheet("sonic", "./images/sonic.png",{
        frameWidth: 48,
        frameHeight: 44
      });

      //load game assets

      this.load.image("terre", "../images/terre.png");
      this.load.image('mairie1','../images/mairie/mairie1.png');
      this.load.image('mairie2','../images/mairie/mairie2.png');
      this.load.image('mairie3','../images/mairie/mairie3.png');
      this.load.image('maison1','../images/maison/maison1.png');
      this.load.image('maison2','../images/maison/maison2.png');
      this.load.image('maison3','../images/maison/maison3.png');
      this.load.image('caserne1','../images/bienetre/caserne/caserne1.png');
      this.load.image('caserne2','../images/bienetre/caserne/caserne2.png');
      this.load.image('caserne3','../images/bienetre/caserne/caserne3.png');
      this.load.image('commissariat1','../images/bienetre/commissariat/commissariat1.png');
      this.load.image('commissariat2','../images/bienetre/commissariat/commissariat2.png');
      this.load.image('commissariat3','../images/bienetre/commissariat/commissariat3.png');
      this.load.image('poste1','../images/bienetre/poste/poste1.png');
      this.load.image('poste2','../images/bienetre/poste/poste2.png');
      this.load.image('poste3','../images/bienetre/poste/poste3.png');
      this.load.image('hopital1','../images/bienetre/hopital/hopital1.png');
      this.load.image('hopital2','../images/bienetre/hopital/hopital2.png');
      this.load.image('hopital3','../images/bienetre/hopital/hopital3.png');
      this.load.image('centrale1','../images/bienetre/centrale/centrale1.png');
      this.load.image('centrale2','../images/bienetre/centrale/centrale2.png');
      this.load.image('centrale3','../images/bienetre/centrale/centrale3.png');
      this.load.image('parc1','../images/ecologie/parc/parc1.png');
      this.load.image('parc2','../images/ecologie/parc/parc2.png');
      this.load.image('parc3','../images/ecologie/parc/parc3.png');
      this.load.image('centrale_hydraulique1','../images/ecologie/centrale_hydraulique/centrale_hydraulique1.png');
      this.load.image('centrale_hydraulique2','../images/ecologie/centrale_hydraulique/centrale_hydraulique2.png');
      this.load.image('centrale_hydraulique3','../images/ecologie/centrale_hydraulique/centrale_hydraulique3.png');
      this.load.image('magasin1','../images/economie/magasin/magasin1.png');
      this.load.image('magasin2','../images/economie/magasin/magasin2.png');
      this.load.image('magasin3','../images/economie/magasin/magasin3.png');
      this.load.image('usine1','../images/economie/usine/usine1.png');
      this.load.image('usine2','../images/economie/usine/usine2.png');
      this.load.image('usine3','../images/economie/usine/usine3.png');
      this.load.image('usine_recyclage1','../images/ecologie/usine_recyclage/usine_recyclage1.png');
      this.load.image('usine_recyclage2','../images/ecologie/usine_recyclage/usine_recyclage2.png');
      this.load.image('usine_recyclage3','../images/ecologie/usine_recyclage/usine_recyclage3.png');
      this.load.image('panneau_solaire','../images/ecologie/panneau_solaire/panneau_solaire.png');
      this.load.image('ecole1','../images/bienetre/ecole/ecole1.png');
      this.load.image('ecole2','../images/bienetre/ecole/ecole2.png');
      this.load.image('ecole3','../images/bienetre/ecole/ecole3.png');
      this.load.image('banque1','../images/economie/banque/banque1.png');
      this.load.image('banque2','../images/economie/banque/banque2.png');
      this.load.image('banque3','../images/economie/banque/banque3.png');

      //load HUD
      this.load.image('Bâtiments', "../images/HUD/batiment.png")
      this.load.image('ecologie', "../images/HUD/ecologie.png");
      this.load.image('bienetre', "../images/HUD/bienetre.png");
      this.load.image('economie', "../images/HUD/economie.png");
      this.load.image('income', "../images/HUD/income.png");
      this.load.image('bank', "../images/HUD/bank.png");
      this.load.image('pop', "../images/HUD/pop.png");
      this.load.image('close', "../images/HUD/close.png");
      this.load.image('iconeInfo', "../images/HUD/iconeInfo.png");
      this.load.image('star', "../images/HUD/star.png");
      this.load.image('move', "../images/HUD/move.png");
      this.load.image('croix', "../images/HUD/redcross.png");
      this.load.image('confirm', "../images/HUD/confirm.png");
      this.load.image('cancel', "../images/HUD/cancel.png");
      this.load.image('X1', "../images/HUD/x1.png");
      this.load.image('X2', "../images/HUD/x2.png");
      this.load.image('X3', "../images/HUD/x3.png");
      this.load.image('Pause', "../images/HUD/pause.png");
      this.load.image('check', "../images/HUD/check.png");
      this.load.image('return', "../images/HUD/returnMenu.png");

      //load win assets
      this.load.image('lose', "../images/HUD/lose.png");
      this.load.image('SS', "../images/HUD/SS.png");
      this.load.image('S', "../images/HUD/S.png");
      this.load.image('A', "../images/HUD/A.png");
      this.load.image('B', "../images/HUD/B.png");
      this.load.image('C', "../images/HUD/C.png");
      this.load.image('D', "../images/HUD/D.png");



      //load lose assets
      this.load.image('brokenheart', "../images/HUD/brokenheart.png");
      this.load.image('poor', "../images/HUD/poor.png");
      this.load.image('flower', "../images/HUD/flower.png");
    

      //load techno
      this.load.image('techno', "../images/HUD/technoIcone.png");
      this.load.image('feuMalvoyant', "../images/techno/Niveau 1/feuMalvoyant.png");
      this.load.image('spotwifi', "../images/techno/Niveau 1/spotwifi.png");
      this.load.image('feuSmart', "../images/techno/Niveau 1/feuSmart.png");
      this.load.image('peageVehiVert', "../images/techno/Niveau 1/peageVehiVert.png");
      this.load.image('e_Admin', "../images/techno/Niveau 1/e-Admin.png");
      this.load.image('dechetIntell', "../images/techno/Niveau 1/dechetIntell.png");
      this.load.image('passageCamions', "../images/techno/Niveau 1/passageCamions.png");
      this.load.image('capteurPoub', "../images/techno/Niveau 1/capteurPoub.png");
      this.load.image('LED', "../images/techno/Niveau 1/LED.png");
      this.load.image('voitureElec', "../images/techno/Niveau 2/voitureElec.png");
      this.load.image('routeElec', "../images/techno/Niveau 2/routeElec.png");
      this.load.image('parkingSmart', "../images/techno/Niveau 2/parkingSmart.png");
      this.load.image('bornes', "../images/techno/Niveau 2/bornes.png");
      this.load.image('compacPoub', "../images/techno/Niveau 2/compacPoub.png");
      this.load.image('IA_Trie', "../images/techno/Niveau 2/IA_Trie.png");
      this.load.image('capteurMouv', "../images/techno/Niveau 2/capteurMouv.png");
      this.load.image('voitureAuto', "../images/techno/Niveau 3/voitureAuto.png");
      this.load.image('IAPolice', "../images/techno/Niveau 3/IAPolice.png");
      this.load.image('tuyauDech', "../images/techno/Niveau 3/tuyauDech.png");
      this.load.image('IAClean', "../images/techno/Niveau 3/IAClean.png");
      this.load.image('capteurRes', "../images/techno/Niveau 3/capteurRes.png");
      this.load.image('intelOpe', "../images/techno/Niveau 3/intelOpe.png");

    }
    
    create(){
      this.scene.start("playmenu");
    }
}