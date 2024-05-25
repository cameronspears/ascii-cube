# ascii-cube

ascii-cube is a React application that displays an ASCII art cube which can be rotated in various orientations by dragging with the mouse.

## Features

- Interactive cube rotation using mouse drag
- Fetches and displays ASCII art of the cube from pre-rendered text files
- Smooth updates with throttled mouse events

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/cameronspears/ascii-cube.git
   ```

2. Navigate to the project directory:

   ```
   cd ascii-cube
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```
   /usr/local/bin/npm run dev
   ```

2. Open your browser and go to `http://localhost:3000` to see the ASCII cube in action.

### API

The project includes an API to serve the ASCII art files based on the cube's orientation. The API is defined in `cube.js` and serves the ASCII art files stored in the `asciiCubes` directory.

#### Example API Endpoint

To fetch the ASCII art for a specific orientation, the API endpoint is structured as follows:

```
/api/cube?x={x}&y={y}
```

Where `x` and `y` are the orientation angles.

Example request:

```
/api/cube?x=0&y=15
```

### Usage

- Click and drag the mouse to rotate the cube.
- The application will fetch and display the appropriate ASCII art based on the cube's orientation.

## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes.

## License

This project is currently unlicensed. Contributions and discussions regarding appropriate licensing are welcome.
