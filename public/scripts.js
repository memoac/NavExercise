//Loading Json File
function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'nav.json', true); 
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null); 
}//END Loading Json File

//Init Menu and Json File
function init() {

	loadJSON(function(response) {

		var actual_JSON = JSON.parse(response);
		console.log(actual_JSON.items);

		var list = document.querySelectorAll("#menu ul");	
		var classDrop ='';
		for (i = 0; i < actual_JSON.items.length; i++) { 	
		if(actual_JSON.items[i].items != 0){
			classDrop ='hasDrop';
		}
		else{
			classDrop ='';
		}			
			list[0].innerHTML += '<li class="'+classDrop+'"><a href="'+actual_JSON.items[i].url+'" class="link">'+actual_JSON.items[i].label+'</a></li>';	
		}

		var subList = document.querySelectorAll("#menu ul li");

		cont=0;
		for (j = 0; j < actual_JSON.items.length; j++) { 			
			if(actual_JSON.items[j].items != 0){
				subList[j].innerHTML += '<ul class="submenu"></ul>';
				var subList2 = document.querySelectorAll("#menu ul li ul.submenu");
				for (k =0; k < actual_JSON.items[j].items.length; k++) { 
					subList2[cont].innerHTML += '<li><a href="'+actual_JSON.items[j].items[k].url+ '" class="link">'+ actual_JSON.items[j].items[k].label +'</a></li>';
				};
				cont++;
			}
		}

		//Variables
		var navAnchor = document.querySelectorAll("#menu ul li .link");
		var menuOverlay =document.querySelectorAll(".overlay-menu");

		var hamburguer = document.querySelectorAll(".hamburguer");
		var figureBar = document.querySelectorAll("figure");
		var navMobile = document.querySelectorAll(".mainMenu");
		var dropDown = document.querySelectorAll(".hasDrop");
		var dropDownOpen = document.querySelectorAll(".hasDrop.open");
		var allList = document.querySelectorAll(".link");


		var main = document.querySelectorAll("main");






		var hasOpen = false;
		for(k=0; k<dropDown.length; k++){
			dropDown[k].onclick = function(event){
				event.preventDefault();
				if(!hasOpen){
					this.classList.add("open");
					hasOpen = false;
				}
				else{
					this.classList.remove("open");
					hasOpen = true;
				}			
			}
		}


	    var open = false;
	    hamburguer[0].onclick = function (event) {
	    	event.preventDefault();
	    	menuOverlay[0].classList.remove("open");
	    	if(open){
	    		figureBar[0].classList.remove("open");
		    	hamburguer[0].classList.remove("open");
		    	navMobile[0].classList.remove("open");
		    	main[0].classList.remove("open");
		    	open = false;

		    }
		    else{
		    	figureBar[0].classList.add("open");
		    	hamburguer[0].classList.add("open");
		    	navMobile[0].classList.add("open");
		    	main[0].classList.add("open");
		    	open = true;
		    }      
	    }

		//Allow submenu and overlay to close
		menuOverlay[0].onclick = function () { 
			menuOverlay[0].classList.remove("open");
			for (i = 0; i < navAnchor.length; i++) { 
				if(navAnchor[i].nextElementSibling != null){
					navAnchor[i].nextElementSibling.style.display = "none";
					navAnchor[i].classList.remove("selected");
					for(k=0; k<dropDown.length; k++){
						dropDown[k].classList.remove("open");
					}

				}	
			}
		}

		//Watch a click event for the menu items so that they can display a submenu
		for (i = 0; i < navAnchor.length; i++) { 			
			navAnchor[i].onclick = function (event) {

				//If some drop is open this bucle doesn't allow two or more will be open 
				for (j = 0; j < navAnchor.length; j++) { 
					if(navAnchor[j].nextElementSibling != null){
						navAnchor[j].nextElementSibling.style.display = "none";
						navAnchor[j].classList.remove("selected");
						for(k=0; k<dropDown.length; k++){
							dropDown[k].classList.remove("open");
						}
					}	

				}
				if(this.nextElementSibling != null){
					event.preventDefault();
					this.classList.add("selected");
					this.nextElementSibling.style.display = "block";
					menuOverlay[0].classList.add("open");

				}
				else{						
					menuOverlay[0].classList.remove("open");
					for(k=0; k<dropDown.length; k++){
						dropDown[k].classList.remove("open");
					}	

				}
			};
		}

	});

}//END Init Menu and Json File

