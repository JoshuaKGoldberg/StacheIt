#StacheIt

##About
StacheIT is an application that uses a Chrome Extension to be able to Stash articles to a user account. Articles can then be annotated by the user to save for a later date. This application is still in it's development stages. IT MAY NOT BE SECURE. ANY PERSONAL INFORMATION MAY BE LEAKED.

##Installation
The following environment is required to run the application as is. However, the database can be changed if the settings.py file is changed to reflect that backend.

###Prereqs 
* PostgreSQL installed

* Python Requirements

* Recommended to run in virtualenv and to download using pip.

* Create an Application on Facebook to get the API keys that are needed.

###Steps 
1. Check that the above files are installed.

2. Change the settings.py file to reflect the database settings, and the API keys for Facebook authentication.

3. Inside the virtualenv do `~# pip install -r requirements.txt`

4. Now run `~# ./manage.py syncdb --all` to sync the database
  *At this point you will be prompted to fill out information for a superuser which has access to the /admin part of the site. Fill in the information as you wish

5. At this point you should be able to run `./manage.py runserver` to see the site up and running


##StacheIt Extension

###Setup

The StacheIt Extension for Google Chrome requires minimal configuration.

1. In Google Chrome, go to chrome://extensions

2. Check "Developer mode" in the top/right of the page

3. Click the "Load unpacked extension..." button

4. Select your directory containing the StacheIt Extension, such as
    C:/Repositories/StacheIt/Extension

###Schematics

There are three components to the extension.

1. Background script (background.js)
    * Creates the context menu option to "Stache Page" (insert content.js)
    
2. Popup (popup.js)
    * Immediately AJAXes user info
        * If anonymous, <iframe> containing login page is shown
        * If registered, button to "Stache Page" is shown (inserts content.js)
    
3. Content script (content.js)
    * POSTs current page to main site's API, then opens the user's
      library view in a new tab

## alchemyapi_python

A sdk for AlchemyAPI using Python


## AlchemyAPI 

AlchemyAPI offers artificial intelligence as a service. We teach computers to learn how to read and see, and apply our technology to text analysis and image recognition through a cloud-based API. Our customers use AlchemyAPI to transform their unstructured content such as blog posts, news articles, social media posts and images into much more useful structured data. 

AlchemyAPI is a tech startup located in downtown Denver, Colorado. As the world’s most popular text analysis service, AlchemyAPI serves over 3.5 billion monthly API requests to over 35,000 developers. To enable our services, we use artificial intelligence, machine learning, neural networks, natural language processing and massive-scale web crawling. Our technology powers use cases in a variety of industry verticals, including social media monitoring, business intelligence, content recommendations, financial trading and targeted advertising.

More information at: http://www.alchemyapi.com



## API Key

To use AlchemyAPI, you'll need to obtain an API key and attach that key to all requests. If you do not already have a key, please visit: http://www.alchemyapi.com/api/register.html



### Getting Started with the Python SDK 

To get started and run the example, simply:

	git clone https://github.com/AlchemyAPI/alchemyapi_python.git
	cd alchemyapi_python
	python alchemyapi.py YOUR_API_KEY
	python example.py


Just replace YOUR_API_KEY with your 40 character API key from AlchemyAPI, and you should be good to go.
