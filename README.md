# Volunteer Village

## Project Contributors

-   Steven Klinefelter - klinefelters@etown.edu
-   Ethan Lajeunesse - lajeunessee@etown.edu
-   Rein Alderfer - alderferr@etown.edu
-   Toma Yasuda - yasudat@etown.edu

## Website / App

-   Click [HERE](https://volunteervillage.co/) to go to the website

## Inspiration

The inspiration for our project was from our college's motto educate for service. It's always hard to find and organize volunteers effectively and efficiently for volunteering events. We thought to make an all-in-one platform through this website to do just that.

## What it does

This project allows event organizers to create events in which other users can see and sign up to volunteer. Users can login to our website using Auth0 and can use their Google account. In the events page, they can see the list of events and see a Event modal that displays a detailed list of event properties such as the description, address, and a sign up button that allows users to sign up for the event. Users can create volunteer events by entering the information such as event title, description, date, address, and image in the create events page. In "My Events Page", users can see who signed up for the events they created, and then confirm that they also participated in the volunteer event.

## How we built it

To begin creating Volunteer Village was started with creating a plan. After we created our plan of action and had our roles assigned we went straight into building the website. We decided to utilize React for the front end and Python with Flask for the backend because Flask makes it easy to create a REST api. Steven and Toma focused on creating the front end, while Ethan and Rein built out the back end and API routes. Our backend communicates with a mysql database and where we store events/posts and volunteers. For user authentication, we decided to use Auth0. Auth0 does a lot of heavy lifting for us developers by ensuring we don't need to define API routes for authentication based actions. Also, by using Auth0 we didn't need to worry too much about security in regards to logins because Auth0 was responsible for managing user access tokens.

## Challenges we ran into

I would say the biggest challenge we ran into was time. Given that this was all of our first 24 hour hackathon, we really had to consider that when planning features we wanted to create. We had a lot of other goals for the project, such as badges that would be awarded to users based on the number of times they volunteered at events. However, we had to drop this in order to create a working prototype for the presentation. Another challenge we ran into was setting up Auth0. Ethan previously had experience setting up Auth0 with React + Node.js, however, this is the first time setting it up on the Python backend. We had to spend a lot of time learning how to accomplish adding Auth0 to our backend part of the project.

## Accomplishments that we're proud of

The accomplishments that we are the most proud of is the overall quality of our site. Volunteer Village feels welcoming to visitors and is easy to navigate. The website is user friendly for both the volunteer and event organizer. We especially proud of how well the project integrates the front end, and back end. The front end looks great with a cohesive theme and easy to use interface that updates fast for our users. The backend works great integrating python using flatpack, and sql, docker integration to create a well thought out and cohesive back end that supports the front end to make the website run great.

## What we learned

We learned a lot at this hackathon. Each individually and as a team. The team built up our teamwork skills through constant communication. By making sure that the front end developers and the backend developers helped each other through temporary data structures, or constantly communicating with each other when something went wrong. Individually we all grew our coding skills through constant debugging and collaboration between team mates.

## Next Steps

The next steps for Volunteer Village is to be iterated upon. We want to add in badges that users can earn based on the number of times they volunteer for an event. We also want to continue iterating on our original design, ensuring that errors are fully handled and we want to make the user experience even more easy to learn. We also thought that we could add in a chat feature where users can create group chats on the site to discuss upcoming volunteer opportunities and shared interests.
