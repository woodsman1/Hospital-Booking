# Hospital Booking Site
A simple Hospital Booking App that is built using Django which has Restjs on top of it. 

# Features of Project
The app is build in such a way that, if the user wants to run the Backend and Frontend separately, then they do it using some simple steps. Because the code is writen in such a way that they can be seperated easily.

The project have Token Based Authentication. On Forntend side the refresh token is stored in Cookie. So, every time the user Refresh the page the AuthToken is requested and Stored in Memory. By this Approch Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) attacks are taken care. And on the Backend side the Django-rest-framework Auth Token are used to create and authenticate user tokens.

# Technologies/Frameworks Used
Django, Django-Rest-framework, Django-Rest-framework Token Authentication, React, React-Router-Dom , React Icons, React States, react-date-picker, universal-cookie, HTML, CSS, Javascript,  


## Features

* User can Login or SignUp to the Site.
* They can select the date from Select Date option, on which they have to book the Slot.
* The Red slot's on the Site are already booked by other user or by the user itself
* The white Slot are available for booking. User have to just Click on the Slot to Book.
* User can see their booked slots by clicking on the "Booked Slot's" link on the Navbar
* User can cancle their booked slot by clicking on the dustbin icon on the Right corner of that slot   

### User Interface Demo Video

https://drive.google.com/file/d/11L4GB8WoZ8Cf1kzJ5QVBm9hi8CJiLs0s/view?usp=sharing

### Staff Editing Time Table Video

https://drive.google.com/file/d/1Mfb57zHL7vGmEi1-NEa7NWGUZQg7CKeH/view?usp=sharing

## Django Installation

* Create virtual environment 

```
virtualenv venv
source ./venv/bin/activate
```

* Install Requirements
```
pip install -r requirements.txt
```

* Run the initial migrations
```
python manage.py migrate
```

* Create Super User 
```
python manage.py createsuperuser
```

## Installing React Dependencies

* Change your directory

```
cd hospital/frontend
```

* Install all the Dependencies (make sure you have installed nodejs on your machine)

```
npm install
```

## Running Server 

* Make sure you are in the same directory as of manage.py file. Then run the command 

```
python manage.py runserver
```

### Now are your Done with Installation 