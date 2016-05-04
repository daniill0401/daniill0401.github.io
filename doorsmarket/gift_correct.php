<?php 


	$file_handle = fopen("list_gifts.xml", "r");
		while (!feof($file_handle)) {
   				$line = $line.fgets($file_handle);
			}
		fclose($file_handle);

		$dom = new DOMDocument;
		$dom->loadXML($line);
		$gifts = $dom->getElementsByTagName('gift');
		$price = $dom->getElementsByTagName('price');

		$letters = array('A', 'D', 'B', 'K', 'F', 'E', 'O', 'M', 'W', 'D');

		$model = $dom->createElement('model');
		$text = $letters[rand(0,10)].$letters[rand(0,10)]."-".rand(15,99);
		$model->appendChild(new DOMText("$text"));

		$enter = new DOMText("\n");


		foreach($gifts as $gifts_item){

			$model = $dom->createElement('model');
			$text = $letters[rand(0,10)].$letters[rand(0,10)]."-".rand(15,99);
			$model->appendChild(new DOMText("$text"));

			$gifts_item->insertBefore($model, $gifts_item->getElementsByTagName('price')->item(0));
			$gifts_item->insertBefore($enter, $gifts_item->getElementsByTagName('price')->item(0));

		}

			echo $dom->saveXML();

			$filehandle=fopen("list_gifts_c.xml", "w");
			fwrite($filehandle, $dom->saveXML());
			fclose($filehandle);
 ?>