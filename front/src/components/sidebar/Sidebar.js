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
        height: '60px',
        backgroundColor:'orange'
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
        height: 'auto',
        backgroundColor:'yellow',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
      }}
    >
      {children}
    </div>
  );
};

export { SidebarContainer,SidebarTop,SidebarList };
