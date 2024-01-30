import React from 'react';

const SidebarContainer = ({ children }) => {
  // React.Children.map is used to iterate over children
  const renderChildren = React.Children.map(children, (child) => {
    // Check if the child is B or C
    if (child.type === SidebarList || child.type === SidebarTop) {
      // Clone the child and add any additional props or styles
      return React.cloneElement(child, {
        style: {
          // Add your custom styles here
          ...child.props.style,
        },
        // Add any additional props as needed
      });
    }
    // If the child is not B or C, render it as is
    return child;
  });

  return <div>{renderChildren}</div>;
};



const SidebarTop = ({ children }) => {
  return (
    <div
        style={{
        width: '100%',
        height: '80px',
        paddingBottom:'15px',
        backgroundColor:'#DEF4F2',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      {children}
    </div>
  );
};

const SidebarList = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        height:'70vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        overflowY:'scroll'
      }}
    >
      {children}
    </div>
  );
};

export { SidebarContainer,SidebarTop,SidebarList };


//Back up code

/* import React from 'react';

const SidebarContainer = ({ children }) => {
  // React.Children.map is used to iterate over children
  const renderChildren = React.Children.map(children, (child) => {
    // Check if the child is B or C
    if (child.type === SidebarList || child.type === SidebarTop) {
      // Clone the child and add any additional props or styles
      return React.cloneElement(child, {
        style: {
          // Add your custom styles here
          ...child.props.style,
        },
        // Add any additional props as needed
      });
    }
    // If the child is not B or C, render it as is
    return child;
  });

  return <div>{renderChildren}</div>;
};



const SidebarTop = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '60px'
      }}
    >
      {children}
    </div>
  );
};

const SidebarList = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        height:'75vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'orange',
        overflowY:'scroll'
      }}
    >
      {children}
    </div>
  );
};

export { SidebarContainer,SidebarTop,SidebarList };
 */
