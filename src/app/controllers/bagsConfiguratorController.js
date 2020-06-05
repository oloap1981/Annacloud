angular.module('applicationModule').controller('unadunaConfiguratorController2', function ($scope, listeService, loginService, logService, $uibModal, $uibModalStack, $log, jwtHelper, $translatePartialLoader, LOG_TYPES, $routeParams) {

	//$translatePartialLoader.addPart('configurator');
	$scope.configurazioneId = $routeParams.id;

	$scope.$log = $log;

	var configController = this;

	$scope.spinAnim = true;
	$scope.spinIcon = true;

	$scope.spinnerVisibleTest = false;

	$scope.modelli = [];
	$scope.entita = [];
	$scope.stack = [];

	$scope.tipiAccessori = new Map();
	$scope.entitaTipoAccessorioSelezionato = [];
	$scope.tipiAccessoriModelloSelezionato = [];
	$scope.modelloSelezionato = "";

	$scope.categorieTracolle = ["TRACOLLA_BASE", "TRACOLLA_CLASSICA-DOT", "TRACOLLA_CLASSICA-STELLE", "TRACOLLA_CATENELLA", "TRACOLLA_INCROCIATA", "TRACOLLA_CENTRALE"];
	$scope.modelliTracolleOro = new Map();
	$scope.modelliTracolleArgento = new Map();
	$scope.variantiTracolle = [];

	$scope.categorieCiondoli = ["CIONDOLO_CUORE", "CIONDOLO_COLORATO", "CIONDOLO_FIOCCO"];
	$scope.modelliCiondoliOro = new Map();
	$scope.modelliCiondoliArgento = new Map();
	$scope.variantiCiondoli = [];

	$scope.dataUrl = "";

	$scope.tipoEntitaSelezionata = "colore";//di default apro il pannello colori
	$scope.nomeEntitaSelezionata = "black";//di default apro il pannello colori

	$scope.mappaEntitaSelezionate = {};

	$scope.embossSelezionato = false;
	$scope.nomeStileSelezionato = "";
	$scope.mapEmboss = new Map();

	$scope.coloreVincolante = "black";//scelgo il nero come colore vincolante di default
	$scope.scegliColore = true;
	$scope.scegliEmboss = false;

	$scope.metalloVincolante = "argento";
	$scope.mapMetalloTracolle = new Map();
	$scope.mapMetalloCiondoli = new Map();
	$scope.mapMetalloBorchie = new Map();
	$scope.tipoTracollaSelezionata = "";
	$scope.tipoCiondoloSelezionato = "";

	$scope.borchieSelezionate = false;
	$scope.nomeBorchiaSelezionata = "";
	$scope.tracollaSelezionata = false;
	$scope.nomeTracollaSelezionata = "";
	$scope.ciondoloSelezionato = false;
	$scope.nomeCiondoloSelezionato = "";
	$scope.coloreSelezionato = "black";

	$scope.metalleriaObbligatoria = [];

	$scope.removable = false;
	$scope.askForName = false;

	$scope.symbolsUrlStack = [];
	$scope.symbolArray = [];
	$scope.symbolEnabled = true;
	$scope.baseUrlSymbols = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/MODELLO/INIZIALI/";
	$scope.baseUrlThumbCategorieTracolle = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/MODELLO/TRACOLLE/THUMBNAILS/";
	$scope.baseUrlThumbCategorieCiondoli = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/MODELLO/CIONDOLI/THUMBNAILS/";
	$scope.symbolConfigurations = [["M"], ["MSX", "MDX"], ["SX", "M", "DX"]];
	$scope.inizialiPreview = "";

	$scope.currentFrame = 0;

	//parte relativa alla gestione della configurazione da passare poi agli ordini
	$scope.configurazione = {};
	$scope.user = null;
	$scope.configThumbnail = "";
	$scope.showDropdownButton = false;

	configController.modelFilter = function (item) { 
		return item.attivo; 
	};

	configController.getRepeaterClass = function (accessorio, index) {
		var toReturn = "";
		if (index == 0) {
			toReturn = " swiper-slide-previous";
		} else if (index == 1) {
			toReturn = " swiper-slide-active";
		} else if (index == 2) {
			toReturn = " swiper-slide-next";
		} else {
			toReturn = "swiper-slide";
		}

		return toReturn;
	};

	configController.visibleManager = {
		loaderVisible: false,
		spinnerVisible: true
	};

	configController.priceManager = {
		price: 0,
		fullPrice: 0
	};

	configController.taglieManager = {
		listaTaglie: [],
		tagliaSelezionata: "",
		nomeModello: ""
	};

	configController.getModelloSelezionato = function () {
		if ($scope.modelloSelezionato != "") {
			var nomeModello = $scope.modelloSelezionato.charAt(0).toUpperCase() + $scope.modelloSelezionato.slice(1);
			if(nomeModello.indexOf('_') != -1) {
				nomeModello = nomeModello.replace('_', ' ');
			}
			return nomeModello;
		} else {
			return "";
		}
	};

	configController.cleanAccessori = function () {
		for (var i = 0; i < configController.accessoriBorsa.length; i++) {
			configController.accessoriBorsa[i].attivo = false;
		}
	};

	configController.getThumbnailNameTracolle = function (entita) {
		if (entita) {
			var toReplace = configController.modelNameTranslate($scope.modelloSelezionato);
			if (toReplace != undefined) {
				var thumbnailName = $scope.baseUrlThumbCategorieTracolle.replace("MODELLO", toReplace) + "THUMBNAIL_" + entita.replace("-", "_") + ".png";
				return thumbnailName;
			} else {
				return "";
			}
		} else return "";

	};

	configController.getThumbnailNameCiondoli = function (entita) {
		if (entita) {
			var toReplace = configController.modelNameTranslate($scope.modelloSelezionato);
			if (toReplace != undefined) {
				var thumbnailName = $scope.baseUrlThumbCategorieCiondoli.replace("MODELLO", toReplace) + "THUMBNAIL_" + entita.replace("-", "_") + ".png";
				return thumbnailName;
			} else {
				return "";
			}
		} else return "";
	};

	configController.selezionaCategoriaTracolla = function (entita) {
		//qui devo gestire la metalleria
		if ($scope.metalloVincolante == "oro") {
			$scope.variantiTracolle = $scope.modelliTracolleOro.get(entita);
		} else {
			$scope.variantiTracolle = $scope.modelliTracolleArgento.get(entita);
		}
		$scope.variantiTracolle = configController.ordinaEntita($scope.variantiTracolle);
		$scope.tipoEntitaSelezionata = "varianti-tracolle";
		$scope.scegliColore = false;
		$scope.scegliMetallo = false;
		$scope.scegliEmboss = false;

		for (var i = 0; i < $scope.modelli.length; i++) {
			var modello = $scope.modelli[i];
			if (modello.nome == $scope.modelloSelezionato) {
				for (var j = 0; j < $scope.entita.length; j++) {
					var entitaSingola = $scope.entita[j];
					if (entitaSingola.vincoloMetallo == true) {
						if (entitaSingola.categoria == "tracolle") {
							$scope.mapMetalloTracolle.set(entitaSingola.nome, entitaSingola);
						}
					}
				}
			}
		}

		$scope.tipoTracollaSelezionata = entita;
	};

	configController.selezionaCategoriaCiondolo = function (entita) {
		if ($scope.metalloVincolante == "oro") {
			$scope.variantiCiondoli = $scope.modelliCiondoliOro.get(entita);
		} else {
			$scope.variantiCiondoli = $scope.modelliCiondoliArgento.get(entita);
		}
		$scope.variantiCiondoli = configController.ordinaEntita($scope.variantiCiondoli);
		$scope.tipoEntitaSelezionata = "varianti-ciondoli";

		$scope.scegliColore = false;
		$scope.scegliMetallo = false;
		$scope.scegliEmboss = false;

		for (var i = 0; i < $scope.modelli.length; i++) {
			var modello = $scope.modelli[i];
			if (modello.nome == $scope.modelloSelezionato) {
				for (var j = 0; j < $scope.entita.length; j++) {
					var entitaSingola = $scope.entita[j];
					if (entitaSingola.vincoloMetallo == true) {
						if (entitaSingola.categoria == "ciondoli") {
							$scope.mapMetalloCiondoli.set(entitaSingola.nome, entitaSingola);
						}
					}
				}
			}
		}

		$scope.tipoCiondoloSelezionato = entita;
	};

	configController.resetTracolle = function () {
		$scope.tipoTracollaSelezionata = "";
		configController.selezioneTipoAccessorio('tracolle');
	};

	configController.resetCiondoli = function () {
		$scope.tipoCiondoloSelezionato = "";
		configController.selezioneTipoAccessorio('ciondoli');
	};

	configController.selezioneTipoAccessorio = function (tipoAccessorio) {
		$scope.tipoEntitaSelezionata = tipoAccessorio;
		//preparo la mappa che ha chiave = entita.nome - valore = entita
		//fadeout del componente
		if (tipoAccessorio == "tracolle") {
			$scope.scegliColore = false;
			$scope.scegliMetallo = false;
			$scope.scegliEmboss = false;
			if ($scope.tipoTracollaSelezionata == "") {
				$scope.tipoEntitaSelezionata = "tipi-tracolle";
			} else {
				configController.selezionaCategoriaTracolla($scope.tipoTracollaSelezionata);
			}

		} else if (tipoAccessorio == "ciondoli") {
			$scope.scegliColore = false;
			$scope.scegliMetallo = false;
			$scope.scegliEmboss = false;
			if ($scope.tipoCiondoloSelezionato == "") {
				$scope.tipoEntitaSelezionata = "tipi-ciondoli";
			} else {
				configController.selezionaCategoriaCiondolo($scope.tipoCiondoloSelezionato);
			}

		} else {

			if (tipoAccessorio == "colore") {
				//qui devo gestire le limitazioni relative al colore
				$scope.scegliColore = true;
			} else {
				$scope.scegliColore = false;
			}
			if (tipoAccessorio == "metalleria") {
				//qui devo gestire le limitazioni relative al colore
				$scope.scegliMetallo = true;
			} else {
				$scope.scegliMetallo = false;
			}
			if (tipoAccessorio == "stile") {
				$scope.scegliEmboss = true;
			} else {
				$scope.scegliEmboss = false;
			}
			$scope.entitaTipoAccessorioSelezionato = [];
			for (var i = 0; i < $scope.modelli.length; i++) {
				var modello = $scope.modelli[i];
				if (modello.nome == $scope.modelloSelezionato) {
					for (var j = 0; j < $scope.entita.length; j++) {
						var entitaSingola = $scope.entita[j];
						if (entitaSingola.categoria == tipoAccessorio & entitaSingola.modello == $scope.modelloSelezionato) {
							if (entitaSingola.vincoloColore == true) {
								if (entitaSingola.categoria == "stile") {
									$scope.mapEmboss.set(entitaSingola.nomeStile + "_" + entitaSingola.colore, entitaSingola);
								}
								if (entitaSingola.colore == $scope.coloreVincolante) {
									$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
								}
							} else if (entitaSingola.vincoloMetallo == true) {
								if (entitaSingola.categoria == "tracolle") {
									$scope.mapMetalloTracolle.set(entitaSingola.metallo, entitaSingola);
								} else if (entitaSingola.categoria == "ciondoli") {
									$scope.mapMetalloCiondoli.set(entitaSingola.metallo, entitaSingola);
								} else if (entitaSingola.categoria == "borchie") {
									$scope.mapMetalloBorchie.set(entitaSingola.nomeBorchia + "_" + entitaSingola.metallo, entitaSingola);
								}
								if (entitaSingola.metallo == $scope.metalloVincolante) {
									$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
								}
							} else {
								$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
							}
						}
					}
				}
            }



			//ordinamento delle entità
			if ($scope.tipoEntitaSelezionata != 'iniziali') {
				$scope.entitaTipoAccessorioSelezionato = configController.ordinaEntita($scope.entitaTipoAccessorioSelezionato);
			} else {
				$scope.entitaTipoAccessorioSelezionato = [];
			}
        }
        
        function ritardo() {
            $(".accessori-thumb")[0].swiper.slideTo(0,0);
        }

        setTimeout(ritardo, 400);
	};

	configController.ordinaEntita = function (entitaNonOrdinate) {

		var size = entitaNonOrdinate.length;
		var tempEntita = new Array(size);

		for (var i = 0; i < size; i++) {
			if (entitaNonOrdinate[i].ordineInterfaccia == null || entitaNonOrdinate[i].ordineInterfaccia == "" || entitaNonOrdinate[i].ordineInterfaccia == 0) {
				return entitaNonOrdinate;
			}
			tempEntita[entitaNonOrdinate[i].ordineInterfaccia - 1] = entitaNonOrdinate[i];
		}

		return tempEntita;
    };
    
    /*configController.ordinaEntita = function (entitaNonOrdinate) {
        return entitaNonOrdinate.sort(function (entita1, entita2) {
            entita1.ordineInterfaccia - entita2.ordineInterfaccia;
        });
    };*/

	configController.getResolutionPlaceHolder = function () {
		var screenWidth = $("#canvasWrapper").innerWidth();
		var screenHeight = $("#canvasWrapper").innerHeight();

		var placeHolder = "";
		var minSize = 0;
		if(screenWidth == 0 && screenHeight > 0){
			minSize = screenHeight;
		} else if (screenWidth > 0 && screenHeight == 0) {
			minSize = screenWidth;
		} else {
			minSize = (screenWidth > screenHeight ? screenHeight : screenWidth);
		}
		
		if (minSize <= 560) {
			placeHolder = "560";
		} else if (minSize > 560 && minSize < 720) {
			placeHolder = "720";
		} else if (minSize >= 720) {
			placeHolder = "960";
		}

		return placeHolder;
	};

	configController.gestisciCiondoli = function () {
		$scope.modelliCiondoliOro = new Map();
		$scope.modelliCiondoliArgento = new Map();

		for (var i = 0; i < $scope.entita.length; i++) {
			var entita = $scope.entita[i];
			if (entita.categoria == "ciondoli") {
				//prendo il nome
				var nomeCiondolo = entita.nome;

				//trovo la categoria di ciondoli
				var split = nomeCiondolo.split('_');
				var categoriaCiondolo = split[0] + '_' + split[1];

				//inserisco nelle categorie di ciondoli
				// if ($scope.categorieCiondoli.indexOf(categoriaCiondolo) == -1){
				// 	$scope.categorieCiondoli.push(categoriaCiondolo);
				// }

				var modelName = configController.getNomeModelloCiondolo(split);
				if (entita.metallo == "oro") {
					if (!$scope.modelliCiondoliOro.has(categoriaCiondolo)) {
						$scope.modelliCiondoliOro.set(categoriaCiondolo, []);
					}

					if ($scope.modelliCiondoliOro.get(categoriaCiondolo).indexOf(modelName) == -1) {
						$scope.modelliCiondoliOro.get(categoriaCiondolo).push(entita);
					}
				} else {
					if (!$scope.modelliCiondoliArgento.has(categoriaCiondolo)) {
						$scope.modelliCiondoliArgento.set(categoriaCiondolo, []);
					}

					if ($scope.modelliCiondoliArgento.get(categoriaCiondolo).indexOf(modelName) == -1) {
						$scope.modelliCiondoliArgento.get(categoriaCiondolo).push(entita);
					}
				}
			}
		}
	};

	configController.gestisciTracolle = function () {
		$scope.modelliTracolleOro = new Map();
		$scope.modelliTracolleArgento = new Map();

		for (var i = 0; i < $scope.entita.length; i++) {
			var entita = $scope.entita[i];
			if (entita.categoria == "tracolle") {
				//prendo il nome
				var nomeTracolla = entita.nome;

				//trovo la categoria di tracolle
				var split = nomeTracolla.split('_');
				var categoriaTracolla = split[0] + '_' + split[1];

				var modelName = configController.getNomeModelloTracolla(split);
				if (entita.metallo == "oro") {
					if (!$scope.modelliTracolleOro.has(categoriaTracolla)) {
						$scope.modelliTracolleOro.set(categoriaTracolla, []);
					}

					if ($scope.modelliTracolleOro.get(categoriaTracolla).indexOf(modelName) == -1) {
						$scope.modelliTracolleOro.get(categoriaTracolla).push(entita);
					}
				} else {
					if (!$scope.modelliTracolleArgento.has(categoriaTracolla)) {
						$scope.modelliTracolleArgento.set(categoriaTracolla, []);
					}

					if ($scope.modelliTracolleArgento.get(categoriaTracolla).indexOf(modelName) == -1) {
						$scope.modelliTracolleArgento.get(categoriaTracolla).push(entita);
					}
				}
			}
		}
	};

	configController.getNomeModelloTracolla = function (splitted) {
		var toReturn = "";
		for (var i = 0; i < splitted.length; i++) {
			if (i > 1 && i < splitted.length - 1) {
				toReturn += splitted[i];
			}
		}
		return toReturn;
	};

	configController.getNomeModelloCiondolo = function (splitted) {
		var toReturn = "";
		for (var i = 0; i < splitted.length; i++) {
			if (i > 1 && i < splitted.length - 1) {
				toReturn += splitted[i];
			}
		}
		return toReturn;
	};

	configController.traduciCategoriaAccessorio = function (nomeAccessorio) {
		if (nomeAccessorio == "colore") {
			return "corpo";
		}
		if (nomeAccessorio == "ciondoli") {
			return "charms";
		}
		if (nomeAccessorio == "ciondolo") {
			return "nappa";
		}
		if (nomeAccessorio == "corde") {
			return "filo";
		}
		if (nomeAccessorio == "strozzino") {
			return "chiusura";
		}
		if (nomeAccessorio == "corde") {
			return "filo";
		}
		if (nomeAccessorio == "fodere") {
			return "fodera";
		}
		return nomeAccessorio;
	};

	configController.scegliModello = function (modello) {

		configController.initConfigurazione();
		//$scope.configurazione.nome = modello.nome;
		
		configController.priceManager.fullPrice = modello.prezzoPieno;

		var listaTaglie = $scope.getModelSizesLists(modello.nome);
		configController.taglieManager.listaTaglie = listaTaglie;
		configController.taglieManager.nomeModello = modello.nome;
		if (listaTaglie.length > 0) {
			configController.taglieManager.tagliaSelezionata = listaTaglie[0];
		}

		//carico solo gli accessori relativi al modello scelto
		listeService.getAccessori(modello.nome).then(function (res2) {
			$scope.entita = res2.data.accessori;
			//inizializzo la mappa con gli elenchi dei tipi di accessori
			$scope.tipiAccessori.set(modello.nome, modello.accessori);

			$scope.embossSelezionato = false;
			$scope.mapEmboss = new Map();

			$scope.coloreVincolante = "black";//scellgo il nero come colore vincolante di default
			$scope.scegliColore = true;

			$scope.metalloVincolante = "argento";
			$scope.mapMetalloTracolle = new Map();
			$scope.mapMetalloCiondoli = new Map();
			$scope.mapMetalloBorchie = new Map();

			$scope.borchieSelezionate = false;
			$scope.tracollaSelezionata = false;
			$scope.ciondoloSelezionata = false;

			$scope.metalleriaObbligatoria = [];
			$scope.inizialiPreview = "";
			configController.enableSymbols();
			$scope.symbolsUrlStack = [];

			configController.gestisciTracolle();
			configController.gestisciCiondoli();

			$scope.showDropdownButton = true;

			$scope.stack = [];
			var url = modello.urlStripe;
			// url = url.replace("RES", configController.getResolutionPlaceHolder());

			$scope.coloreSelezionato = "black";

			var entitaModello = configController.getInternalEntitaObjct("modello", modello.codice, modello.nome, modello.nome, modello.prezzo, modello.prezzoPieno, "modello", modello.urlStripe, 0, modello.urlStripe, "", "", "", "", modello.accessori, modello.accessorioInizialeSelezionato);
			entitaModello.prezzoPieno = modello.prezzoPieno;
			configController.aggiungiElementoAStack(url, 0, false, entitaModello);
			$scope.modelloSelezionato = modello.nome;
			$scope.tipiAccessoriModelloSelezionato = $scope.tipiAccessori.get(modello.nome);

			if(configController.singolaEntitaPresente("metalleria", modello.nome, "metalleria_argento")){
				var singolaEntita = configController.getSingolaEntita("metalleria", modello.nome, "metalleria_argento");
				var entitaMetalleria = configController.getInternalEntitaObjct(singolaEntita.categoria, singolaEntita.codice, singolaEntita.nome, singolaEntita.nome, singolaEntita.prezzo, 0, singolaEntita.categoria, singolaEntita.urlStripe, 3, singolaEntita.urlStripe, singolaEntita.nomeStile, singolaEntita.nomeBorchia, singolaEntita.colore, singolaEntita.metallo, [], "");
				$scope.metalleriaObbligatoria = configController.getUrlMetalleria(modello.nome, "argento");
				configController.aggiungiElementoAStack($scope.metalleriaObbligatoria, 3, false, entitaMetalleria);
			}

			if(modello.nome == "bucket_paglia"){

				var singolaEntitaFoderaPaglia = configController.getSingolaEntita("fodere", modello.nome, "FODERA_RES_NERO");
				var entitaFoderaPaglia = configController.getInternalEntitaObjct(singolaEntitaFoderaPaglia.categoria, singolaEntitaFoderaPaglia.codice, singolaEntitaFoderaPaglia.nome, singolaEntitaFoderaPaglia.nome, singolaEntitaFoderaPaglia.prezzo, 0, singolaEntitaFoderaPaglia.categoria, singolaEntitaFoderaPaglia.urlStripe, 6, singolaEntitaFoderaPaglia.urlStripe, singolaEntitaFoderaPaglia.nomeStile, singolaEntitaFoderaPaglia.nomeBorchia, singolaEntitaFoderaPaglia.colore, singolaEntitaFoderaPaglia.metallo, [], "");
				configController.aggiungiElementoAStack(entitaFoderaPaglia.urlStripe, 6, false, entitaFoderaPaglia);
                
                
			}

			if(modello.nome == "bucket_pelle"){
				$scope.coloreSelezionato = "cherrypie";
				//creo un set di default di accessori: corda, strozzino, ciondolo (,tracolla?)
				var singolaEntitaColore = configController.getSingolaEntita("colore", modello.nome, "CORPO_RES_CHERRYPIE");
				var entitaColore = configController.getInternalEntitaObjct(singolaEntitaColore.categoria, singolaEntitaColore.codice, singolaEntitaColore.nome, singolaEntitaColore.nome, singolaEntitaColore.prezzo, 0, singolaEntitaColore.categoria, singolaEntitaColore.urlStripe, 5, singolaEntitaColore.urlStripe, singolaEntitaColore.nomeStile, singolaEntitaColore.nomeBorchia, singolaEntitaColore.colore, singolaEntitaColore.metallo, [], "");
				configController.aggiungiElementoAStack(entitaColore.urlStripe, 5, false, entitaColore);

				var singolaEntitaCorda = configController.getSingolaEntita("corde", modello.nome, "CORDA_RES_CHERRYPIE");
				var entitaCorda = configController.getInternalEntitaObjct(singolaEntitaCorda.categoria, singolaEntitaCorda.codice, singolaEntitaCorda.nome, singolaEntitaCorda.nome, singolaEntitaCorda.prezzo, 0, singolaEntitaCorda.categoria, singolaEntitaCorda.urlStripe, 6, singolaEntitaCorda.urlStripe, singolaEntitaCorda.nomeStile, singolaEntitaCorda.nomeBorchia, singolaEntitaCorda.colore, singolaEntitaCorda.metallo, [], "");
				configController.aggiungiElementoAStack(entitaCorda.urlStripe, 6, false, entitaCorda);

				var singolaEntitaCiondolo = configController.getSingolaEntita("ciondolo", modello.nome, "CIONDOLO_RES_CHERRYPIE");
				var entitaCiondolo = configController.getInternalEntitaObjct(singolaEntitaCiondolo.categoria, singolaEntitaCiondolo.codice, singolaEntitaCiondolo.nome, singolaEntitaCiondolo.nome, singolaEntitaCiondolo.prezzo, 0, singolaEntitaCiondolo.categoria, singolaEntitaCiondolo.urlStripe, 7, singolaEntitaCiondolo.urlStripe, singolaEntitaCiondolo.nomeStile, singolaEntitaCiondolo.nomeBorchia, singolaEntitaCiondolo.colore, singolaEntitaCiondolo.metallo, [], "");
				configController.aggiungiElementoAStack(entitaCiondolo.urlStripe, 7, false, entitaCiondolo);

				var singolaEntitaStrozzino = configController.getSingolaEntita("strozzino", modello.nome, "STROZZINO_RES_CHERRYPIE");
				var entitaStrozzino = configController.getInternalEntitaObjct(singolaEntitaStrozzino.categoria, singolaEntitaStrozzino.codice, singolaEntitaStrozzino.nome, singolaEntitaStrozzino.nome, singolaEntitaStrozzino.prezzo, 0, singolaEntitaStrozzino.categoria, singolaEntitaStrozzino.urlStripe, 8, singolaEntitaStrozzino.urlStripe, singolaEntitaStrozzino.nomeStile, singolaEntitaStrozzino.nomeBorchia, singolaEntitaStrozzino.colore, singolaEntitaStrozzino.metallo, [], "");
				configController.aggiungiElementoAStack(entitaStrozzino.urlStripe, 8, false, entitaStrozzino);

				var singolaEntitaFodera = configController.getSingolaEntita("fodere", modello.nome, "FODERA_RES_NERO");
				var entitaFodera = configController.getInternalEntitaObjct(singolaEntitaFodera.categoria, singolaEntitaFodera.codice, singolaEntitaFodera.nome, singolaEntitaFodera.nome, singolaEntitaFodera.prezzo, 0, singolaEntitaFodera.categoria, singolaEntitaFodera.urlStripe, 10, singolaEntitaFodera.urlStripe, singolaEntitaFodera.nomeStile, singolaEntitaFodera.nomeBorchia, singolaEntitaFodera.colore, singolaEntitaFodera.metallo, [], "");
				configController.aggiungiElementoAStack(entitaFodera.urlStripe, 10, false, entitaFodera);

				var singolaEntitaTracolla = configController.getSingolaEntita("tracolla", modello.nome, "TRACOLLA_RES_CHERRYPIE");
				var entitaTracolla = configController.getInternalEntitaObjct(singolaEntitaTracolla.categoria, singolaEntitaTracolla.codice, singolaEntitaTracolla.nome, singolaEntitaTracolla.nome, singolaEntitaTracolla.prezzo, 0, singolaEntitaTracolla.categoria, singolaEntitaTracolla.urlStripe, 11, singolaEntitaTracolla.urlStripe, singolaEntitaTracolla.nomeStile, singolaEntitaTracolla.nomeBorchia, singolaEntitaStrozzino.colore, singolaEntitaTracolla.metallo, [], "");
				configController.aggiungiElementoAStack(entitaTracolla.urlStripe, 11, false, entitaTracolla);
			}

			//apro il pannello dei colori
			configController.selezioneTipoAccessorio(modello.accessorioInizialeSelezionato);
			configController.caricaSpinner();
            $scope.showDropdownButton = true;
            
            // resetto la posizione dello slider categorie per evitare che la la prima voce rimanga fuori dallo schermo a sx
            $(".accessori-categoria")[0].swiper.slideTo(0);
            function ritardo() {
                $(".accessori-thumb")[0].swiper.slideTo(0,0);
            }

            setTimeout(ritardo, 400);
		});
	};

	configController.caricaAccessoriPerModello = function (modello) {

		//carico solo gli accessori relativi al modello scelto
		listeService.getAccessori(modello.nome).then(function (res2) {
			$scope.entita = res2.data.accessori;
			//inizializzo la mappa con gli elenchi dei tipi di accessori
			$scope.tipiAccessori.set(modello.nome, modello.accessori);

			$scope.embossSelezionato = false;
			$scope.mapEmboss = new Map();

			$scope.scegliColore = true;

			$scope.mapMetalloTracolle = new Map();
			$scope.mapMetalloCiondoli = new Map();
			$scope.mapMetalloBorchie = new Map();

			$scope.borchieSelezionate = false;
			$scope.tracollaSelezionata = false;
			$scope.ciondoloSelezionata = false;

			$scope.metalleriaObbligatoria = [];
			$scope.inizialiPreview = "";
			configController.enableSymbols();
			$scope.symbolsUrlStack = [];

			configController.gestisciTracolle();
			configController.gestisciCiondoli();

			$scope.stack = [];
			var url = modello.urlStripe;

			$scope.coloreSelezionato = configController.getColoreVincolante($scope.configurazione);
			configController.aggiungiElementoAStackNoConfig(url, 0, false);
			$scope.modelloSelezionato = modello.nome;
			$scope.tipiAccessoriModelloSelezionato = $scope.tipiAccessori.get(modello.nome);

			$scope.metalleriaObbligatoria = configController.getUrlMetalleria(modello.nome, "argento");
			configController.aggiungiElementoAStackNoConfig($scope.metalleriaObbligatoria, 3, false);

			$scope.coloreVincolante = configController.getColoreVincolante($scope.configurazione);//scelgo il nero come colore vincolante di default
			$scope.metalloVincolante = configController.getMetalloVincolante($scope.configurazione);
			var accessorioInizialeSelezionato = "";
			switch(modello.nome){
				case "bucket_paglia":
					accessorioInizialeSelezionato = "fodere";
					break;
				default: 
					accessorioInizialeSelezionato = "colore";
			}
			configController.caricaConfigurazioneElencoEntita(accessorioInizialeSelezionato);
		});
	};

	configController.caricaConfigurazioneModello = function () {

		var conf = $scope.configurazione;
		var elencoEntita = conf.elencoEntita;
		for (var i = 0; i < elencoEntita.length; i++) {
			var entita = elencoEntita[i];
			if (entita.categoria == "modello") {
				configController.caricaAccessoriPerModello(entita);
				configController.priceManager.fullPrice = entita.prezzoPieno;
			}
		}
	};

	configController.caricaConfigurazioneElencoEntita = function (accessorio) {

		var conf = $scope.configurazione;
		var elencoEntita = conf.elencoEntita;
		for (var i = 0; i < elencoEntita.length; i++) {
			var entita = elencoEntita[i];
			if (entita.categoria != "modello") {
				var spilt = [];
				if(entita.categoria == "tracolle"){
					split = entita.nome.split('_');
					var categoriaTracolla = split[0] + '_' + split[1];
					configController.selezionaCategoriaTracolla(categoriaTracolla);
				} else if (entita.categoria == "ciondoli"){
					split = entita.nome.split('_');
					var categoriaCiondolo = split[0] + '_' + split[1];
					configController.selezionaCategoriaCiondolo(categoriaCiondolo);
				} 
				//else {
				//	configController.selezioneTipoAccessorio(entita.categoria);
				//}
				//configController.selezioneTipoAccessorio(entita.categoria);
				configController.ricaricaEntita(entita);
			}
		}

		configController.selezioneTipoAccessorio(accessorio);
		configController.caricaSpinner();
	};

	configController.getInternalEntitaObjct = function (categoria, codice, descrizione, nome, prezzo, prezzoPieno, tipoEntita, url, ordine, urlStripe, nomeStile, nomeBorchia, colore, metallo, accessori, accessorioInizialeSelezionato) {
		var entita = {};

		entita.categoria = (categoria == undefined ? "" : categoria);
		entita.codice = (codice == undefined ? "" : codice);
		entita.descrizione = (descrizione == undefined ? "" : descrizione);
		entita.nome = (nome == undefined ? "" : nome);
		entita.prezzo = (prezzo == undefined ? 0 : prezzo);
		entita.tipoEntita = (tipoEntita == undefined ? "" : tipoEntita);
		entita.url = (url == undefined ? "" : url);
		entita.ordine = (ordine == undefined ? -1 : ordine);
		entita.urlStripe = (urlStripe == undefined ? "" : urlStripe);
		entita.nomeStile = (nomeStile == undefined ? "" : nomeStile);
		entita.nomeBorchia = (nomeBorchia == undefined ? "" : nomeBorchia);
		entita.colore = (colore == undefined ? "" : colore);
		entita.metallo = (metallo == undefined ? "" : metallo);
		entita.accessori = (accessori == undefined ? [] : accessori);

		if(categoria == "modello"){
			entita.accessorioInizialeSelezionato = accessorioInizialeSelezionato;
			entita.prezzoPieno = prezzoPieno;
		}

		return entita;
	};

	configController.addEntitaToConfigurazione = function (categoria, codice, descrizione, nome, prezzo, prezzoPieno, tipoEntita, url, ordine, urlStripe, nomeStile, nomeBorchia, colore, metallo, accessori) {
		var entita = configController.getInternalEntitaObjct(categoria, codice, descrizione, nome, prezzo, prezzoPieno, tipoEntita, url, ordine, urlStripe, nomeStile, nomeBorchia, colore, metallo, accessori);

		$scope.configurazione.elencoEntita.push(entita);
		configController.ricaricaPrezzo();

		return entita;
	};

	configController.removeEntitaToConfigurazione = function (categoria, nome) {

		if (categoria != "iniziali") {
			//trovo l'oggetto di quella categoria e lo tolgo
			//$scope.configurazione.elencoEntita.push(entita);

			var numeroEntita = $scope.configurazione.elencoEntita.length;
			var tempElenco = $scope.configurazione.elencoEntita;
			var indice = -1;
			for (var i = 0; i < numeroEntita; i++) {
				var entita = tempElenco[i];
				if (entita.categoria == categoria) {
					indice = tempElenco.indexOf(entita);
					break;
				}
			}
			if (indice >= 0) {
				tempElenco.splice(indice, 1);
			}
			$scope.configurazione.elencoEntita = tempElenco;
		} else {
			//devo togliere l'ultima
		}

		configController.ricaricaPrezzo();
	};

	configController.ricaricaPrezzo = function () {
		var prezzoCalcolato = 0;
		var numeroEntita = $scope.configurazione.elencoEntita.length;
		for (var i = 0; i < numeroEntita; i++) {
			var entita = $scope.configurazione.elencoEntita[i];
			prezzoCalcolato += entita.prezzo;
		}
		configController.priceManager.price = prezzoCalcolato;
	};

	configController.isSelected = function (entita) {
		if (entita != undefined) {
			if (entita.nome != undefined && entita.nome != "") {
				return configController.normalizzaStringheMetallo(entita.nome) === $scope.mappaEntitaSelezionate[$scope.tipoEntitaSelezionata];
			}
		}
		return false;
	};

	configController.isColore = function (entita) {
		if (entita != undefined) {
			if (entita.categoria != undefined && entita.categoria != "") {
				return entita.categoria == 'colore' ||
				entita.categoria == 'tracolla' ||
				entita.categoria == 'corde' ||
				entita.categoria == 'strozzino' ||
				entita.categoria == 'ciondolo' ||
				entita.categoria == 'fodere';
			}
		}
		return false;
	};

	configController.getMetalloVincolante = function (config) {

		var metalloVincolante = "argento";
		for (var i = 0; i < config.elencoEntita.length; i++) {
			if (config.elencoEntita[i].categoria == "metalleria") {
				metalloVincolante = config.elencoEntita[i].metallo;
			}
		}
		return metalloVincolante;
	};

	configController.getColoreVincolante = function (config) {

		var coloreVincolante = "black";
		for (var i = 0; i < config.elencoEntita.length; i++) {
			if (config.elencoEntita[i].categoria == "colore") {
				coloreVincolante = config.elencoEntita[i].colore;
			}
		}
		return coloreVincolante;
	};

	configController.normalizzaStringheMetallo = function (daNormalizzare) {
		var result = daNormalizzare;

		if (result == undefined) {
			return daNormalizzare;
		}

		if (result.indexOf("metalleria") == -1) {
			result = result.replace("oro", "");
			result = result.replace("argento", "");
		}

		return result;
	};

	configController.gestisciEntitaIniziali = function (entita) {
		$scope.inizialiPreview = entita.nome;
		configController.checkSelectedSymbols();
	};

	configController.ricaricaEntita = function (entita) {

		$scope.tipoEntitaSelezionata = entita.categoria;

		if (entita.categoria == "iniziali") {
			//nuova gestione iniziali
			configController.gestisciEntitaIniziali(entita);
		} else {
			if (entita.nome == $scope.mappaEntitaSelezionate[$scope.tipoEntitaSelezionata] && $scope.tipoEntitaSelezionata != "colore" && $scope.tipoEntitaSelezionata != "metalleria") {
				$scope.nomeEntitaSelezionata = "";
			} else {
				$scope.nomeEntitaSelezionata = entita.nome;
			}

			var url = entita.urlStripe;

			if ($scope.tipoEntitaSelezionata == "tracolle") {
				$scope.nomeTracollaSelezionata = entita.nome;
			}
			if ($scope.tipoEntitaSelezionata == "ciondoli") {
				$scope.nomeCiondoloSelezionato = entita.nome;
			}
			if ($scope.tipoEntitaSelezionata == "stile") {
				$scope.nomeStileSelezionato = entita.nomeStile;
			}
			if ($scope.tipoEntitaSelezionata == "borchie") {
				$scope.nomeBorchiaSelezionata = entita.nomeBorchia;
			}
			if ($scope.tipoEntitaSelezionata.startsWith("colore")) {

				$scope.coloreSelezionato = entita.colore;

				//ricarico le iniziali quando cambio il colore
				if ($scope.inizialiPreview.length > 0) {
					configController.generateArray();
				}
				if ($scope.embossSelezionato) {
					//devo sostituire l'emboss se è selezionato
					//1. estraggo la url dell'emboss

					var embossUrl = $scope.mapEmboss.get($scope.nomeStileSelezionato + "_" + entita.colore);
					var urlE = embossUrl.urlStripe;
					// urlE = urlE.replace("RES", configController.getResolutionPlaceHolder());

					if (embossUrl) {
						configController.aggiungiElementoAStackNoConfig(urlE, embossUrl.ordine, false);
					}
				}
			}
			if ($scope.tipoEntitaSelezionata.startsWith("metalleria")) {
				if ($scope.tracollaSelezionata) {

					var chiaveT = configController.normalizzaNomeConMetallo($scope.nomeTracollaSelezionata, entita.metallo);
					var tracollaUrl = $scope.mapMetalloTracolle.get(chiaveT);
					var urlT = tracollaUrl.urlStripe;

					if (tracollaUrl) {
						configController.aggiungiElementoAStackNoConfig(urlT, tracollaUrl.ordine, false);
					}
				}
				if ($scope.ciondoloSelezionata) {

					var chiaveC = configController.normalizzaNomeConMetallo($scope.nomeCiondoloSelezionato, entita.metallo);
					var ciondoloUrl = $scope.mapMetalloCiondoli.get(chiaveC);
					var urlC = ciondoloUrl.urlStripe;

					if (ciondoloUrl) {
						configController.aggiungiElementoAStackNoConfig(urlC, ciondoloUrl.ordine, false);
					}
				}
				if ($scope.borchieSelezionate) {

					var borchieUrl = $scope.mapMetalloBorchie.get($scope.nomeBorchiaSelezionata + "_" + entita.metallo);
					var urlB = borchieUrl.urlStripe;

					if (borchieUrl) {
						configController.aggiungiElementoAStackNoConfig(urlB, borchieUrl.ordine, false);
					}
				}
			}

			$scope.removable = false;
			if (entita.categoria == "colore") {
				$scope.coloreVincolante = entita.colore;
			}
			if (entita.categoria == "metalleria") {
				$scope.metalloVincolante = entita.metallo;
			}

			// url = url.replace("RES", configController.getResolutionPlaceHolder());
			configController.aggiungiElementoAStackNoConfig(url, entita.ordine, (entita.categoria != "colore" && entita.categoria != "metalleria"));

			if ($scope.tipoEntitaSelezionata == "stile") {
				if ($scope.stack.indexOf(url) == -1) {
					$scope.embossSelezionato = false;
				} else {
					$scope.embossSelezionato = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
				}
				$scope.removable = true;
			}

			if ($scope.tipoEntitaSelezionata == "borchie") {
				if ($scope.stack.indexOf(url) == -1) {
					$scope.borchieSelezionate = false;
				} else {
					$scope.borchieSelezionate = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
				}
				$scope.removable = true;
			}
			if ($scope.tipoEntitaSelezionata == "tracolle") {
				if ($scope.stack.indexOf(url) == -1) {
					$scope.tracollaSelezionata = false;
				} else {
					$scope.tracollaSelezionata = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
				}
				$scope.removable = true;
			}
			if ($scope.tipoEntitaSelezionata == "ciondoli") {
				if ($scope.stack.indexOf(url) == -1) {
					$scope.ciondoloSelezionata = false;
				} else {
					$scope.ciondoloSelezionata = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
				}
				$scope.removable = true;
			}
		}
	};

	configController.eliminaTracolla = function(){
		$scope.nomeTracollaSelezionata = "";
		configController.removeEntitaToConfigurazione("tracolle", "");
		$scope.stack[20] = "";
		$scope.tracollaSelezionata = false;
		configController.caricaSpinner();
	};

	configController.eliminaCiondolo = function(){
		$scope.nomeCiondoloSelezionato = "";
		configController.removeEntitaToConfigurazione("ciondoli", "");
		$scope.stack[12] = "";
		$scope.ciondoloSelezionata = false;
		configController.caricaSpinner();
	};

	configController.selezionaEntita = function (entita) {

		$scope.askForName = true;

		if (configController.normalizzaStringheMetallo(entita.nome) == $scope.mappaEntitaSelezionate[$scope.tipoEntitaSelezionata] && $scope.tipoEntitaSelezionata != "colore" && $scope.tipoEntitaSelezionata != "metalleria") {
			$scope.nomeEntitaSelezionata = "";
			delete $scope.mappaEntitaSelezionate[$scope.tipoEntitaSelezionata];
			//tolgo dalla mappa
		} else {
			$scope.nomeEntitaSelezionata = configController.normalizzaStringheMetallo(entita.nome);
			$scope.mappaEntitaSelezionate[$scope.tipoEntitaSelezionata] = configController.normalizzaStringheMetallo(entita.nome);
			//inserisco nella mappa
		}

		html2canvas(document.querySelector("#spritespin"), { async: false }).then(function (canvas) {
			$scope.dataUrl = canvas.toDataURL();
		});

		var url = entita.urlStripe;
		// url = url.replace("RES", configController.getResolutionPlaceHolder());

		if ($scope.tipoEntitaSelezionata == "stile") {
			$scope.nomeStileSelezionato = entita.nomeStile;
		}
		if ($scope.tipoEntitaSelezionata == "borchie") {
			$scope.nomeBorchiaSelezionata = entita.nomeBorchia;
		}
		if ($scope.tipoEntitaSelezionata == "varianti-tracolle") {
			$scope.nomeTracollaSelezionata = entita.nome;
		}
		if ($scope.tipoEntitaSelezionata == "varianti-ciondoli") {
			$scope.nomeCiondoloSelezionato = entita.nome;
		}
		if ($scope.tipoEntitaSelezionata.startsWith("colore")) {

			$scope.coloreSelezionato = entita.colore;

			//ricarico le iniziali quando cambio il colore
			if ($scope.inizialiPreview.length > 0) {
				configController.generateArray();
			}
			if ($scope.embossSelezionato) {
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss

				var embossUrl = $scope.mapEmboss.get($scope.nomeStileSelezionato + "_" + entita.colore);
				var urlE = embossUrl.urlStripe;
				// urlE = urlE.replace("RES", configController.getResolutionPlaceHolder());

				if (embossUrl) {
					configController.aggiungiElementoAStack(urlE, embossUrl.ordine, false, entita);
				}
			}
		}
		if ($scope.tipoEntitaSelezionata.startsWith("metalleria")) {
			if ($scope.tracollaSelezionata) {
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss
				var chiaveT = configController.normalizzaNomeConMetallo($scope.nomeTracollaSelezionata, entita.metallo);
				var tracollaUrl = $scope.mapMetalloTracolle.get(chiaveT);
				var urlT = tracollaUrl.urlStripe;

				if (tracollaUrl) {
					configController.aggiungiElementoAStack(urlT, tracollaUrl.ordine, false, entita);
				}
			}
			if ($scope.ciondoloSelezionata) {
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss
				var chiaveC = configController.normalizzaNomeConMetallo($scope.nomeCiondoloSelezionato, entita.metallo);
				var ciondoloUrl = $scope.mapMetalloCiondoli.get(chiaveC);
				var urlC = ciondoloUrl.urlStripe;

				if (ciondoloUrl) {
					configController.aggiungiElementoAStack(urlC, ciondoloUrl.ordine, false, entita);
				}
			}
			if ($scope.borchieSelezionate) {
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss

				var borchieUrl = $scope.mapMetalloBorchie.get($scope.nomeBorchiaSelezionata + "_" + entita.metallo);
				var urlB = borchieUrl.urlStripe;
				// urlB = urlB.replace("RES", configController.getResolutionPlaceHolder());

				if (borchieUrl) {
					configController.aggiungiElementoAStack(urlB, borchieUrl.ordine, false, entita);
				}
			}
		}

		$scope.removable = false;
		if ($scope.scegliColore) {
			$scope.coloreVincolante = entita.colore;
		}
		if ($scope.scegliMetallo) {
			$scope.metalloVincolante = entita.metallo;
		}

		configController.aggiungiStrato(url, entita.ordine, (entita.categoria != "colore" && 
		entita.categoria != "metalleria" && 
		entita.categoria != "fodere" && 
		entita.categoria != "strozzino" && 
		entita.categoria != "tracolla" && 
		entita.categoria != "corde"), entita);

		if ($scope.tipoEntitaSelezionata == "stile") {
			if ($scope.stack.indexOf(url) == -1) {
				$scope.embossSelezionato = false;
			} else {
				$scope.embossSelezionato = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
			}
			$scope.removable = true;
		}

		if ($scope.tipoEntitaSelezionata == "borchie") {
			if ($scope.stack.indexOf(url) == -1) {
				$scope.borchieSelezionate = false;
			} else {
				$scope.borchieSelezionate = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
			}
			$scope.removable = true;
		}
		if ($scope.tipoEntitaSelezionata == "varianti-tracolle") {
			if ($scope.stack.indexOf(url) == -1) {
				$scope.tracollaSelezionata = false;
			} else {
				$scope.tracollaSelezionata = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
			}
			$scope.removable = true;
		}
		if ($scope.tipoEntitaSelezionata == "varianti-ciondoli") {
			if ($scope.stack.indexOf(url) == -1) {
				$scope.ciondoloSelezionata = false;
			} else {
				$scope.ciondoloSelezionata = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null);
			}
			$scope.removable = true;
		}

		configController.caricaSpinner();
	};

	configController.normalizzaNomeConMetallo = function (nome, met) {
		var metallo = met.toUpperCase();
		var splitted = nome.split('_');
		var toReturn = "";
		for (var i = 0; i < splitted.length - 1; i++) {
			toReturn += splitted[i] + '_';
		}
		return toReturn + metallo;
	};

	configController.aggiungiStrato = function (strato, ordine, eliminabile, entita) {

		configController.aggiungiElementoAStack(strato, ordine, eliminabile, entita);
		//configController.caricaSpinner();
	};

	configController.aggiungiElementoAStack = function (strato, ordine, eliminabile, entita) {
		var indice = $scope.stack.indexOf(strato);

		if (indice == -1) { //lo strato non è nello stack

			var lastIndex = $scope.stack.length - 1;
			if (ordine == lastIndex + 1) {//metto lo strato in coda
				$scope.stack.push(strato);
			} else if (ordine > lastIndex + 1) {//metto stringhe vuote fino all'indice dello strato da inserire
				for (var i = lastIndex + 1; i <= ordine - 1; i++) {
					$scope.stack[i] = "";
				}
				$scope.stack.push(strato);
			} else {//sostituisco lo strato esistente nello stack all'indice dello strato da inserire
				$scope.stack[ordine] = strato;
				configController.removeEntitaToConfigurazione(entita.categoria, entita.nome);
			}
			var accessorioInizialeSelezionato = (entita.categoria == "modello" ? entita.accessorioInizialeSelezionato : "");
			configController.addEntitaToConfigurazione(entita.categoria, entita.codice, entita.nome, entita.nome, entita.prezzo, entita.prezzoPieno, entita.categoria, entita.urlStripe, entita.ordine, entita.urlStripe, entita.nomeStile, entita.nomeBorchia, entita.colore, entita.metallo, entita.accessori, accessorioInizialeSelezionato);

		} else { //lo strato è già nello stack
			if (eliminabile) {
				configController.removeEntitaToConfigurazione(entita.categoria, entita.nome);
				$scope.stack[ordine] = "";
			}
		}
	};

	configController.aggiungiElementoAStackNoConfig = function (strato, ordine, eliminabile) {
		var indice = $scope.stack.indexOf(strato);

		if (indice == -1) { //lo strato non è nello stack

			var lastIndex = $scope.stack.length - 1;
			if (ordine == lastIndex + 1) {//metto lo strato in coda
				$scope.stack.push(strato);
			} else if (ordine > lastIndex + 1) {//metto stringhe vuote fino all'indice dello strato da inserire
				for (var i = lastIndex + 1; i <= ordine - 1; i++) {
					$scope.stack[i] = "";
				}
				$scope.stack.push(strato);
			} else {//sostituisco lo strato esistente nello stack all'indice dello strato da inserire
				$scope.stack[ordine] = strato;
			}

		} else { //lo strato è già nello stack
			if (eliminabile) {
				$scope.stack[ordine] = "";
			}
		}
	};

	configController.redirectStack = function(oldStack){
		var tempStack = [];
		for (var i = 0; i < oldStack.length; i++) {
			if (oldStack[i] != "") {
				//gestisco la risoluzione appena prima di passare le immagini alla merge
				url = $scope.replaceOrigin(oldStack[i]);
				tempStack.push(url);
			}
		}
		return tempStack;
	};

	configController.pulisciStack = function () {
		var tempStack = [];
		for (var i = 0; i < $scope.stack.length; i++) {
			if ($scope.stack[i] != "") {
				//gestisco la risoluzione appena prima di passare le immagini alla merge
				url = $scope.stack[i].replace("RES", configController.getResolutionPlaceHolder());
				tempStack.push(url);
			}
		}
		return tempStack;
	};

	configController.getCutImage = function (imgBase64, frame, resolution) {

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var image = new Image();
		canvas.height = resolution;
		canvas.width = resolution;

		image.src = imgBase64;
		image.onload = function () {
			ctx.drawImage(image, frame * resolution, 0, resolution, resolution, 0, 0, resolution, resolution);

			var dataUrl = canvas.toDataURL("image/png");
			// ... or get as Data URI

			$("#pz").attr("src", dataUrl);
			$("#pz").load();
		};
	};

	configController.getThumbnailCutImage = function (imgBase64) {

		var resolution = 400;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var image = new Image();
		canvas.height = resolution;
		canvas.width = resolution;

		image.src = imgBase64;
		image.onload = function () {
			ctx.drawImage(image, 1 * resolution, 0, resolution, resolution, 0, 0, resolution, resolution);
			$scope.configThumbnail = canvas.toDataURL("image/png");
		};
	};

	configController.caricaZoom = function (frame) {
		var cleanStack = configController.pulisciStack();

		if ($scope.symbolsUrlStack.length > 0) {
			cleanStack = cleanStack.concat($scope.symbolsUrlStack);
		}

		//sostituisco le risoluzioni per avere immagini, nello zoom, piu' definite
		var higherResolutionStack = configController.getHighResolutionStack(cleanStack);

		// mergeImages(higherResolutionStack).then(b64 => {
		// 	configController.getCutImage(b64, frame, configController.getHigherResolution());
		// });
		mergeImages(higherResolutionStack).then(function (b64) {
			configController.getCutImage(b64, frame, configController.getHigherResolution());
		});

	};

    var firstSlideTo = true;
	//qui avviene la richiesta del modello in base agli accessori selezionati
	configController.caricaSpinner = function () {
		
		$scope.showZoom = false;

		var date1 = new Date();
		//$("#loader").show();
		$("#openZoom").delay(200).hide();
		$("#prevFrame").delay(200).hide();
		$("#nextFrame").delay(200).hide();
		$("#price-panel").delay(200).hide();

		$("#loader").fadeIn("slow");


		configController.setVisible(false);

		//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
		var renderType;

		if (isTouchDevice()) {
			renderType = "images";
		} else {
			renderType = "canvas";
		}

		var cleanStack = configController.pulisciStack();

		configController.generateArray();
		if ($scope.symbolsUrlStack.length > 0) {
			cleanStack = cleanStack.concat($scope.symbolsUrlStack);
		}

		var redirectStack = configController.redirectStack(cleanStack);//metto le url del cloudfront al posto di quelle di S3

		var firstExecInit = true;
		var firstExecComplete = true;

		if ($('#spritespin') != undefined && $('#spritespin').data("spritespin") != undefined) {
			$scope.dataUrl = $('#spritespin').data("spritespin").canvas[0].toDataURL();
		}

		configController.salvaConfigurazioneTemporanea();

		mergeImages(cleanStack).then(function (b64) {
			dataSourceString = b64;
			var dataSpin = {
				width: 960,
				height: 960,
				source: dataSourceString,
				frames: 8,
				sense: 1,
				rendering: renderType,
				responsive: true,
				detectSubsampling: true,
				animate: $scope.spinAnim,
				frameTime: 100,
				loop: false,
				stopFrame: 7,
				scrollThreshold: 200,
				plugins: [
					'drag',
					'360'
				],
				onInit: function () {
					if (firstExecInit) {
                        firstExecInit = false;
                        $.fn.sepLine('first-divider', 'swiper-container', 'accessori'); // rif. descrizione funzione sepline: custom.js linea 77
						$.fn.yammHeight('navbar', 'yamm-content'); // rif. descrizione funzione yammHeight: custom.js linea 86
						$(".riepilogo").fadeIn();
						$("#transition-image").show();
                        
						$(".accessori-categoria")[0].swiper.update();//ricaricolo swiper prima dello spinner per evitare visualizzazioni errate dell'array
						$(".accessori-thumb")[0].swiper.update();//ricaricolo swiper prima dello spinner per evitare visualizzazioni errate dell'array
                    }
                    if (firstSlideTo){
                        firstSlideTo = false;
                        $(".accessori-thumb")[0].swiper.slideTo(0);
                    }
				},
				onComplete: function () {
					if (firstExecComplete) {
						firstExecComplete = false;

						if ($scope.spinIcon == true) {
							$("#spinIcon").fadeIn().delay(100).fadeOut();
							$("#spinIcon img").animate({ 'margin-left': '50px' }, 1000);
							//$('#a-middle').animate({opacity:'1'}, 500);
							$('.accessori').animate({ opacity: '1' }, 500, function () { 
                                //alert("ASJASHJKAHSJAHSAKJHS");
                            });
						}
						$("#transition-image").delay(100).fadeOut();
						$("#loader").delay(200).fadeOut("slow");
						$("#openZoom").delay(200).fadeIn("slow");
						$("#prevFrame").delay(200).fadeIn("slow");
						$("#nextFrame").delay(200).fadeIn("slow");
						$("#price-panel").delay(200).fadeIn("slow");

						$scope.spinIcon = false;
						$scope.spinAnim = false;

                        
					}
				}
			};
			$('#spritespin').spritespin(dataSpin);
			$(window).trigger("resize");

			
		});


		function isTouchDevice() {
			return 'ontouchstart' in document.documentElement;
		}

		configController.setVisible(true);

	};

	configController.setVisible = function (visible) {
		$scope.spinnerVisibleTest = visible;
	};

	configController.getUrlMetalleria = function (modello, metallo) {
		for (var i = 0; i < $scope.entita.length; i++) {
			var singolaEntita = $scope.entita[i];
			if (singolaEntita.modello == modello && singolaEntita.metallo == metallo && singolaEntita.categoria == "metalleria") {
				var url = singolaEntita.urlStripe;
				return url;
			}
		}
		return "";
	};

	configController.singolaEntitaPresente = function(categoria, modello, nome) {
		for (var i = 0; i < $scope.entita.length; i++) {
			var singolaEntita = $scope.entita[i];
			if (singolaEntita.modello == modello && singolaEntita.categoria == categoria && singolaEntita.nome == nome) {
				return true;
			}
		}
		return false;
	};

	configController.getSingolaEntita = function (categoria, modello, nome) {
		for (var i = 0; i < $scope.entita.length; i++) {
			var singolaEntita = $scope.entita[i];
			if (singolaEntita.modello == modello && singolaEntita.categoria == categoria && singolaEntita.nome == nome) {
				return singolaEntita;
			}
		}
		return null;
	};

	configController.getHigherResolution = function () {
		var currentRes = configController.getResolutionPlaceHolder();
		var higherRes = currentRes;
		switch (currentRes) {
			case "560":
				higherRes = "960";
				break;
			case "720":
				higherRes = "960";
				break;
			case "960":
				//higherRes = "1920";//in attesa che le 1920 siano su S3
				higherRes = "1920";//in attesa che le 1920 siano su S3
				break;
		}
		return higherRes;
	};

	configController.getHighResolutionStack = function (currentStack) {
		var currentRes = configController.getResolutionPlaceHolder();
		var higherRes = configController.getHigherResolution();

		var higherResolutionStack = [];
		for (var i = 0; i < currentStack.length; i++) {
			var element = currentStack[i];
			element = element.replace(currentRes, higherRes);
			higherResolutionStack.push(element);
		}
		return higherResolutionStack;
	};

	configController.getLowerResolutionStack = function (currentStack) {
		var currentRes = configController.getResolutionPlaceHolder();

		var lowerResolutionStack = [];
		for (var i = 0; i < currentStack.length; i++) {
			var element = currentStack[i];
			element = element.replace(currentRes, 560);
			lowerResolutionStack.push(element);
		}
		return lowerResolutionStack;
	};

	/*
	 * SEZIONE RELATIVA ALLA GESTIONE DELLE LETTERE E DEI SIMBOLI 
	 * */
	configController.generateSymbolStack = function () {
		//aggiungo la parte delle iniziali - se ce ne sono
		/*
		 * il symbolArray è quello su cui agganciare il modello del 'campo di testo'. Una volta definito quello e dato l'OK
		 * questa funzione si occupa di definire l'array delle url da concatenare a quelle della borsa, andando anche a ragionare
		 * sulle disposizioni dei simboli (sx, msx, m, mdx, dx) dipendentemente dal numero di simboli selezionati
		 * */
		if (configController.areSymbolsSelected()) {
			var symbolNumber = configController.getSelectedSymbolNumber();
			if (symbolNumber > 0) {
				for (var i = 0; i < symbolConfigurations[symbolNumber + 1].length; i++) {
					var posizione = symbolConfigurations[symbolNumber + 1][i];
					//adesso posso comporre lo stack dei simboli
					var url = $scope.baseUrlSymbols +
						"INIZIALI" + "_" +
						$scope.symbolArray + "_" +
						posizione + "_" +
						configController.getResolutionPlaceHolder() + "_" +
						$scope.coloreSelezionato + ".png";
					//INIZIALI_W_MDX_960_PARROT
					$scope.symbolsUrlStack.push(url);
				}
			}
		}
	};

	configController.modelNameTranslate = function (modelName) {
		switch (modelName) {
			case "shoulderbag":
				return "RIBALTINA";
			case "shopping":
				return "SHOPPING";
			case "tote":
				return "TOTE";
			case "crossbody":
				return "POCHETTE";
		}
	};

	configController.symbolTranslate = function (symbol) {
		switch (symbol) {
			case "1":
				return "PAPERELLA";
			case "2":
				return "NOTA";
			case "3":
				return "STELLA";
			default:
				return symbol;
		}
	};

	configController.colorTranslate = function (color) {
		switch (color) {
			case "black":
				return "NERO";
			case "nude":
				return "NUDE";
			case "parrot":
				return "PARROT";
			case "oceania":
				return "OCEANIA";
			case "champagne":
				return "CHAMPAGNE";
			case "lion":
				return "LION";
			default:
				return "NERO";
		}
	};

	configController.addSymbol = function (symbol) {

		if (symbol == 'backspace') {
			if ($scope.inizialiPreview.length > 0) {
				$scope.inizialiPreview = $scope.inizialiPreview.slice(0, -1);
				configController.checkSelectedSymbols();
				//configController.generateArray();
				configController.caricaSpinner();
			}
		} else {
			$scope.inizialiPreview += symbol;
			configController.checkSelectedSymbols();
			//configController.generateArray();
			configController.caricaSpinner();
		}
	};

	configController.generateArray = function () {
		$scope.symbolsUrlStack = [];
		var charArray = $scope.inizialiPreview.split('');
		var charArraySize = charArray.length;
		if (charArraySize > 0) {
			for (var i = 0; i < $scope.symbolConfigurations[charArraySize - 1].length; i++) {
				var posizione = $scope.symbolConfigurations[charArraySize - 1][i];
				//adesso posso comporre lo stack dei simboli
				var translatedSymbol = configController.symbolTranslate(charArray[i]);
				var url = configController.getSymbolUrl(translatedSymbol, posizione);
				//devo sostituire il nome del modello 
				url = url.replace("MODELLO", configController.modelNameTranslate($scope.modelloSelezionato));
				$scope.symbolsUrlStack.push(url);
			}
		}
	};

	configController.generateArrayEntitaIniziali = function () {
		var arrayEntitaIniziali = [];
		var charArray = $scope.inizialiPreview.split('');
		var charArraySize = charArray.length;
		if (charArraySize > 0) {
			for (var i = 0; i < $scope.symbolConfigurations[charArraySize - 1].length; i++) {


				var posizione = $scope.symbolConfigurations[charArraySize - 1][i];
				//adesso posso comporre lo stack dei simboli
				var translatedSymbol = configController.symbolTranslate(charArray[i]);
				var url = configController.getSymbolUrl(translatedSymbol, posizione);
				//devo sostituire il nome del modello 

				//(categoria, codice, descrizione, nome, prezzo, tipoEntita, url, ordine, urlStripe, nomeStile, nomeBorchia, colore, metallo, accessori)
				var entita = configController.getInternalEntitaObjct("iniziali", "", "iniziali - " + translatedSymbol, charArray[i], 0, 0, "iniziali", url, 20, url, "", "", "", "", [], "");

				$scope.configurazione.elencoEntita.push(entita);
				configController.ricaricaPrezzo();

				url = url.replace("MODELLO", configController.modelNameTranslate($scope.modelloSelezionato));
				$scope.symbolsUrlStack.push(url);
			}
		}
		return arrayEntitaIniziali;
	};

	configController.generateEntitaIniziali = function () {
		var entita = configController.getInternalEntitaObjct("iniziali", "", "iniziali", $scope.inizialiPreview, 0, 0, "iniziali", url, 20, "", "", "", "", "", [], "");
		return entita;
	};

	configController.getSymbolUrl = function (translatedSymbol, posizione) {
		return $scope.baseUrlSymbols + "INIZIALI" + "_" + translatedSymbol + "_" + posizione + "_" + configController.getResolutionPlaceHolder() + "_" + configController.colorTranslate($scope.coloreVincolante) + ".png";
	};

	configController.checkSelectedSymbols = function () {
		if ($scope.inizialiPreview.length > 2) {
			configController.disableSymbols();
		} else {
			configController.enableSymbols();
		}
	};

	configController.disableSymbols = function () {
		$scope.symbolEnabled = false;
	};

	configController.enableSymbols = function () {
		$scope.symbolEnabled = true;
	};

	configController.areSymbolsSelected = function () {
		return $scope.symbolArray.length > 0;
	};

	configController.getSelectedSymbolNumber = function () {
		return $scope.symbolArray.length;
	};

	configController.getSymbolEnabled = function () {
		return $scope.symbolEnabled;
	};

	configController.ordinaModelli = function (modelliNonOrdinati) {

		var size = modelliNonOrdinati.length;
		var tempModelli = new Array(size);

		for (var i = 0; i < size; i++) {
			tempModelli[modelliNonOrdinati[i].ordineInterfaccia - 1] = modelliNonOrdinati[i];
			
		}

		return tempModelli;
	};

	configController.aggiungiAlCarrello = function () {
		//nessun controllo, devo poter aggiungere n volte al carrello
		if ($scope.configurazione) {
			configController.salvaConfigurazione(true);
		}
	};

	configController.aggiungiAiPreferiti = function () {
		//controllare se è già tra i preferiti
		if ($scope.configurazione) {
			configController.salvaConfigurazione(false);
		}
	};

	configController.salvaTempELogin = function () {
		configController.salvaConfigurazioneTemporanea();

		$scope.setNextPath("/configura");
		$scope.changePath('/accedi');
	};

	configController.salvaConfigurazione = function (isCarrello) {

		if($scope.configurazione.tipo == undefined){
			if($scope.isCurrentUserAdmin()){
				$scope.configurazione.tipo = "P";//se sono utente ADMIN creo sempre una preconfigurata
			} else {
				$scope.configurazione.tipo = "N";
			}
		} else if($scope.configurazione.tipo == "N"){
			if($scope.isCurrentUserAdmin()){
				$scope.configurazione.tipo = "P";//se sono utente ADMIN creo sempre una preconfigurata
			}
		} else if($scope.configurazione.tipo == "P"){
			if(!$scope.isCurrentUserAdmin()){
				$scope.configurazione.tipo = "N";//se sono utente ADMIN creo sempre una preconfigurata
			}
		}
		
		$scope.configurazione.carrello = isCarrello;
		var dataLog = new Date();
		var resolution = 560;
		var destinationResolution = 560;
		var frameNumber = 0;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var image = new Image();
		canvas.height = resolution;
		canvas.width = resolution;

		var cleanStack = configController.pulisciStack();
		if ($scope.symbolsUrlStack.length > 0) {
			cleanStack = cleanStack.concat($scope.symbolsUrlStack);
		}
		var lowerResolutionStack = configController.getLowerResolutionStack(cleanStack);

		$scope.setLoaderMessage("genero l'anteprima della borsa...");
		$scope.showLoader();

		// mergeImages(lowerResolutionStack).then(imgBase64 => {
		mergeImages(lowerResolutionStack).then(function (imgBase64) {
			image.src = imgBase64;
			image.onload = function () {//quando la thumbnail è pronta procedo all'invio al server - controllare le dimensioni della thumbnail
				ctx.drawImage(image, frameNumber * resolution, 0, resolution, resolution, 0, 0, destinationResolution, destinationResolution);
				var base64Image = canvas.toDataURL("image/png");
				var filename = $scope.configurazione.nome;//verificare
				//$scope.configThumbnail = canvas.toDataURL("image/png");

				$scope.setLoaderMessage("salvo l'anteprima della borsa...");
				$scope.showLoader();
				//salvo l'immagine su S3 e ottengo la url
				listeService.saveImage(base64Image, filename).then(
					function (res2) {
						if (res2.errorMessage != null && res2.errorMessage != "") {
							console.log(res2.errorMessage);
							logService.saveLog(dataLog.toISOString(), confUser.email, "bagsConfiguratorController - salvaConfigurazione - saveImage", "si è verificato un problema nel salvataggio dell'immagine di thumbnail per la configurazione " + $scope.configurazione.nome + ": " + res2.errorMessage, LOG_TYPES.error);
							$scope.openMessageModal("C'è stato un problema nel salvataggio dell immagine su S3");
							$scope.hideLoader();
						} else {
							$scope.configurazione.thumbnail = res2.data.imageUrl;
							configController.assegnaUtenteAConfigurazione();

							var configDaSalvare = configController.salvaConfigurazioneTemporanea();

							$scope.hideLoader();
							$scope.salvaOAcquista(configDaSalvare.nome, isCarrello, $scope.askForName);
							$scope.askForName = false;
						}
					});
			};
		});
	};

	configController.rimuoviEntitaIniziali = function(){
		var index = -1;
		for(var i = 0; i < $scope.configurazione.elencoEntita.length; i++){
			if($scope.configurazione.elencoEntita[i].categoria == "iniziali"){
				index = i;
			}
		}
		if(index > -1){
			$scope.configurazione.elencoEntita.splice(index, 1);
		}
	};

	configController.salvaConfigurazioneTemporanea = function () {
		// var arrayIniziali = configController.generateArrayEntitaIniziali();
		var elencoEntita = $scope.configurazione.elencoEntita;
		if($scope.inizialiPreview != ""){
			var entitaIniziali = configController.generateEntitaIniziali();
			configController.rimuoviEntitaIniziali();
			elencoEntita.push(entitaIniziali);
		}

		// var elencoTotaleEntita = elencoEntita.concat(arrayIniziali);
		
		$scope.configurazione.elencoEntita = elencoEntita;

		var configurazioneNormalizzata = configController.normalizeConfig($scope.configurazione);
		$scope.setTempConfigurazione(configurazioneNormalizzata);

		return configurazioneNormalizzata;
	};

	configController.isLogged = function () {
		return loginService.isLoggedIn();
	};

	configController.initConfigurazione = function () {

		$scope.configurazione.codice = "";
		$scope.configurazione.dedica = "";
		$scope.configurazione.nome = "";
		$scope.configurazione.carrello = 0;
		$scope.configurazione.elencoEntita = [];
	};

	configController.assegnaUtenteAConfigurazione = function () {
		var userInSession = $scope.getUser();
		var user = {};
		if (userInSession != null) {
			// 	user.email = userInSession.email;
			var idToken = jwtHelper.decodeToken(userInSession.signInUserSession.idToken.jwtToken);
			var email = idToken.email;
			user.email = email;
		}
		$scope.configurazione.utente = user;
	};

	configController.normalizeConfig = function (config) {

		var normalizedConfig = config;
		var elencoEntitaDaNormalizzare = config.elencoEntita;

		for (var i = 0; i < elencoEntitaDaNormalizzare.length; i++) {
			var urlDaNormalizzare = elencoEntitaDaNormalizzare[i].url;
			urlDaNormalizzare = urlDaNormalizzare.replace("560", "RES");
			urlDaNormalizzare = urlDaNormalizzare.replace("720", "RES");
			urlDaNormalizzare = urlDaNormalizzare.replace("960", "RES");
			urlDaNormalizzare = urlDaNormalizzare.replace("1920", "RES");
			urlDaNormalizzare = urlDaNormalizzare.replace("MODELLO", configController.modelNameTranslate($scope.modelloSelezionato));
			elencoEntitaDaNormalizzare[i].url = urlDaNormalizzare;

			var urlStripeDaNormalizzare = elencoEntitaDaNormalizzare[i].urlStripe;
			urlStripeDaNormalizzare = urlStripeDaNormalizzare.replace("560", "RES");
			urlStripeDaNormalizzare = urlStripeDaNormalizzare.replace("720", "RES");
			urlStripeDaNormalizzare = urlStripeDaNormalizzare.replace("960", "RES");
			urlStripeDaNormalizzare = urlStripeDaNormalizzare.replace("1920", "RES");
			urlStripeDaNormalizzare = urlStripeDaNormalizzare.replace("MODELLO", configController.modelNameTranslate($scope.modelloSelezionato));
			elencoEntitaDaNormalizzare[i].urlStripe = urlStripeDaNormalizzare;
		}
		normalizedConfig.elencoEntita = elencoEntitaDaNormalizzare;
		return normalizedConfig;
	};

	configController.inizializationOperations = function(){
		$scope.mappaEntitaSelezionate.colore = "black";
		$scope.mappaEntitaSelezionate.metalleria = "argento";

		//1. devo fare il caricamento massivo iniziale delle configurazioni (solo la struttura json dal DB, non le immagini)
		listeService.getModelli().then(function (res) {
			if (res.data.esito.codice == 100) {
				$scope.modelli = configController.ordinaModelli(res.data.modelli);

				var configurazione = $scope.getTempConfigurazione();
				if (configurazione != null && configurazione != undefined) {
					//c'è già una configurazione presente in locale, la vado a caricare
					$scope.configurazione = configurazione;
					if (configurazione.tipo === "P") {
						//se è preconfigurata, tolgo l'id in modo che quando la salvo risulti nuova
						configurazione.codice = "";
					}
					configController.caricaConfigurazioneModello();
					configController.ricaricaPrezzo();
					$scope.showDropdownButton = true;
					
				} else {
					//non ci sono configurazioni in locale, apro il selettore del modello
					$scope.showDropdownButton = false;
				}
			}
		});

		configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;

		/* gestione elementi dell'interfaccia */
		var aperto = 0;

		$("#pz").pinchzoomer();

		//$('#canvasWrapper').parentResize(0);

		$('#a').click(function () {
			var $target = $('#inizialiPreview');
			var text = $('#inizialiPreview').val();
			var buttonVal = $(this).data('value');

			$target.val(text + " " + buttonVal);
		});


		$(document).on('blur', '#txt_fullname', function () {
			var name = $(this).val();
			$('#edit-text').text(name);
		});

		$('.accessori').css('bottom', $('.riepilogo').outerHeight());
		$.fn.yammHeight('navbar', 'yamm-content'); // rif. descrizione funzione yammHeight: custom.js linea 86

		// customizza la barra di scorrimento del mega menu
		(function ($) {
			$(window).on("load", function () {
				$(".yamm-content").mCustomScrollbar({
					theme: "minimal-dark",
					scrollButtons: { enable: true },
					scrollInertia: 400
				});
				/*$(".borsaModel").click(function() {
				   $(".dropdown-toggle").dropdown("toggle");
				});*/
				$('.dropdown.keep-open').on({
					"shown.bs.dropdown": function () { this.closable = false; },
					"click": function () { this.closable = true; },
					"hide.bs.dropdown": function () { return this.closable; }
				});
			});
		})(jQuery);


		$(window).resize(function () {
			$('.accessori').css('bottom', $('.riepilogo').outerHeight());
			$('#canvasWrapper').parentResize();
			$.fn.sepLine('first-divider', 'swiper-container', 'accessori');
			$.fn.yammHeight('navbar', 'yamm-content');
		});

		configController.priceManager.price = 0;
	};

	configController.initConfiguratore = function () {

		//controllo che il configuratore non sia stato chiamato con un parametro
		if($scope.configurazioneId != null && $scope.configurazioneId != undefined && $scope.configurazioneId != ""){
			// l'id c'è, provo a caricare la configurazione
			listeService.getConfigurazione($scope.configurazioneId).then(function (res2) {
				var configurazione = res2.data.configurazione;
				if(configurazione != undefined){
					var nomeModello = configController.getNomeModelloConfigurazione(configurazione);
					var listaTaglie = $scope.getModelSizesLists(nomeModello);
					configController.taglieManager.listaTaglie = listaTaglie;
					configController.taglieManager.nomeModello = modello.nome;
					if (listaTaglie.length > 0) {
						configController.taglieManager.tagliaSelezionata = listaTaglie[0];
					}
					$scope.setTempConfigurazione(configurazione);
				}
				configController.inizializationOperations();
			});
		} else {
			var configurazioneAttuale = $scope.getTempConfigurazione();
			if (configurazioneAttuale) {
				var nomeModello = configController.getNomeModelloConfigurazione(configurazioneAttuale);
				var listaTaglie = $scope.getModelSizesLists(nomeModello);
				configController.taglieManager.listaTaglie = listaTaglie;
				configController.taglieManager.nomeModello = nomeModello;
				if (listaTaglie.length > 0) {
					configController.taglieManager.tagliaSelezionata = listaTaglie[0];
				}
			}
			configController.inizializationOperations();
		}
	};

	configController.getNomeModelloConfigurazione = function(configurazione) {
		if (!configurazione) {
			return "";
		}
		var elencoEntita = configurazione.elencoEntita;
		for (var i = 0; i < elencoEntita.length; i++) {
			if (elencoEntita[i].categoria == "modello")
			{ 
				return elencoEntita[i].nome;
			}
		}
		return "";
	};

	configController.openZoom = function () {
		var pz = PinchZoomer.get("pz");

		pz.zoom(1.4);
		pz.y(-300);
		pz.x(-70);

		html2canvas(document.querySelector("#spritespin")).then(function (canvas) {
			//$("#loader").show();
			$("#loader").fadeIn("slow");
			var dataUrl = canvas.toDataURL();
			$("#pz").attr("src", dataUrl);
			$("#pz").load();
			$('.zoom').css({ 'z-index': '10' }).animate({ opacity: '1' });
			var spriteSpinAPI = $('#spritespin').spritespin('api');
			$("#loader").fadeOut("slow");
			configController.caricaZoom(spriteSpinAPI.currentFrame());//CARICO LO ZOOM AD ALTA RISOLUZIONE
		});

	};
	

	configController.closeZoom = function () {

		$('.zoom').animate(
			{
				opacity: 0
			},
			{
				complete: function () {
					$(this).css({ 'z-index': '0' });
				}
			});
	};

	/*
		GESTIONE DEL MODALE PER LA CONFERMA DEL CAMBIO MODELLO
	*/
	configController.switchShowDropdown = function(){
		//mettere modale che avverte
		if($scope.showDropdownButton){
			$uibModal.open({
				templateUrl: 'views/modaleCancellaConfigurazione.html',
				scope: $scope
			  });
		} else {
			$scope.showDropdownButton = false;
		}
	};

	$scope.ok = function () {
		$scope.showDropdownButton = false;
		$uibModalStack.dismissAll();
	  };

	$scope.cancel = function () {
		$uibModalStack.dismissAll();
	};

	configController.previousFrame = function(){
		var moveLeft = $('#spritespin').spritespin("data");
		SpriteSpin.updateFrame(moveLeft, (moveLeft.frame - 1));
	};

	configController.nextFrame = function () {
		var moveRight = $('#spritespin').spritespin("data");
		SpriteSpin.updateFrame(moveRight, (moveRight.frame + 1));
	};

	// MODALE PER SCELTA DELLA TAGLIA
	$scope.openSceltaTaglia = function (taglieManager) {
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleSceltaTaglia.html',
			scope: $scope,
			resolve: {
				taglieScheda: function () {
					return taglieManager;
				}
			},
			controller: ['taglieScheda', function (taglieScheda) {
				$scope.taglieManagerModal = taglieScheda;
			}]
		});
	};

	$scope.scegliTaglia = function(taglia) {
		configController.taglieManager.tagliaSelezionata = taglia;
		$scope.configurazione.taglia = taglia;
		$uibModalStack.dismissAll();
	};
});