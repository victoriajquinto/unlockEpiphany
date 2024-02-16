# Unlock Epiphany - An Overview

Unlock Epiphany's goal is to send users AI-generated life advice to users based on their Myers Briggs Type Indicator, i.e. one of their 16 Myers Briggs personality types, and an area where the user would like to see personal growth. Users take a Typeform survey to provide personal information, select up to four topics of interest (i.e., professional development, dating, work-life balance, and networking), and state how often they would like to receive advice emails (i.e., daily, weekly, monthly, or a random frequency from the prior three options). The typeform survey response is forwarded to the app's Express server via a Zapier webhook. The Express server stores the responses in a PostgreSQL database and triggers the app to send an email to the user with advice. The app will continue to send advice emails to the user at the user's preferred frequency.

# Tech Stack
Typeform
Zapier Webhook
Axios.js
NodeMailer
ChatGPT
Express Server
PostgreSQL