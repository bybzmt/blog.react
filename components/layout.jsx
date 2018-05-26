

export default (props)=>(
  <div>
  <header>
        <div class="widewrapper masthead">
            <div class="container">
                <a href="/" id="logo">
                    <img src="/static/img/logo.png" alt="clean Blog" />
                </a>

                <div id="mobile-nav-toggle" class="pull-right">
                    <a href="/" data-toggle="collapse" data-target=".clean-nav .navbar-collapse">
                        <i class="fa fa-bars"></i>
                    </a>
                </div>

                <nav class="pull-right clean-nav">
                    <div class="collapse navbar-collapse">
                        <ul class="nav nav-pills navbar-nav">
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

        <div class="widewrapper subheader">
            <div class="container">
                <div class="clean-breadcrumb">
                      <a href="/">Blog</a>
                </div>

                <div class="clean-searchbox">
                    <form action="/search" method="get" accept-charset="utf-8">
                        <input class="searchfield" id="searchbox" type="text" placeholder="Search" />
                        <button class="searchbutton" type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </header>

  {props.children}

    <footer>
        <div class="widewrapper footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 footer-widget">
                       <h3> <i class="fa fa-user"></i><a href="/about">About</a></h3>

                       <p>这里是关关关于于</p>
                       <p>这里是关关关于于</p>
                    </div>

                    <div class="col-md-4 footer-widget">
                        <h3> <i class="fa fa-pencil"></i> Recent Post</h3>
                        <ul class="clean-list">
                            <li><a href="">Clean - Responsive HTML5 Template</a></li>
                            <li><a href="">Responsive Pricing Table</a></li>
                        </ul>
                    </div>

                    <div class="col-md-4 footer-widget">
                        <h3> <i class="fa fa-envelope"></i><a href="/contact">Contact Me</a></h3>

                        <p>联系我.</p>
                        <p>联系我.</p>
                         <div class="footer-widget-icon">
                            <i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-google"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="widewrapper copyright">
                Copyright 2017
        </div>
    </footer>
  </div>
)
