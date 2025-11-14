// Field definitions for the Dataviews component
export const fields = [
  {
    id: 'title',
    header: 'Title',
    type: 'text',
    getValue: ({ item }) => item.name,
    render: ({ item }) => (
      <span style={{
        fontSize: '0.875rem',
        fontWeight: '800',
        color: '#374151'
      }}>
        {item.name}
      </span>
    ),
    filterBy: false,
    enableHiding: true,
    enableSorting: true
  },
  {
    id: 'image',
    header: 'Image',
    type: 'media',
    getValue: ({ item }) => item.path,
    render: ({ item }) => { 
        return (
      <img 
        src={item.path} 
        alt={item.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '4px',
          border: '1px solid #e0e0e0'
        }}
      />
    )},
    filterBy: false,
    enableSorting: false
  },
  {
    id: 'category',
    header: 'Cat',
    type: 'text',
    getValue: ({ item }) => item.category,
    render: ({ item }) => (
      <p style={{
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: item.category === 'charlie' ? '#e3f2fd' : 
                        item.category === 'edward' ? '#f3e5f5' : 
                        item.category === 'fred' ? '#e8f5e8' : 
                        item.category === 'rosie' ? '#fff3e0' : '#f5f5f5',
        color: item.category === 'charlie' ? '#1565c0' : 
               item.category === 'edward' ? '#7b1fa2' : 
               item.category === 'fred' ? '#2e7d32' : 
               item.category === 'rosie' ? '#ef6c00' : '#424242',
        fontSize: '0.875rem',
        fontWeight: '500',
        textAlign: 'center'
      }}>
        {item.category}
      </p>
    ),
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
    render: ({ item }) => (
      <p style={{
        padding: '4px 8px',
        borderRadius: '4px',
        border: item.medium === 'digital' ? '1px solid #c2185b' : '1px solid #00695c',
        color: item.medium === 'digital' ? '#c2185b' : '#00695c',
        fontSize: '0.875rem',
        fontWeight: '500',
        textAlign: 'center'
      }}>
        {item.medium}
      </p>
    ),
    elements: [
      { value: 'digital', label: 'Digital' },
      { value: 'film', label: 'Film' }
    ],
    filterBy: { operators: [ 'is', 'isNot' ] },
    enableHiding: true,
    enableSorting: true
  }
];