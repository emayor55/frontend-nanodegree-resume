##A MAP APPLICATION to list MUSEUMS, PARKS or RESTAURANTS

*How to start the application*

1. Locate the file named 'index.html' 

2. Open the 'index.html' file using a browser by double-clicking on the file icon. 

3. If the default program that opens 'html' files on your computer is  not a browser, you can open 'index.html' by right-clicking on the icon, locating the 'Open with...' option on the pop-up menu, and selecting a browser from the options provided. 



*What is this Map Application*
This application generates a list of museums, or parks or restaurants in a city selected from the dropdown list provided. 
It uses the Places library of Google to generate one such listing in the city selected.
It also uses the Yelp API and the Wikipedia API to get more information about the items in the list.
 
*How to use this Map Application*
Upon launching the application, you will see a listing of museums and a map of Washington, DC. 
You have launched the application successfully if you see a map on the right, two dropdown lists on top of the screen and a list on the left. 

Use the search box to isolate a specific item in the list. Simultaneously, map markers for items removed from the list will be taken off the map. 

Click on the list item (or on the map marker) to open an info window which contains a preview of and a link for  
Yelp reviews (if available) and also a link to a Wikipedia article about the place (also, if available).

To generate a listing of _parks_ or _restaurants_, simply change the selection on the corresponding selection list.

To 'visit' another city, select another city from the nine included in the dropdown. 

This folder includes the original source in the 'src' directory, as well as _package.json_ and _Gruntfile_ script used to generate the minified files.