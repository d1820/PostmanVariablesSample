var baseGithubUrl = pm.variables.get("baseGithubUrl");
var githubUser = pm.variables.get("githubUser");
var githubRepoName = pm.variables.get("githubRepoName");
var githubClientId = pm.variables.get("githubClientId");
var githubClientSecret = pm.variables.get("githubClientSecret");
var authQueryString = "?client_id=" + githubClientId + "&client_secret=" + githubClientSecret;
var baseUrl = baseGithubUrl + githubUser+"/" + githubRepoName + "/master/";

var globalVariablesUrl = pm.variables.get("globalVariablesPath").replace("{0}", pm.variables.get("environment"));
var sharedVariablesUrl = pm.variables.get("sharedVariablesPath").replace("{0}", pm.variables.get("environment"));


    pm.sendRequest({
        url:  baseUrl + globalVariablesUrl,
        method: 'GET',
    }, function (err, response) {
        if(err){
            console.error("Pre-Request Error", err, response.text());
        }
        var globalBaseline = response.json();
        globalBaseline.forEach(function(item) {
            pm.environment.set(item.key, item.value);
        });
        //now get any shared overrides to the global requests

        pm.sendRequest({
            url:  baseUrl + sharedVariablesUrl,
            method: 'GET',
        }, function (err, response) {
            if(err){
                console.error("Pre-Request Error", err, response.text());
            }
            var sharedVariables = response.json();
            sharedVariables.forEach(function(item) {
                pm.environment.set(item.key, item.value);
            });
        });
    });