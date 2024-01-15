import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Create } from './components/Create';
import { Update } from './components/Update';
import { Read } from './components/Read';
import { Menu, MenuItem } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

function App() {
  let urlPath = document.location.href;
  const [activeItem, setActiveItem] = useState('create');
  // if(urlPath.split('/')[3] === 'read') setActiveItem('read');

  useEffect(() => {
    if(urlPath.split('/')[3] === 'read') setActiveItem('read');
  }, [urlPath])

  const handleItemClick = ( name ) => setActiveItem(name);

  // console.log(urlPath.split('/')[3])
  return (
    <>
    <div style={{background: 'green'}}>
    <Menu tabular color='teal'>
        <Link to = '/'>
        <MenuItem
          name='create'
          active={activeItem === 'create'}
          onClick = {() => handleItemClick('create')}
          style={{color: 'yellow'}}
        />
        </Link>
        <Link to = '/read'>
        <MenuItem
          name='read'
          active={activeItem === 'read'}
          onClick = {() => handleItemClick('read')}
          style={{color: 'yellow'}}
        />
        </Link>
      </Menu>
    </div>
    <div className="main">
      
      <div className="content">
        <h2 className="main-header">React Crud Operations</h2>
        <div>
          <Routes>
            <Route path="/" element={<Create />} />
            <Route path="/read" element={<Read />} />
            <Route path="/update" element={<Update />} />
          </Routes>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
