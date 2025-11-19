// Field definitions for the Dataviews component

// Category color mapping
const categoryColors = {
  charlie: { bg: '#e3f2fd', color: '#1565c0' },
  edward: { bg: '#f3e5f5', color: '#7b1fa2' },
  fred: { bg: '#e8f5e8', color: '#2e7d32' },
  rosie: { bg: '#fff3e0', color: '#ef6c00' }
};

// Medium color mapping
const mediumColors = {
  digital: '#c2185b',
  film: '#00695c'
};

export const fields = [
  {
    id: 'title',
    header: 'Title',
    type: 'text',
    getValue: ({ item }) => item.name,
    filterBy: false,
    enableHiding: true,
    enableSorting: true
  },
  {
    id: 'image',
    header: 'Image',
    type: 'media',
    getValue: ({ item }) => item.path,
    render: ({ item }) => (
      <img 
        src={item.path} 
        alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    filterBy: false,
    enableSorting: false
  },
  {
    id: 'category',
    header: 'Cat',
    type: 'text',
    getValue: ({ item }) => item.category,
    render: ({ item }) => {
      const colors = categoryColors[item.category] || { bg: '#f5f5f5', color: '#424242' };
      return (
        <span className="category-badge" style={{ backgroundColor: colors.bg, color: colors.color }}>
          {item.category}
        </span>
      );
    },
    elements: [
      { value: 'charlie', label: 'charlie' },
      { value: 'edward', label: 'edward' },
      { value: 'fred', label: 'fred' },
      { value: 'rosie', label: 'rosie' }
    ],
    enableHiding: true,
    enableSorting: true
  },
  {
    id: 'medium',
    header: 'Medium',
    type: 'text',
    getValue: ({ item }) => item.medium,
    render: ({ item }) => {
      const color = mediumColors[item.medium] || '#424242';
      return (
        <span className="medium-badge" style={{ borderColor: color, color }}>
          {item.medium}
        </span>
      );
    },
    elements: [
      { value: 'digital', label: 'Digital' },
      { value: 'film', label: 'Film' }
    ],
    filterBy: { operators: [ 'is', 'isNot' ] },
    enableHiding: true,
    enableSorting: true
  }
];