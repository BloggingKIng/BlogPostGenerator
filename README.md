# Setup Guide

- Create a `.env` file and save add your gemini api key like this `API_KEY=XXXXXXX`
- Activate the virtual environment using `pipenv shell` and install the required dependencies.
- Start the server using the command `python manage.py runserver`
- (We still haven't attached frontend with the django so you will have to start it separately using node)
- Move to the frontend folder using `cd frontend` and after installing the modules, start the server using `npm start`
- Now go to `localhost:3000` and register yourself.
- Login or Signup using the respective buttons from navbar and than you will be bought to the page.
- Fill out the form and click the generate button.
- The bot will than generate a blog post!