
/*
==============================
Project Invite Link Validator
==============================

==============================
Documentation:
==============================
https://selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index.html
https://selenium.dev/documentation/en/getting_started_with_webdriver/


==============================
Specs:
==============================

- Check if invite links is valid. If the invite link is no longer active, flag the project and take necessary action.

*/

const { Builder, By, Key, until } = require('selenium-webdriver');
const fetch = require("node-fetch");
const fs = require('fs');

let projects = [];
const config = { 
  method: 'GET',
  headers: {
  	Accept: 'application/json',
  	'Content-Type': 'application/json; charset=utf-8'
  },
  mode: 'cors',
  cache: 'default' 
};


(async function ProjectLinkValidator() {

	// const driver = await new Builder().forBrowser('chrome').build();
	const driver = await new Builder().forBrowser('firefox').build();
	await driver.manage().setTimeouts( { implicit: 10000 } );

	fetch('https://pub-api.azurewebsites.net/api/projects', myInit)
	.then(function(res) { return res.json(); })
	.then(async function(body) { 

		let i = 1;
		projects = body.data; 

		console.log('=============================')
		console.log('Total Projects: ', projects.length)
		console.log('=============================')

		console.log('Checking links......\n');

		while(i < projects.length) {

			const project = projects[i];
			const URL = project.communicationPlatformUrl;
			const platform = project.communicationPlatform;

			await driver.get(URL);

			if(platform === 'slack') {

				const inputEmailSlack = await driver.findElements(By.className("email_field small"));

				if(!inputEmailSlack.length) {
					writeToFile(project, i);
				}
				
			} else {

				const inviteCode = project.communicationPlatformUrl.split('https://discord.gg/')[1];

				fetch('https://discordapp.com/api/invite/' + inviteCode + '?with_counts=true', myInit)
				.then(function(res) { return res.json(); })
				.then(async function(body) {
					
					if(body.code !== inviteCode) {
						writeToFile(project, i);
					}
				}).catch(function(err) { 
					console.log(err)
				});
			}

			console.log(i + '. ' + project.name);

			i++;
		}		

		console.log('\nDone.')
		driver.quit();
	})
	.catch(function(err) { 
		console.log(err); 
	});


	function writeToFile(project, i) {
		fs.appendFile('projects', 
					   project.name + '\n' +
					   project.communicationPlatformUrl + '\n' +
					   project.repositoryUrl + '\n\n',
					   function(err) {
			if(err) {
				console.log(err);
			}
		})
	}
})();