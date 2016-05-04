var module = (function() {
		
		var init = function() {

			var loadXml = function(name) {
				try {
					xmlDoc = new ActiveXObject("Microsoft XMLDOM");
				}
				catch(e){
					try{
						xmlDoc = document.implementation.createDocument("", "", null);
					}
					catch (e){
						alert(e.message);
					}
				}

				xmlDoc.async = false;
				xmlDoc.load(name);
				return xmlDoc
			}

			var xmlDocument = loadXml("list.xml");

			var rootElement = xmlDocument.getElementsByTagName('gifts').item(0);

			var element = xmlDocument.createElement("door");
			rootElement.appendChild(element);

		}

	return {
		init: init
	}
})();
module.init();