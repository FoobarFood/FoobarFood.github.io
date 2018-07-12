# Forkcast

[Check it out!](https://forkcastfoods.github.io)

## Concept

The *Forkcast* app allows users to find comfort foods to eat based on the weather at their location. Our extensive database of comfort foods includes breakfast, lunch, dinner, and snack options to please any user's palette. 

The user inputs their location based on city, state, or zip code, then selects what type of meal they want. Their location input is used to determine the weather for their area. The weather information is then used to select a few meal options from our database that match the weather conditions. The app suggests 5 meals, with 3 recipes for each meal suggestion. Recipes include a photo, a link to the full recipe, a list of ingredients, and cooking time. 

Users may also input their own comfort food, associated with certain weather conditions, to our database. 

## Motivation

The goal of *Forkcast* is to provide anyone, anywhere a quick and convenient way to get appealing food suggestions. By incorporating the weather into the calculation of what food is suggested, our app is able to recommend foods that feel appropriate and appetizing with respect to the temperature and outside conditions. As the database of comfort foods expands, users will have the added benefit of increased variety in the food suggestions - never again will they eat the same old boring meals! 

---

## Development Process & Design

Our development team ([Anthony S.](https://github.com/ats89), [James C.](https://github.com/Faolun), [Julia S.](https://github.com/julesanne493), and [Malvika P.](https://github.com/malvikapchari)) followed an Agile Development Process flow. We started with our main concept, 

> As a user, I want food suggestions based on my location and weather.

and broke it down into a series of smaller user stories, each with its associated tasks:

> As a user, I want to be able to input my location.
  * hello
  * hello

> As a user, I want to see the weather at my location.

> As a user, I want food suggestions based 





# APIs Used
Open Weather Map: https://openweathermap.org/api
Yummly: https://developer.yummly.com/
Bing Maps: https://msdn.microsoft.com/en-us/library/dd877180.aspx

# Open Weather Map functionality
Provides us with temperature and main weather description (cloudy, sunny, raining)
These temperature and weather descriptors get matched with foods in our database

# Bing Maps
Open Weather Map does not support “City, State” queries, so we needed an alternate way to fetch the weather when the user inputs their location this way
By running the location through Bing Maps, we can generate the zip code and use it in our Open Weather Map API function
This also allows us to validate user input

# Yummly 
Large recipe database that provides us with everything we need to display recipes to the user (image, cooking time, ingredients, recipe link)

