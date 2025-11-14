import { useState, useMemo, useCallback, useEffect } from 'react';
import { DataViews } from '@wordpress/dataviews';
import { Button, Modal } from '@wordpress/components';
import { sampleData } from './data.js';
import { fields } from './fields.jsx';

function DataViewsComponent() {
  const [isGroupedView, setIsGroupedView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allLoadedRecords, setAllLoadedRecords] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [view, setView] = useState({
    type: 'grid',
    perPage: 10,
    page: 1,
    sort: {
      field: 'title',
      direction: 'asc'
    },
    search: '',
    filters: [],
    titleField: 'title',
    mediaField: 'image',
    fields: ['category'],
    infiniteScrollEnabled: false
  });

  const [selection, setSelection] = useState([]);

  // Filter and sort the data based on the current view
  const data = useMemo(() => {
    let filteredData = [...sampleData];

    // Apply search filter
    if (view.search) {
      const searchTerm = view.search.toLowerCase();
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }

    // Apply field filters
    if (view.filters && view.filters.length > 0) {
      filteredData = filteredData.filter(item => {
        return view.filters.every(filter => {
          const fieldValue = item[filter.field];
          const filterValue = filter.value;
          
          // If there's no filter value, show all data
          if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) {
            return true;
          }

          switch (filter.operator) {
            case 'is':
              return Array.isArray(filterValue) ? filterValue.includes(fieldValue) : fieldValue === filterValue;
            case 'isNot':
              return Array.isArray(filterValue) ? !filterValue.includes(fieldValue) : fieldValue !== filterValue;
            case 'isAny':
              return Array.isArray(filterValue) ? filterValue.includes(fieldValue) : fieldValue === filterValue;
            case 'isNone':
              return Array.isArray(filterValue) ? !filterValue.includes(fieldValue) : fieldValue !== filterValue;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (view.sort?.field) {
      const { field, direction } = view.sort;
      const sortField = fields.find(f => f.id === field);
      
      filteredData.sort((a, b) => {
        let aValue, bValue;
        
        if (sortField && sortField.getValue) {
          aValue = sortField.getValue({ item: a });
          bValue = sortField.getValue({ item: b });
        } else {
          aValue = a[field];
          bValue = b[field];
        }
        
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Calculate pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / view.perPage);
    const startIndex = (view.page - 1) * view.perPage;
    const endIndex = startIndex + view.perPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      fullData: filteredData,
      totalItems,
      totalPages
    };
  }, [view]);

  // Update view with groupByField when toggling grouped view
  const activeView = useMemo(() => {
    if (isGroupedView) {
      return {
        ...view,
        groupByField: 'category'
      };
    }
    const { groupByField, ...restView } = view;
    return restView;
  }, [view, isGroupedView]);

  // Infinite scroll handler
  const currentPage = view.page || 1;
  const hasMoreData = currentPage < data.totalPages;
  
  const infiniteScrollHandler = useCallback(() => {
    if (isLoadingMore || currentPage >= data.totalPages) {
      return;
    }

    setIsLoadingMore(true);
    setView({
      ...view,
      page: currentPage + 1,
    });

  }, [isLoadingMore, currentPage, data.totalPages, view]);

  // Initialize data on first load or when view changes significantly
  useEffect(() => {
    if ( currentPage === 1 || ! view.infiniteScrollEnabled ) {
      // First page or pagination mode - use appropriate data
      setAllLoadedRecords(data.data);
    } else {
      // Subsequent pages - append to existing data
      setAllLoadedRecords((prev) => {
        const existingIds = new Set(prev.map(item => item.id));
        const newRecords = data.data.filter(
          (record) => !existingIds.has(record.id)
        );
        return [...prev, ...newRecords];
      });
    }
    setIsLoadingMore(false);
  }, [view.search, view.filters, view.perPage, view.sort, currentPage, view.infiniteScrollEnabled, data.data]);

  const paginationInfo = {
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    infiniteScrollHandler,
  };

  const actions = [
    {
      id: 'view',
      label: 'View',
      isPrimary: true,
      callback: (items) => {
        if (items.length > 0) {
          setSelectedItem(items[0]);
          setIsModalOpen(true);
        }
      }
    },
    {
      id: 'delete',
      label: 'Delete',
      isDestructive: true,
      callback: (items) => {
        alert(`Would delete ${items.length} item(s)`);
      }
    }
  ];

  return (
    <div>
      <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Team Members</h1>
        <Button
          variant='secondary'
          onClick={() => setIsGroupedView(!isGroupedView)}
        >
          {isGroupedView ? 'Ungroup' : 'Group by Category'}
        </Button>
      </div>
      <div>
        <p style={{ margin: 0 }}>This is a demo of the WordPress DataViews component displaying a list of team members.</p>
      </div>
      </header>

      <DataViews
        data={allLoadedRecords}
        fields={fields}
        view={activeView}
        onChangeView={setView}
        selection={selection}
        onChangeSelection={setSelection}
        actions={actions}
        paginationInfo={paginationInfo}
        getItemId={(item) => item.id}
        isLoading={isLoadingMore}
        defaultLayouts={{
            grid: {
                showMedia: true,
            },
            table: {
                showMedia: true,
            }
        }}
      />

      {isModalOpen && selectedItem && (
        <Modal
          title={selectedItem.name}
          onRequestClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          size="large"
        >
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '1rem' }}>
              <img
                src={`/${selectedItem.path}`}
                alt={selectedItem.name}
                style={{ maxWidth: '100%', maxHeight: '60vh', height: 'auto', width: 'auto', borderRadius: '4px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p><strong>Category:</strong> {selectedItem.category}</p>
              <p><strong>Type:</strong> {selectedItem.type}</p>
              <p><strong>Medium:</strong> {selectedItem.medium}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DataViewsComponent;