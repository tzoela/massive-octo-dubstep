var defaultMenu = {
    menuItems: [
    {uid: 'home', label: 'Home'},
    {uid: 'gifwhes', label: 'GifWhes'},
    {uid: 'gishwhes', label: 'GISHWHES'},
    {uid: 'showcase', label: 'Tumblr Showcase'},
    {uid: 'about', label: 'About'},
    ]
};

function loginMenu() {
  var menu = {
    menuItems: defaultMenu.menuItems.slice()
  }
  menu.menuItems.push({uid: 'login', label: 'Login', type: 'Login'});
  return menu;
}

function profileMenu(user) {
  var menu = {
    menuItems: defaultMenu.menuItems.slice()
  }
  menu.menuItems.push({uid: 'profile', label: user.local.username});
  menu.menuItems.push({uid: 'list', label: 'List'});
  return menu;
}

module.exports = function(app) {
  app.get('/navigation', function(req, res) {

    if(req.isAuthenticated()) {
      res.json(profileMenu(req.user));
    } else {
      res.json(loginMenu());
    }

  });
}
