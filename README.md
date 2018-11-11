# usermanagement

QUALITY SERVICE - USER MANAGEMENT
---------------------------------

DESCRIPTION
Small Website UI for user's roles management. The technologies used are JQuery, JQuery mobile, JavaScript, PHP, HTML5 and CSS.

FUNCTIONALITIES
User Management app to handle about 200 users with these following roles:
-	Administrator
-	Lead investigator
-	Regional Manager for one or more regions.
-	Company Manager for one or more companies.
-	Quality Manager for one or more companies and for one or more offices for the selected companies.
-	Security Manager for one or more companies and for one or more offices for the selected companies.

INCLUDES
1.	A UI/UX and for the User Management module where an Administrator can update the user roles assigned to a user.
2.	An UI prototype in HTML5.

TREE

- json
	|- test_roles.json -> file which contains all the setted roles.
	|- test_single_user.json -> file which contains all the users registered in the system.
	|- test_users.json -> file which contains all the users registered in the system.
- index.html -> frontpage
- useredit.html -> change role(s) panel form.
- userlist.html -> popup form to select the action.
- logic.js -> javascript file with all the functionalities.
- view.js -> javascript file with all the handlers.
- README.md -> info file.
- test.php -> php file to show message popup.

TECH
HTML5, JavaScript, JQuery, PHP and CSS

ASSUMPTIONS

- To run and see the Web UI test properly you need an Apache server. In case you have one, just need to place this test in the 'htdocs' folder. Apache serve could be downloaded from the below links:
  
  * Windows - https://www.apachefriends.org/download.html
  * MAC - https://www.mamp.info/en/downloads/
  * Linux - http://www.lamphowto.com/
  
- Once the Apache server is property installed and running, copy the folder test to 'htdocs'.

- Open a browser as Firefox.

- Type "http://localhost/usermanagement/".

- NOTE: This Web UI is using JSON files to show just information, not to save. It means, in case you want to save the data when you
  change the role user you'll need to use data base functionalities.

