import React from 'react';

const Footer = () => (
  <footer className="footer bg-green-400">
    <div className="strips flex list-none space-x-4 justify-evenly p-4 font-light">
      {[
        { title: 'Menu', items: ['Home', 'Calculator', 'About Us', 'Contact Us'] },
        { title: 'Social Media', items: ['Instagram', 'Twitter', 'Facebook', 'Reddit'] },
        { title: 'Miscellaneous', items: ['Events', 'Gallery', 'Recognition', 'Donate Us'] }
      ].map(({ title, items }) => (
        <div key={title} className="space-y-2">
          <h1 className="stripItemTitle font-semibold">{title}</h1>
          {items.map(item => (
            <li key={item} className="stripItem hover:text-white hover:cursor-pointer">{item}</li>
          ))}
        </div>
      ))}
    </div>
    <div className="copyright flex font-light justify-center">
      &copy; 2024
    </div>
  </footer>
);

export default Footer;
