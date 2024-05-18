# LOLMEDIA

LOLMEDIA is a web application built with React and TypeScript to display information about the game League of Legends. The application fetches data from the League of Legends API and presents it in an organized and user-friendly manner.

## Getting Started

To run the LOLMEDIA website, follow these steps:

1. **Start the Python Backend**  
   Ensure the Python backend server is running. The frontend relies on the backend to fetch data.

2. **Start the React Frontend**  
   Open a terminal inside the `/lolmedia` directory and run the following commands:

   ```sh
   npm start
   ```
   
   If you encounter any errors, you may need to install the necessary dependencies:
   
   ```sh
   npm install 
   ```
   After the installation is complete, try starting the frontend again:
   ```sh
   npm start
   ```

Project Structure

The Folder is organized as follows:

    /src: Contains all the source code.
        /alljson: Holds JSON data fetched from the API, which includes coordinates and other necessary data.
        /css: Contains the CSS files for styling each page.
        /pages: Includes the main code that gets displayed on the page.
            /comp: Contains all the custom components along with their respective CSS files.

Technologies Used

    React: A JavaScript library for building user interfaces.
    TypeScript: A superset of JavaScript that adds static typing.
    CSS: Cascading Style Sheets for styling the application.

If you have any questions or suggestions, feel free to open an issue or contact us directly.

Happy Coding!