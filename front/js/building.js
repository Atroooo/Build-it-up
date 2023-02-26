class gameStat{
	constructor(){
		this.Income = 0;
		this.Bank = 100000000;
		this.Pop = 0;
		this.statEcologie = 0;
		this.statEconomie = 0;
		this.statBienEtre = 0;
		this.listeBatiment = [];
		this.listeTechno = [];
		this.description = "";
	}

	saveBatiment(name){
		this.listeBatiment.push(name);
	}

	saveTechno(name){
		this.listeTechno.push(name);
	}

	removeBuilding(name){
		let pos = this.listeBatiment.indexOf(name);
		for(let i = pos; i < this.listeBatiment.length; i++){
				this.listeBatiment[i] = this.listeBatiment[i+1];
		}
	}

	upgradeBuilding(nouveau, old){
		this.saveBatiment(nouveau);
		this.removeBuilding(old);
	}

	updateIncome(){
		if(this.listeBatiment == null) {return 0;}
		else{
			this.Income = 0;
			for(let i = 0; i < this.listeBatiment.length; i++){
				for(let j = 0; j < buildingListMk1.length; j++){
					if(this.listeBatiment[i] == buildingListMk1[j].name){
						this.Income += buildingListMk1[j].income;
					}
				}
				for(let k = 0; k < buildingListMk2.length; k++){
					if(this.listeBatiment[i] == buildingListMk2[k].name){
						this.Income += buildingListMk2[k].income;
					}
				}
				for(let l = 0; l < buildingListMk3.length; l++){
					if(this.listeBatiment[i] == buildingListMk3[l].name){
						this.Income += buildingListMk3[l].income;
					}
				}
			}
		}
	}

	updateEcologie(){
		if(this.listeBatiment == null) {return 0;}
		else{
			this.statEcologie = 0;
			//Bâtiment
			for(let i = 0; i < this.listeBatiment.length; i++){
				for(let j = 0; j < buildingListMk1.length; j++){
					if(this.listeBatiment[i] == buildingListMk1[j].name){
						this.statEcologie += buildingListMk1[j].ecologie;
					}
				}
				for(let k = 0; k < buildingListMk2.length; k++){
					if(this.listeBatiment[i] == buildingListMk2[k].name){
						this.statEcologie += buildingListMk2[k].ecologie;
					}
				}
				for(let l = 0; l < buildingListMk3.length; l++){
					if(this.listeBatiment[i] == buildingListMk3[l].name){
						this.statEcologie += buildingListMk3[l].ecologie;
					}
				}
			}
			//Technologie
			for(let w = 0; w < this.listeTechno.length; w++){
				for(let x = 0; x < technologieT1.length; x++){
					if(this.listeTechno[w] == technologieT1[x].name){
						this.statEcologie += technologieT1[x].ecologie;
					}
				}
				for(let y = 0; y < technologieT2.length; y++){
					if(this.listeTechno[w] == technologieT2[y].name){
						this.statEcologie += technologieT2[y].ecologie;
					}
				}
				for(let z = 0; z < technologieT3.length; z++){
					if(this.listeTechno[w] == technologieT3[z].name){
						this.statEcologie += technologieT3[z].ecologie;
					}
				}
			}
		}
	}

	updateEconomie(){
		if(this.listeBatiment == null) {return 0;}
		else{
			this.statEconomie = 0;
			//Batiment
			for(let i = 0; i < this.listeBatiment.length; i++){
				for(let j = 0; j < buildingListMk1.length; j++){
					if(this.listeBatiment[i] == buildingListMk1[j].name){
						this.statEconomie += buildingListMk1[j].economie;
					}
				}
				for(let k = 0; k < buildingListMk2.length; k++){
					if(this.listeBatiment[i] == buildingListMk2[k].name){
						this.statEconomie += buildingListMk2[k].economie;
					}
				}
				for(let l = 0; l < buildingListMk3.length; l++){
					if(this.listeBatiment[i] == buildingListMk3[l].name){
						this.statEconomie += buildingListMk3[l].economie;
					}
				}
			}
			//Technologie
			for(let w = 0; w < this.listeTechno.length; w++){
				for(let x = 0; x < technologieT1.length; x++){
					if(this.listeTechno[w] == technologieT1[x].name){
						this.statEconomie += technologieT1[x].economie;
					}
				}
			for(let y = 0; y < technologieT2.length; y++){
					if(this.listeTechno[w] == technologieT2[y].name){
						this.statEconomie += technologieT2[y].economie;
					}
				}
			for(let z = 0; z < technologieT3.length; z++){
					if(this.listeTechno[w] == technologieT3[z].name){
						this.statEconomie += technologieT3[z].economie;
					}
				}
			}
		}
	}

	updateBienEtre(){
		if(this.listeBatiment == null) {return 0;}
		else{
			this.statBienEtre = 0;
			//Batiment
			for(let i = 0; i < this.listeBatiment.length; i++){
				for(let j = 0; j < buildingListMk1.length; j++){
					if(this.listeBatiment[i] == buildingListMk1[j].name){
						this.statBienEtre += buildingListMk1[j].bienEtre;
					}
				}
				for(let k = 0; k < buildingListMk2.length; k++){
					if(this.listeBatiment[i] == buildingListMk2[k].name){
						this.statBienEtre += buildingListMk2[k].bienEtre;
					}
				}
				for(let l = 0; l < buildingListMk3.length; l++){
					if(this.listeBatiment[i] == buildingListMk3[l].name){
						this.statBienEtre += buildingListMk3[l].bienEtre;
					}
				}
			}
			//Technologie
			for(let w = 0; w < this.listeTechno.length; w++){
				for(let x = 0; x < technologieT1.length; x++){
					if(this.listeTechno[w] == technologieT1[x].name){
						this.statBienEtre += technologieT1[x].bienEtre;
					}
				}
				for(let y = 0; y < technologieT2.length; y++){
					if(this.listeTechno[w] == technologieT2[y].name){
						this.statBienEtre += technologieT2[y].bienEtre;
					}
				}
				for(let z = 0; z < technologieT3.length; z++){
					if(this.listeTechno[w] == technologieT3[z].name){
						this.statBienEtre += technologieT3[z].bienEtre;
					}
				}
			}
		}
	}

	updatePop(){
		if(this.listeBatiment == null) {return 0;}
		else{
			this.Pop = 0;
			for(let i = 0; i < this.listeBatiment.length; i++){
				for(let j = 0; j < buildingListMk1.length; j++){
					if(this.listeBatiment[i] == buildingListMk1[j].name){
						this.Pop += buildingListMk1[j].pop;
					}
				}
				for(let k = 0; k < buildingListMk2.length; k++){
					if(this.listeBatiment[i] == buildingListMk2[k].name){
						this.Pop += buildingListMk2[k].pop;
					}
				}
				for(let l = 0; l < buildingListMk3.length; l++){
					if(this.listeBatiment[i] == buildingListMk3[l].name){
						this.Pop += buildingListMk3[l].pop;
					}
				}
			}
		}
	}

	updateBank(){ this.Bank += this.Income; }

	getEconomie(){ return this.statEconomie; }

	getEcologie(){ return this.statEcologie; }

	getBienEtre(){ return this.statBienEtre; }

	getBank(){ return this.Bank; }

	getIncome(){ return this.Income; }

	getPop(){ return this.Pop; }

	getInfoBuilding(name){
		let info = [];
		for(let j = 0; j < buildingListMk1.length; j++){
			if(name == buildingListMk1[j].name){
				info[0] = buildingListMk1[j].name;
				info[1] = buildingListMk1[j].price;
				info[2] = buildingListMk1[j].income;
				info[3] = buildingListMk1[j].economie;
				info[4] = buildingListMk1[j].ecologie;
				info[5] = buildingListMk1[j].bienEtre;
				info[6] = buildingListMk1[j].pop;
				info[7] = buildingListMk1[j].description
				info[8] = buildingListMk1[j].nom;
			}
		}
		
		for(let k = 0; k < buildingListMk2.length; k++){
			if(name == buildingListMk2[k].name){
				info[0] = buildingListMk2[k].name;
				info[1] = buildingListMk2[k].price;
				info[2] = buildingListMk2[k].income;
				info[3] = buildingListMk2[k].economie;
				info[4] = buildingListMk2[k].ecologie;
				info[5] = buildingListMk2[k].bienEtre;
				info[6] = buildingListMk2[k].pop;
				info[7] = buildingListMk2[k].description;
				info[8] = buildingListMk2[k].nom;
			}
		}
		for(let l = 0; l < buildingListMk3.length; l++){
			if(name == buildingListMk3[l].name){
				info[0] = buildingListMk3[l].name;
				info[1] = buildingListMk3[l].price;
				info[2] = buildingListMk3[l].income;
				info[3] = buildingListMk3[l].economie;
				info[4] = buildingListMk3[l].ecologie;
				info[5] = buildingListMk3[l].bienEtre;
				info[6] = buildingListMk3[l].pop;
				info[7] = buildingListMk3[l].description;
				info[8] = buildingListMk3[l].nom;		
			}
		}
		return info;
	}

	getInfoTechno(name){
		let infoT = [];
		for(let j = 0; j < technologieT1.length; j++){
			if(name == technologieT1[j].name){
				infoT[0] = technologieT1[j].name;
				infoT[1] = technologieT1[j].nom;
				infoT[2] = technologieT1[j].price;
				infoT[3] = technologieT1[j].economie;
				infoT[4] = technologieT1[j].ecologie;
				infoT[5] = technologieT1[j].bienEtre;
				infoT[6] = technologieT1[j].description;
			}
		}
		for(let k = 0; k < technologieT2.length; k++){
			if(name == technologieT2[k].name){
				infoT[0] = technologieT2[k].name;
				infoT[1] = technologieT2[k].nom;
				infoT[2] = technologieT2[k].price;
				infoT[3] = technologieT2[k].economie;
				infoT[4] = technologieT2[k].ecologie;
				infoT[5] = technologieT2[k].bienEtre;
				infoT[6] = technologieT2[k].description;
			}
		}
		for(let l = 0; l < technologieT3.length; l++){
			if(name == technologieT3[l].name){
				infoT[0] = technologieT3[l].name;
				infoT[1] = technologieT3[l].nom;
				infoT[2] = technologieT3[l].price;
				infoT[3] = technologieT3[l].economie;
				infoT[4] = technologieT3[l].ecologie;
				infoT[5] = technologieT3[l].bienEtre;
				infoT[6] = technologieT3[l].description;	
			}
		}
		return infoT;
	}

	setBank(price){
		this.Bank -= price;
	}

	getId(name){
		for(let i = 0; i < buildingListMk1.length; i++){
			if(name == buildingListMk1[i].name){
				return buildingListMk1[i].id;
			}
		}
		for(let j = 0; j < buildingListMk2.length; j++){
			if(name == buildingListMk2[j].name){
				return buildingListMk2[j].id;
			}
		}
		for(let k = 0; k < buildingListMk3.length; k++){
			if(name == buildingListMk3[k].name){
				return buildingListMk3[k].id;
			}
		}
	}

	getIdTechno(name){
		for(let i = 0; i < technologieT1.length; i++){
			if(name == technologieT1[i].name){
				return technologieT1[i].id;
			}
		}
		for(let j = 0; j < technologieT2.length; j++){
			if(name == technologieT2[j].name){
				return technologieT2[j].id;
			}
		}
		for(let k = 0; k < technologieT3.length; k++){
			if(name == technologieT3[k].name){
				return technologieT3[k].id;
			}
		}
	}

	isTechnoBought(name){
		if(this.listeTechno == null) { return temp; }
		for(let i = 0; i < this.listeTechno.length; i++){
			if(name == this.listeTechno[i]){
				return true;
			}
			else{ 
				return false;
			}
		}
	}

	getTechnoPrice(name){
		for(let x = 0; x < technologieT1.length; x++){
			if(name == technologieT1[x].name){
				return technologieT1[x].price;
			}
		}
		for(let y = 0; y < technologieT2.length; y++){
			if(name == technologieT2[y].name){
				return technologieT2[y].price;
			}
		}
		for(let z = 0; z < technologieT3.length; z++){
			if(name == technologieT3[z].name){
				return technologieT3[z].price;
			}
		}
	}

	getBuildingPrice(name){
		for(let x = 0; x < buildingListMk1.length; x++){
			if(name == buildingListMk1[x].name){
				return buildingListMk1[x].price;
			}
		}
		for(let y = 0; y < buildingListMk2.length; y++){
			if(name == buildingListMk2[y].name){
				return buildingListMk2[y].price;
			}
		}
		for(let z = 0; z < buildingListMk3.length; z++){
			if(name == buildingListMk3[z].name){
				return buildingListMk3[z].price;
			}
		}
	}

	getConditions(name){
		for(let x = 0; x < buildingListMk1.length; x++){
			if(name == buildingListMk1[x].name){
				return buildingListMk1[x].popMin;
			}
		}
		for(let y = 0; y < buildingListMk2.length; y++){
			if(name == buildingListMk2[y].name){
				return buildingListMk2[y].popMin;
			}
		}
		for(let z = 0; z < buildingListMk3.length; z++){
			if(name == buildingListMk3[z].name){
				return buildingListMk3[z].popMin;
			}
		}
	}

	getLvlMairie(){
		for(let i = 0; i < this.listeBatiment.length; i++){
			if('mairie1' == this.listeBatiment[i]) { 
				let name = 'mairie1';
				return name.substring(name.length - 1); 
			}
			if('mairie2' == this.listeBatiment[i]) { 
				let name = 'mairie2';
				return name.substring(name.length - 1); 
			}
			if('mairie3' == this.listeBatiment[i]) { 
				let name = 'mairie3';
				return name.substring(name.length - 1); 
			}
		} 
	}
}

