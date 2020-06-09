<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Paperback</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/paperback.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container mt-3">
        <div class="row header">
          <div class="col">
            <nav class="paperback-navbar navbar navbar-expand-lg navbar-dark bg-dark">
              <a class="navbar-brand" href="#">
                <img src="{{ asset('storage/logo.png') }}" class="logo"/>
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="navbar-icon" data-feather="book"></i>
                        Comics
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="navbar-icon" data-feather="plus"></i>
                        Add Comic
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="navbar-icon" data-feather="clock"></i>
                        Activity
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="navbar-icon" data-feather="alert-triangle"></i>
                        Wanted
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="navbar-icon" data-feather="settings"></i>
                        Settings
                    </a>
                  </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <div class="input-group">
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-light" type="button">
                                <i class="search-button" data-feather="search"></i>
                            </button>
                        </div>
                    </div>
                </form>
              </div>
            </nav>
          </div>
        </div>
    </div>
    <div class="page container bg-light rounded-lg py-3 mt-2">
        <div class="row mb-5">
            <div class="col-12">
                <form>
                    <div class="input-group">
                        <input class="form-control" type="search" placeholder="Search for a Comic series" aria-label="Search">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-secondary" type="button">
                                <i class="search-button" data-feather="search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div id="comic-list"> 
                    <div class="comic-list-item">
                        <div class="row">
                            <div class="col-md-2 col-sm-3">
                                <img class="cover-image" src="{{ asset('/storage/covers/7506.jpg') }}">
                            </div>
                            <div class="col-md-10 col-sm-9">
                                <div class="row">
                                    <div class="col-12">
                                        <span class="h2">Planetary (1999)
                                        </span>
                                        <span class="comic-issues badge badge-primary">16 issues</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                    <div class="collapse-content collapse" id="collapseSummary">
                                    <p>Planetary is a comic book written by <a href="https://comicvine.gamespot.com/warren-ellis/4040-40893/" data-ref-id="4040-40893">Warren Ellis</a>, drawn by <a href="https://comicvine.gamespot.com/john-cassaday/4040-1816/" data-ref-id="4040-1816">John Cassaday</a> and colored by <a href="https://comicvine.gamespot.com/laura-martin/4040-1817/" data-ref-id="4040-1817">Laura Martin</a>. Published by the <a href="https://comicvine.gamespot.com/wildstorm/4010-708/" data-ref-id="4010-708">Wildstorm</a> imprint of <a href="https://comicvine.gamespot.com/dc-comics/4010-10/" data-ref-id="4010-10">DC Comics</a>, it was originally supposed to run for 24 issues but instead concluded with the 27th issue.</p><p>The story centers on three characters, the protagonist <a href="https://comicvine.gamespot.com/elijah-snow/4005-1819/" data-ref-id="4005-1819">Elijah Snow</a> and his two teammates, <a href="https://comicvine.gamespot.com/jakita-wagner/4005-6010/" data-ref-id="4005-6010">Jakita Wagner</a> and a man only known as <a href="https://comicvine.gamespot.com/the-drummer/4005-17584/" data-ref-id="4005-17584">The Drummer</a>, who are part of an organization responsible for discovering the secret history of the world.</p><p><b>One Shots</b></p><ul><li><a href="https://comicvine.gamespot.com/planetarythe-authority-ruling-the-world/4050-18025/" data-ref-id="4050-18025">Planetary/The Authority: Ruling the World</a></li><li><a href="https://comicvine.gamespot.com/planetaryjla-terra-occulta/4050-18028/" data-ref-id="4050-18028">Planetary/JLA: Terra Occulta</a></li><li><a href="https://comicvine.gamespot.com/planetarybatman-night-on-earth/4050-18026/" data-ref-id="4050-18026">Planetary/Batman: Night On Earth</a></li><li><a href="https://comicvine.gamespot.com/batmanplanetary-deluxe-edition/4050-52270/" data-ref-id="4050-52270">Batman/Planetary: Deluxe Edition</a></li></ul><h3>Collected Editions</h3><h4>Trade Paperbacks</h4><ul><li>Vol. 1: <a href="https://comicvine.gamespot.com/planetary-all-over-the-world-and-other-stories/4050-44050/" data-ref-id="4050-44050">All Over the World and Other Stories</a> (#1-6 and the preview)</li><li><a href="https://comicvine.gamespot.com/planetary-1-book-one/4000-608785/" data-ref-id="4000-608785">Planetary Book One</a> (#1-14)</li><li>Vol. 2: <a href="https://comicvine.gamespot.com/planetary-the-fourth-man/4050-44052/" data-ref-id="4050-44052">The Fourth Man</a> (#7-12)</li><li>Vol. 3: <a href="https://comicvine.gamespot.com/planetary-leaving-the-20th-century/4050-44051/" data-ref-id="4050-44051">Leaving the 20th Century</a> (#13-18)</li><li><a href="https://comicvine.gamespot.com/planetary-2-book-two/4000-663557/" data-ref-id="4000-663557">Planetary Book Two</a> (#15-27)</li><li>Vol. 4: <a href="https://comicvine.gamespot.com/planetary-spacetime-archaeology/4050-44053/" data-ref-id="4050-44053">Spacetime Archaeology</a> (#19-27)</li><li><a href="https://comicvine.gamespot.com/planetary-crossing-worlds/4050-34884/" data-ref-id="4050-34884">Crossing Worlds</a> (Ruling the World, Terra Occulta and Night On Earth)</li><li><a href="https://comicvine.gamespot.com/wildstorm-presents-planetary-lost-worlds/4050-37407/" data-ref-id="4050-37407">Wildstorm Presents Planetary: Lost Worlds</a> (Ruling the World, Terra Occulta)</li></ul><h4>Absolute Editions</h4><p><a href="https://comicvine.gamespot.com/absolute-planetary/4050-34459/" data-ref-id="4050-34459">Absolute Planetary</a></p><ul><li><a href="https://www.comicvine.com/absolute-planetary-1-vol-1/4000-224923/" data-ref-id="4000-224923">Vol. 1: </a>#1-12</li><li><a href="https://www.comicvine.com/absolute-planetary-2-vol-2/4000-224924/" data-ref-id="4000-224924">Vol. 2:</a> #13-27</li></ul><h4>Omnibus</h4><ul><li><a href="https://www.comicvine.com/planetary-omnibus/4050-71101/" data-ref-id="4050-71101">Planetary Omnibus</a></li></ul>
                                    </p>
                                    </div>
                                    <a href="#collapseSummary" class="collapsed read-more-toggle" data-toggle="collapse" data-target="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary">
                                    <div class="separator"><span class="separator-text"></span></div>
                                    </a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>

