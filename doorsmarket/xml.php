<?php 

	$xmlfile = fopen("list.xml", "w");

	$doc = new DOMDocument("1.0", "utf-8");

	$node = $doc->createElement("gifts");
	$doc->appendChild($node);
	

	echo $doc->saveXML();
	fwrite($xmlfile, $doc->saveXML());
	fclose($xmlfile);

 ?>