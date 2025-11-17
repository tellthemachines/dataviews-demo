# DataViews Demo

A minimal React application demonstrating the WordPress DataViews component for displaying and managing tabular data.

## Features

- **WordPress DataViews Integration**: Uses the `@wordpress/dataviews` package to create a powerful data table
- **Minimal Dependencies**: Built with vanilla React and Vite for optimal performance
- **Sample Data**: Displays a team members list with sorting, filtering, and pagination
- **Interactive Features**: 
  - Search functionality
  - Column sorting
  - Pagination
  - Row selection
  - Custom actions (View, Delete)
  - Column visibility controls

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── DataViewsWrapper.jsx   # DataViews implementation
├── data.jsx                # Sample data and field definitions
└── main.jsx                # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Dependencies

- **React**: Core React library
- **@wordpress/dataviews**: WordPress DataViews component for table functionality
- **Vite**: Build tool and development server

## Data Structure

The application expects a `src/data.js` file that exports two items:

1. **fields**: Field definitions (imported from `src/fields.jsx`)
2. **sampleData**: An array of data objects

### Creating Your Data File

Create a file at `src/data.js` with the following structure:

```javascript
// Sample data for the Dataviews component
import { fields } from './fields.jsx';

export { fields };
export const sampleData = [
  {
    id: 1,                    // Unique identifier (number)
    name: 'Item Name',        // Display name (string)
    category: 'category1',    // Category (string: 'charlie', 'edward', 'fred', 'rosie')
    path: 'path/to/image.jpg', // Image path or URL (string)
    type: 'jpg',              // File type (string: 'jpg', 'png')
    medium: 'digital'         // Medium (string: 'digital' or 'film')
  },
  // Add more items as needed
];
```

You may use other category names but if so you should modify the fields file accordingly.
You are encouraged to use pictures and names of your own cats, dogs or other animal friends :)

### Required Fields

Each item in the `sampleData` array must have:
- **id** (number): Unique identifier for the item
- **name** (string): Display name/title of the item
- **category** (string): One of 'charlie', 'edward', 'fred', or 'rosie'
- **path** (string): Path to the image file
- **type** (string): File extension ('jpg' or 'png')
- **medium** (string): Either 'digital' or 'film'

## Customization

To customize the display or behavior:

1. Create your `src/data.js` file with the structure described above
2. Update field configurations in `src/fields.jsx` to change display, sorting, or filtering behavior
3. Modify the actions in `DataViewsWrapper.jsx` to add custom functionality

## License

This project is created for demonstration purposes.