import React from 'react';




class Footer extends React.Component {
  render() {
    return(
      <body class="d-flex flex-column min-vh-100">
    <div class="wrapper flex-grow-1"></div>
      <footer class=" page-footer font-small blue">
      <div class="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://github.com/Shnix"> Alexey Krayukhin</a>
      </div>
    </footer>
</body>
    );
}
}

export default Footer;