

export default (props)=>(
  <div>
    <header>
      <div className="widewrapper masthead">
        <div className="container">
          <a href="/" id="logo">
            <img src="/static/img/logo.png" alt="clean Blog" />
          </a>

          <div id="mobile-nav-toggle" className="pull-right">
            <a href="/" data-toggle="collapse" data-target=".clean-nav .navbar-collapse">
              <i className="fa fa-bars"></i>
            </a>
          </div>

          <nav className="pull-right clean-nav">
            <div className="collapse navbar-collapse">
              <ul className="nav nav-pills navbar-nav">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/hello">About</a>
                </li>
                <li>
                  <a href="/user">User</a>
                </li>
              </ul>
            </div>
          </nav>

        </div>
      </div>

      <div className="widewrapper subheader">
        <div className="container">
          <div className="clean-breadcrumb">
            <a href="/">Blog</a>
          </div>

          <div className="clean-searchbox">
            <form action="/search" method="get" acceptCharset="utf-8">
              <input className="searchfield" id="searchbox" type="text" placeholder="Search" />
              <button className="searchbutton" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>

    {props.children}

    <footer>
      <div className="widewrapper footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-widget">
              <h3> <i className="fa fa-user"></i><a href="/about">About</a></h3>

              <p>这里是关关关于于</p>
              <p>这里是关关关于于</p>
            </div>

            <div className="col-md-4 footer-widget">
              <h3> <i className="fa fa-pencil"></i> Recent Post</h3>
              <ul className="clean-list">
                <li><a href="">Clean - Responsive HTML5 Template</a></li>
                <li><a href="">Responsive Pricing Table</a></li>
              </ul>
            </div>

            <div className="col-md-4 footer-widget">
              <h3> <i className="fa fa-envelope"></i><a href="/contact">Contact Me</a></h3>

              <p>联系我.</p>
              <p>联系我.</p>
              <div className="footer-widget-icon">
                <i className="fa fa-facebook"></i><i className="fa fa-twitter"></i><i className="fa fa-google"></i>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="widewrapper copyright">
        Copyright 2017
      </div>
    </footer>
  </div>
)
