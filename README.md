<!-- # next-js-employee-ecommerce-with-time-tracking
All employee can be registered as per organization. On daily basis employee needs to do clock in and clock out to track their work hours. Based on criteria they will be rewarded by points. Using that points they can purchase things which are available on organization store. (Amazon Coupan, Play Store Cards, Movie Tickets, Shopping Voucher etc)

# Available Scripts 
in the project directory you can run

### npm run dev
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
same as npm start but npm start will be used after building the app

### npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information. -->


# Next.js Employee Ecommerce with Time Tracking

## Overview
This application allows organizations to register employees and track their working hours through a clock-in and clock-out system. Employees earn reward points based on predefined criteria and can redeem these points for various store items, such as:
- Amazon Coupons
- Google Play Store Cards
- Movie Tickets
- Shopping Vouchers

## Features
- Employee registration and management
- Daily clock-in and clock-out for work hours tracking
- Automated point allocation based on work hours
- Organization store where employees can redeem earned points
- Secure authentication and authorization

## Technologies Used
- **Framework:** Next.js
<!-- - **Database:** MongoDB / PostgreSQL (Specify your choice) -->
<!-- - **Authentication:** NextAuth.js / Firebase Auth -->
- **Styling:** Tailwind CSS
- **State Management:** Redux / Context API
<!-- - **Deployment:** Vercel / AWS / DigitalOcean -->

## Installation & Setup
To set up and run the project locally, follow these steps:

### 1. Clone the Repository
```sh
git clone https://github.com/darshanbhikadiya/clock-in-clock-out.git
cd clock-in-clock-out
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and configure the necessary environment variables.

```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_auth_secret
```

### 4. Run the Development Server
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### `npm run dev`
Runs the app in development mode.

### `npm start`
Runs the built application in production mode.

### `npm run build`
Builds the application for production, optimizing performance.
<!-- 
## Deployment
The app can be deployed on Vercel, AWS, or any cloud provider.
For Vercel deployment:
```sh
vercel
``` -->
<!-- 
## Contribution
If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
 -->
