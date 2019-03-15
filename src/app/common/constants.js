angular.module('applicationModule').constant('URLS',{
		get: 'https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet',
		put: 'https://i51umjhba2.execute-api.eu-central-1.amazonaws.com/unadunaPost',
		del: 'https://gtjby1j5oi.execute-api.eu-central-1.amazonaws.com/UnadunaDelete',
		getConfigurazioniNode :' https://3swwefa2tj.execute-api.eu-central-1.amazonaws.com/unaDunaGetConfigurazioniNode'
	}
).constant('RESPONSE_CODES',{
	okResponse: 100
}).constant('VARIOUS',{
	requestTypeModelli: 'MODELLI',
	requestTypeEntita: 'ENTITA'
}).constant('EMAIL_CONFIGURATION', {
	adminEmailAddress: 'info@annacloud.it'
}).constant('AWS_SERVICE_URLS', {
	
	urlGetService: "https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet",
	urlGetServiceNode: 'https://ig24v3ii6b.execute-api.eu-central-1.amazonaws.com/unaDunaGetAccessori',
	urlPostService: "https://i51umjhba2.execute-api.eu-central-1.amazonaws.com/unadunaPost",
	urlDeleteService: "https://gtjby1j5oi.execute-api.eu-central-1.amazonaws.com/UnadunaDelete",
	urlOtherService: "https://779m9s40ij.execute-api.eu-central-1.amazonaws.com/UnaDunaOther"
}).constant('LOG_TYPES', {
	warning: "WARN",
	info: "INFO",
	error: "ERR",
	login: "LOGIN"
}).constant('ROLES', {
	ADMIN: "arn:aws:iam::801532940274:role/Annacloud_Utenti_Admin",
	REGULAR: "arn:aws:iam::801532940274:role/Annacloud_Utenti_Registrati"
}).constant('ORDERSTATUS', {
	ORDINATO: 1,
	LAVORAZIONE1: 2,
	LAVORAZIONE2: 3,
	SPEDIZIONE: 4,
	ARCHIVIATO: 5
});