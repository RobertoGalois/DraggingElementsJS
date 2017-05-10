//on fout tout dans une IIFE pour etre pénard niveau portée
(function() {

	/* var objet où on met les infos de notre element draggable, en l'occurence
	*  - une reference vers l'element en question: draggedElementInfos.target
	*  - sa position X relative au conteneur     : draggedElementInfos.posX
	*  - sa position Y relative au conteneur     : draggedElementInfos.posY
	*  ==> bien entendu, si draggedElementInfos est set à {}, chacune de ces sous-variables equivaut à null;
	*/
	var draggedElementInfos = {};
	
	//on initialise le bordel, cad qu'on donne la propriété draggable à tous les elements draggables
	applyDraggable();


	//initialisation du bordel appliquant la propriété draggable sur tous les elements draggables
	function applyDraggable()
	{
		//on recupere tous les div draggables
		var elements = window.document.querySelectorAll('div.draggableBox');
		var nombreElements = elements.length;

		//on assigne a chaque div draggable les event mouseUp et mouseDown
		for(var i=0; i<nombreElements; i++)
		{
			elements[i].addEventListener('mousedown', evMouseDown);
			elements[i].addEventListener('mouseup', evMouseUp);
		}
		//si on bouge la souris dans la page, on check si c'est pour dragger et on fait ce qu'il faut en conséquence
		window.document.addEventListener('mousemove', evMouseMove);
	}
	
	/*****************************
	 * FONCTIONS EVENT
	 *****************************/
	
	//si on clique down sur un element draggable
	function evMouseDown(e)
	{
		//on initialise draggedElementInfos.eventTarget avec la reference à notre element dragged
		draggedElementInfos.eventTarget = e.currentTarget;
		//on stocke la position x (relative à l'element parent) DE DEPART de l'element dragged 
		draggedElementInfos.posX = e.clientX - draggedElementInfos.eventTarget.offsetLeft;
		//on stocke la position y (relative à l'element parent) DE DEPART de l'element dragged 
		draggedElementInfos.posY = e.clientY - draggedElementInfos.eventTarget.offsetTop;
	}

	//si on relarche le bouton de souris sur un element draggable 
	function evMouseUp(e)
	{
		//on reinitialise notre objet de stockage, ce qui fait que les 3 attributs ~ null
		draggedElementInfos = {};
	}

	//si on bouge la souris sur le document: 
	function evMouseMove(e)
	{
		//on récupère une référence a l'element dragged, si cette reference != null on drag, sinon on fait rien.
		var target = draggedElementInfos.eventTarget;

		if(target)
		{
			target.style.top = e.clientY - draggedElementInfos.posY + 'px';
			target.style.left = e.clientX - draggedElementInfos.posX + 'px';	
		}
	}
})();
