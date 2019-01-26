angular.module('applicationModule').constant('MAIL',{
	ORDER_MAIL_BASE_TEMPLATE: "\
		<head>\
		<!--[if gte mso 9]><xml>\
			<o:OfficeDocumentSettings>\
			<o:AllowPNG/>\
			<o:PixelsPerInch>96</o:PixelsPerInch>\
			</o:OfficeDocumentSettings>\
			</xml><![endif]-->\
		<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>\
		<meta name='viewport' content='width=device-width'>\
		<!--[if !mso]><!-->\
		<meta http-equiv='X-UA-Compatible' content='IE=edge'>\
		<!--<![endif]-->\
		<title></title>\
		<style type='text/css' id='media-query'>\
			@font-face {\
			font-family: 'Montserrat';\
			font-style: normal;\
			font-weight: 400;\
			src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');\
			unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\
			}\
			@font-face {\
			font-family: 'Montserrat';\
			font-style: normal;\
			font-weight: 700;\
			src: local('Montserat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format('woff2');\
			unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\
			}\
			body {\
			font-family: 'Montserrat', sans-serif;\
			margin: 0;\
			padding: 0;\
			}\
			table,\
			tr,\
			td {\
			vertical-align: top;\
			border-collapse: collapse;\
			}\
			.ie-browser table,\
			.mso-container table {\
			table-layout: fixed;\
			}\
			* {\
			line-height: inherit;\
			}\
			a[x-apple-data-detectors=true] {\
			color: inherit !important;\
			text-decoration: none !important;\
			}\
			[owa] .img-container div,\
			[owa] .img-container button {\
			display: block !important;\
			}\
			[owa] .fullwidth button {\
			width: 100% !important;\
			}\
			[owa] .block-grid .col {\
			display: table-cell;\
			float: none !important;\
			vertical-align: top;\
			}\
			.ie-browser .num12,\
			.ie-browser .block-grid,\
			[owa] .num12,\
			[owa] .block-grid {\
			width: 480px !important;\
			}\
			.ExternalClass,\
			.ExternalClass p,\
			.ExternalClass span,\
			.ExternalClass font,\
			.ExternalClass td,\
			.ExternalClass div {\
			line-height: 100%;\
			}\
			.ie-browser .mixed-two-up .num4,\
			[owa] .mixed-two-up .num4 {\
			width: 160px !important;\
			}\
			.ie-browser .mixed-two-up .num8,\
			[owa] .mixed-two-up .num8 {\
			width: 320px !important;\
			}\
			.ie-browser .block-grid.two-up .col,\
			[owa] .block-grid.two-up .col {\
			width: 240px !important;\
			}\
			.ie-browser .block-grid.three-up .col,\
			[owa] .block-grid.three-up .col {\
			width: 160px !important;\
			}\
			.ie-browser .block-grid.four-up .col,\
			[owa] .block-grid.four-up .col {\
			width: 120px !important;\
			}\
			.ie-browser .block-grid.five-up .col,\
			[owa] .block-grid.five-up .col {\
			width: 96px !important;\
			}\
			.ie-browser .block-grid.six-up .col,\
			[owa] .block-grid.six-up .col {\
			width: 80px !important;\
			}\
			.ie-browser .block-grid.seven-up .col,\
			[owa] .block-grid.seven-up .col {\
			width: 68px !important;\
			}\
			.ie-browser .block-grid.eight-up .col,\
			[owa] .block-grid.eight-up .col {\
			width: 60px !important;\
			}\
			.ie-browser .block-grid.nine-up .col,\
			[owa] .block-grid.nine-up .col {\
			width: 53px !important;\
			}\
			.ie-browser .block-grid.ten-up .col,\
			[owa] .block-grid.ten-up .col {\
			width: 48px !important;\
			}\
			.ie-browser .block-grid.eleven-up .col,\
			[owa] .block-grid.eleven-up .col {\
			width: 43px !important;\
			}\
			.ie-browser .block-grid.twelve-up .col,\
			[owa] .block-grid.twelve-up .col {\
			width: 40px !important;\
			}\
			@media only screen and (min-width: 500px) {\
			.block-grid {\
				width: 480px !important;\
			}\
			.block-grid .col {\
				vertical-align: top;\
			}\
			.block-grid .col.num12 {\
				width: 480px !important;\
			}\
			.block-grid.mixed-two-up .col.num4 {\
				width: 160px !important;\
			}\
			.block-grid.mixed-two-up .col.num8 {\
				width: 320px !important;\
			}\
			.block-grid.two-up .col {\
				width: 240px !important;\
			}\
			.block-grid.three-up .col {\
				width: 160px !important;\
			}\
			.block-grid.four-up .col {\
				width: 120px !important;\
			}\
			.block-grid.five-up .col {\
				width: 96px !important;\
			}\
			.block-grid.six-up .col {\
				width: 80px !important;\
			}\
			.block-grid.seven-up .col {\
				width: 68px !important;\
			}\
			.block-grid.eight-up .col {\
				width: 60px !important;\
			}\
			.block-grid.nine-up .col {\
				width: 53px !important;\
			}\
			.block-grid.ten-up .col {\
				width: 48px !important;\
			}\
			.block-grid.eleven-up .col {\
				width: 43px !important;\
			}\
			.block-grid.twelve-up .col {\
				width: 40px !important;\
			}\
			}\
			@media (max-width: 500px) {\
			.block-grid,\
			.col {\
				min-width: 320px !important;\
				max-width: 100% !important;\
				display: block !important;\
			}\
			.block-grid {\
				width: calc(100% - 40px) !important;\
			}\
			.col {\
				width: 100% !important;\
			}\
			.col>div {\
				margin: 0 auto;\
			}\
			img.fullwidth,\
			img.fullwidthOnMobile {\
				max-width: 100% !important;\
			}\
			.no-stack .col {\
				min-width: 0 !important;\
				display: table-cell !important;\
			}\
			.no-stack.two-up .col {\
				width: 50% !important;\
			}\
			.no-stack.mixed-two-up .col.num4 {\
				width: 33% !important;\
			}\
			.no-stack.mixed-two-up .col.num8 {\
				width: 66% !important;\
			}\
			.no-stack.three-up .col.num4 {\
				width: 33% !important;\
			}\
			.no-stack.four-up .col.num3 {\
				width: 25% !important;\
			}\
			.mobile_hide {\
				min-height: 0px;\
				max-height: 0px;\
				max-width: 0px;\
				display: none;\
				overflow: hidden;\
				font-size: 0px;\
			}\
			}\
		</style>\
		</head>\
		<body class='clean-body' style='margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F7F7'>\
		<style type='text/css' id='media-query-bodytag'>\
			@media (max-width: 520px) {\
			.block-grid {\
				min-width: 320px !important;\
				max-width: 100% !important;\
				width: 100% !important;\
				display: block !important;\
			}\
			.col {\
				min-width: 320px !important;\
				max-width: 100% !important;\
				width: 100% !important;\
				display: block !important;\
			}\
			.col>div {\
				margin: 0 auto;\
			}\
			img.fullwidth {\
				max-width: 100% !important;\
			}\
			img.fullwidthOnMobile {\
				max-width: 100% !important;\
			}\
			.no-stack .col {\
				min-width: 0 !important;\
				display: table-cell !important;\
			}\
			.no-stack.two-up .col {\
				width: 50% !important;\
			}\
			.no-stack.mixed-two-up .col.num4 {\
				width: 33% !important;\
			}\
			.no-stack.mixed-two-up .col.num8 {\
				width: 66% !important;\
			}\
			.no-stack.three-up .col.num4 {\
				width: 33% !important;\
			}\
			.no-stack.four-up .col.num3 {\
				width: 25% !important;\
			}\
			.mobile_hide {\
				min-height: 0px !important;\
				max-height: 0px !important;\
				max-width: 0px !important;\
				display: none !important;\
				overflow: hidden !important;\
				font-size: 0px !important;\
			}\
			}\
		</style>\
		<!--[if IE]><div class='ie-browser'><![endif]-->\
		<!--[if mso]><div class='mso-container'><![endif]-->\
		<table class='nl-container' style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F7F7;width: 100%' cellpadding='0' cellspacing='0'>\
			<tbody>\
			<tr style='vertical-align: top'>\
				<td style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'>\
				<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='center' style='background-color: #F7F7F7;'><![endif]-->\
				<div style='background-color:transparent;'>\
					<div style='Margin: 0 auto;min-width: 320px;max-width: 480px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;' class='block-grid '>\
					<div style='border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;'>\
						<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='background-color:transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width: 480px;'><tr class='layout-full-width' style='background-color:#FFFFFF;'><![endif]-->\
						<!--[if (mso)|(IE)]><td align='center' width='480' style=' width:480px; padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 1px solid #E6E3E3; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num12' style='min-width: 320px;max-width: 480px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 1px solid #E6E3E3; border-right: 0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div align='center' class='img-container center  autowidth  ' style='padding-right: 0px;  padding-left: 0px;'>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr style='line-height:0px;line-height:0px;'><td style='padding-right: 0px; padding-left: 0px;' align='center'><![endif]-->\
								<img class='center  autowidth ' align='center' border='0' src='https://www.annacloud.it/images/logo-email-header.png' alt='Image' title='Image' style='width: 120px; height: 43px;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 120px' width='120'>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
					</div>\
					</div>\
				</div>\
				<div style='background-color:transparent;'>\
					<div style='Margin: 0 auto;min-width: 320px;max-width: 480px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;' class='block-grid '>\
					<div style='border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;'>\
						<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='background-color:transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width: 480px;'><tr class='layout-full-width' style='background-color:#FFFFFF;'><![endif]-->\
						<!--[if (mso)|(IE)]><td align='center' width='480' style=' width:480px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 1px solid #E6E3E3; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num12' style='min-width: 320px;max-width: 480px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 1px solid #E6E3E3; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div class=''>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px;'><![endif]-->\
								<div style='color:#909090;line-height:120%; padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px;'>\
								<div style='font-size:12px;line-height:14px;color:#909090;text-align:left;'>\
									<p style='margin: 0;font-size: 12px;line-height: 14px;text-align: justify'><span style='font-size: 12px; line-height: 14px;'>Ciao e grazie per aver acquistato una borsa <strong>Anna Cloud</strong>.<br></span><br><span style='font-size: 12px; line-height: 14px;'>La nostra filosofia non comprende solo la realizzazione di borse di alta fattura, ma anche un percorso di coinvolgimento del cliente durante tutta la fase di lavorazione.</span></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px;text-align: justify'><span style='font-size: 12px; line-height: 14px;'>&#160;</span></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px;text-align: justify'><span style='font-size: 12px; line-height: 14px;'>Riceverai la tua borsa tra circa 20 giorni; essendo un prodotto unico ci serve il tempo per realizzarlo su misura, proprio come lo vuoi tu.<br><br>Ma in questo tempo di terremo aggiornato su come procede il lavoro, così da farti capire cosa c’è dietro una borsa di qualità.<br>Per qualunque informazione trovi di seguiti il nostro numero di assistenza.</span></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px;text-align: justify'><span style='font-size: 12px; line-height: 14px;'>&#160;</span></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px;text-align: justify'><span style='font-size: 12px; line-height: 14px;'>Un caro saluto e a presto</span></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px;text-align: justify'><strong><span style='font-size: 12px; line-height: 14px;'>Il team di Anna Cloud</span></strong></p>\
								</div>\
								</div>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
					</div>\
					</div>\
				</div>\
				<div style='background-color:transparent;'>\
					<div style='Margin: 0 auto;min-width: 320px;max-width: 480px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;' class='block-grid '>\
					<div style='border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;'>\
						<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='background-color:transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width: 480px;'><tr class='layout-full-width' style='background-color:#FFFFFF;'><![endif]-->\
						<!--[if (mso)|(IE)]><td align='center' width='480' style=' width:480px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num12' style='min-width: 320px;max-width: 480px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div class=''>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;'><![endif]-->\
								<div style='color:#555555;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;'>\
								<div style='font-size:12px;line-height:14px;color:#555555;text-align:left;'>\
									<p style='margin: 0;font-size: 14px;line-height: 17px;text-align: center'>I'm a new Text block ready for your content.</p>\
								</div>\
								</div>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
					</div>\
					</div>\
				</div>\
				<div style='background-color:transparent;'>\
					<div style='Margin: 0 auto;min-width: 320px;max-width: 480px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;' class='block-grid two-up '>\
					<div style='border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;'>\
						<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='background-color:transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width: 480px;'><tr class='layout-full-width' style='background-color:#FFFFFF;'><![endif]-->\
						<!--[if (mso)|(IE)]><td align='center' width='240' style=' width:240px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num6' style='max-width: 320px;min-width: 240px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div align='center' class='img-container center fixedwidth ' style='padding-right: 0px;  padding-left: 0px;'>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr style='line-height:0px;line-height:0px;'><td style='padding-right: 0px; padding-left: 0px;' align='center'><![endif]-->\
								<img class='center fixedwidth' align='center' border='0' src='https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/1548329675480_MODIFICATA%202.png' alt='Image' title='Image' style='outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 168px' width='168'>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td><td align='center' width='240' style=' width:240px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num6' style='max-width: 320px;min-width: 240px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div class=''>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 30px; padding-left: 0px; padding-top: 50px; padding-bottom: 30px;'><![endif]-->\
								<div style='color:#555555;line-height:120%; padding-right: 30px; padding-left: 0px; padding-top: 50px; padding-bottom: 30px;'>\
								<div style='font-size:12px;line-height:14px;color:#555555;text-align:left;'>\
									<p style='margin: 0;font-size: 14px;line-height: 17px'><strong><span style='font-size: 12px; line-height: 14px;'>Nome configurazione</span><br><br></strong></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>modello: shoulderbag</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>colore: oceania</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>stile: oceania cuori</p>\
									<p style='margin: 0;font-size: 14px;line-height: 17px'><strong>&#160;</strong></p>\
								</div>\
								</div>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
					</div>\
					</div>\
				</div>\
				<div style='background-color:transparent;'>\
					<div style='Margin: 0 auto;min-width: 320px;max-width: 480px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;' class='block-grid '>\
					<div style='border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;'>\
						<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='background-color:transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width: 480px;'><tr class='layout-full-width' style='background-color:#FFFFFF;'><![endif]-->\
						<!--[if (mso)|(IE)]><td align='center' width='480' style=' width:480px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 1px solid #E6E3E3; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num12' style='min-width: 320px;max-width: 480px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 1px solid #E6E3E3; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div class=''>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px;'><![endif]-->\
								<div style='color:#555555;line-height:120%; padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px;'>\
								<div style='font-size:12px;line-height:14px;color:#555555;text-align:left;'>\
									<p style='margin: 0;font-size: 14px;line-height: 17px'><strong><span style='font-size: 12px; line-height: 14px;'>Dati cliente</span><br><br></strong></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>nome: Paolo Salvadori</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>email: oloap1981@gmail.com</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>telefono: 349518751</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>&#160;</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'><strong>Indirizzo di spedizione</strong></p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>&#160;</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>Paolo Salvadori</p>\
									<p style='margin: 0;font-size: 12px;line-height: 14px'>Via Fiorino Vecchio 8<br>56040 Montescudaio (PI)</p>\
								</div>\
								</div>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
					</div>\
					</div>\
				</div>\
				<div style='background-color:transparent;'>\
					<div style='Margin: 0 auto;min-width: 320px;max-width: 480px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #F7F7F7;' class='block-grid '>\
					<div style='border-collapse: collapse;display: table;width: 100%;background-color:#F7F7F7;'>\
						<!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='background-color:transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width: 480px;'><tr class='layout-full-width' style='background-color:#F7F7F7;'><![endif]-->\
						<!--[if (mso)|(IE)]><td align='center' width='480' style=' width:480px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 1px solid #E6E3E3; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><![endif]-->\
						<div class='col num12' style='min-width: 320px;max-width: 480px;display: table-cell;vertical-align: top;'>\
						<div style='background-color: transparent; width: 100% !important;'>\
							<!--[if (!mso)&(!IE)]><!-->\
							<div style='border-top: 1px solid #E6E3E3; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>\
							<!--<![endif]-->\
							<div class=''>\
								<!--[if mso]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 10px; padding-left: 10px; padding-top: 25px; padding-bottom: 25px;'><![endif]-->\
								<div style='color:#909090;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 25px; padding-bottom: 25px;'>\
								<div style='font-size:12px;line-height:14px;color:#909090;text-align:left;'>\
									<p style='margin: 0;font-size: 14px;line-height: 17px;text-align: center'><span style='font-size: 10px; line-height: 12px;'><strong>Anna Cloud</strong> è un marchio<strong> Pelletteria Digitale srl</strong>.<br>Sede - Via San Tommaso, 21 -Santa Croce Sull’Arno (PI)<br>email: info@annacloud.it - CF/P.IVA: 02272250503<br><br><strong>Customer Care</strong><br>dal lunedì al venerdì dalle 9 alle 18.<br><br>Copyright 2019 <strong>Anna Cloud</strong><br></span></p>\
								</div>\
								</div>\
								<!--[if mso]></td></tr></table><![endif]-->\
							</div>\
							<!--[if (!mso)&(!IE)]><!-->\
							</div>\
							<!--<![endif]-->\
						</div>\
						</div>\
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
					</div>\
					</div>\
				</div>\
				<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\
				</td>\
			</tr>\
			</tbody>\
		</table>\
		<!--[if (mso)|(IE)]></div><![endif]-->\
		</body>\
		</html>"
	 }
);