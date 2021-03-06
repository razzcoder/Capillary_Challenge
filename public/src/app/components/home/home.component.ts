import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { GetGameDataService } from '../../service/get-game-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers:[GetGameDataService]
})
export class HomeComponent implements OnInit {


  gamesData:gameData[];
  filteredItems:gameData[];

  Asc_OR_Dsc:boolean;

  constructor(

	public flashMessage:FlashMessagesService,
  	private getGameDataSer:GetGameDataService
  	
  	) { 

  	this.getGameDataSer.getGameData().subscribe(gameData => {

			// this.posts=posts;
			/*
					{
					"_id":"58cd2224c33b17f60ed96fe7",
					"updatedAt":"2017-03-18T12:03:48.425Z",
					"createdAt":"2017-03-18T12:03:48.425Z",
					"title":"LittleBigPlanet PS Vita",
					"platform":"PlayStation Vita",
					"score":"9",
					"genre":"Platformer",
					"editors_choice":"Y",
					"__v":0
					}


			*/

			this.gamesData=gameData;
			this.assignCopy();
			

			// console.log(JSON.stringify(gameData));
	});

  }

  assignCopy(){
  	this.filteredItems = Object.assign([], this.gamesData);
  }

  // getAutoCompleteArray(){

  // 	this.sourceTextAutoComplete=this.filteredItems.map(data=>{

  // 		return data.title;

  // 	});
  // }


  filterGameData(searchedText:string){

  	if(!searchedText) 
  		this.assignCopy(); //when nothing has typed

  	
   this.filteredItems = Object.assign([], this.gamesData).filter(

      item => (item.title.toLowerCase().indexOf(searchedText.toLowerCase()) > -1)
   )

   console.log(JSON.stringify(this.filteredItems));


   
   

  }

  sortGameData(){

  	//Sort the Game Data based on the score here ..
  	//If it is ascending order sort it in descending else vice versa logic wil be applied here
  	if(this.Asc_OR_Dsc==true){
		  	this.filteredItems.sort((score1,score2)=>{


		  			if (score1.score < score2.score ){
			    		return -1;
			   		 }
			   		 else if( score1.score > score2.score ){
			        	return 1;
			    	}
			    	else{
			    		return 0;	
			    }
		  	});

		  this.Asc_OR_Dsc=false;
  }
  else{

  		this.filteredItems.sort((score1,score2)=>{


		  			if (score1.score > score2.score ){
			    		return -1;
			   		 }
			   		 else if( score1.score < score2.score ){
			        	return 1;
			    	}
			    	else{
			    		return 0;	
			    }
		  	});

  		this.Asc_OR_Dsc=true;



  }



  }

  ngOnInit() {


  }

  

}
interface gameData{

	title:string;
	platform:string;
	score:string;
	genre:string;
	editors_choice:string;

}
