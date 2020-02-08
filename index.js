
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

Actions:

1. Log into Project Unicorn (https://projectunicorn.net/signin)
	
	- credentials: rickywid@hotmail.com/unicornUED7A0

	* After successful login, user will be redirected to https://projectunicorn.net/projects

2. Loop through all the projects. For each project perform the following:
	
	- Join project
	- Click platform icon (slack/discord)

	* After click event, new tab will open to invite page.

	- If already part of a project, leave and join again.

3. Check validity of invite links.

	- For Slack groups perform the following:

		- Get URL of Slack invite link 
		  https://pure-drive.slack.com/join/shared_invite/enQtNzc3MjU4NjMwMjU2LTEyOGVlZGE0ZDljYTAxYTYzMGM5ZjIyOTIzNDdjMGZhZDA4NTFjMDQ2ZjRmMjg4ZmZhNmRlMTkxZWMzZGZjMDY

		- Perform a GET request. After request has completed, it will return the HTML document of page.
		- Search the page and look for keywords "This invite link is no longer active." text.
		- If keywords exist, add project details to a text document.

	- For Discord groups perform the following:

		- Get URL of Discord invite link 
		  https://discordapp.com/api/v6/invites/yFqGuz

		- Perform a GET request with URL parameters "with_counts=true". 
		  https://discordapp.com/api/v6/invites/yFqGuz?with_counts=true
		  
		- After request has completed, inspect Headers and check for status code 404.
		- If request return with 404 status code, add project details to a text document.


*/

const { Builder, By, Key, until } = require('selenium-webdriver');
const { Request } = require('selenium-webdriver/http');
const fetch = require("node-fetch");

const EMAIL = 'rickywid@hotmail.com';
const PASS = 'unicornUED7A0';
const URL = "https://projectunicorn.net/signin";

(async function ProjectLinkValidator() {

	var myHeaders = new Headers();
	myHeaders.append('Accept', 'application/json');
	myHeaders.append('Content-Type', 'image/jpeg');
	
	var myInit = { 
	  method: 'GET',
	  headers: myHeaders,
	  mode: 'cors',
	  cache: 'default' 
	};


	const request = new Request('https://pub-api.azurewebsites.net/api/projects', myInit);

	fetch(request).then(function(res) {
		return res.json();
	}).then(function(body) {
		console.log(body);
	}).catch(function(err) {
		console.log(err);
	});








 //    // let driver = await new Builder().forBrowser('firefox').build();
 //    const driver = await new Builder().forBrowser('chrome').build();

	// //Store the ID of the original window
	// const originalWindow = await driver.getWindowHandle();
 //    await driver.manage().setTimeouts( { implicit: 10000 } );

 //    try {

 //    	console.log('***Starting Script***');


 //        // Sign In

 //        await driver.get(URL);
 //        await driver.findElement(By.name('email-signin')).sendKeys(EMAIL);
 //        await driver.findElement(By.name('password')).sendKeys(PASS, Key.ENTER);

 //        console.log('***Signing in...***')

	// 	await driver.wait(until.titleIs('App - Project Unicorn'), 15000);

	// 	console.log('***Signin successful...***')





	// 	// Wait for project gallery to load

	// 	const projects = await driver.findElements(By.className('card__Wrapper-sc-1dbmq2c-0 kXNNqK'));
	// 	const projectCount = projects.length;		

	// 	console.log('=========================');
	// 	console.log('Total projects: ', projects.length);
	// 	console.log('=========================');
        
 //        const buttonText = await projects[0].findElement(By.className("button__Button-s1of8c-0 api-button__ApiButtonHtml-sc-770yol-0 krcfUI")).getText();

 //        if(buttonText === 'Join') {
 //        	await projects[0].findElement(By.className("button__Button-s1of8c-0 api-button__ApiButtonHtml-sc-770yol-0 krcfUI")).click();	
        	
 //        } 
        
 //        await projects[0].findElement(By.css("h3 > img")).click();
        




	// 	//Wait for the new window or tab
	// 	await driver.wait(
	// 	    async () => (await driver.getAllWindowHandles()).length === 2,
	// 	    10000
	// 	  );

	// 	//Loop through until we find a new window handle
	// 	const windows = await driver.getAllWindowHandles();

	// 	windows.forEach(async handle => {
	// 	  if (handle !== originalWindow) {
	// 	    await driver.switchTo().window(handle);
	// 	    console.log(await driver.getCurrentUrl());

	// 	  }
	// 	});


	// 	//Wait for the new tab to finish loading content
	// 	await driver.wait(until.titleIs('Create Account | Slack'), 10000);


		
		// while(i < projectCount) {


		// 2. Loop through all the projects. For each project perform the following:

		// 	- Join project
		// 	- Click platform icon (slack/discord)

		// 	* After click event, new tab will open to invite page.
			// i++;
		// }

		

   
    // }
    // finally{
    //     driver.quit();
    // }
})();