import { render , page} from './lib.js'
import * as api from './api/data.js'
import { homePage } from './viewls/home.js';
import { catalogPage } from './viewls/catalog.js';
import { loginPage } from './viewls/login.js';
import { registerPAge } from './viewls/register.js';
import { logout } from './api/api.js';
import { createPage } from './viewls/create.js';
import { detailsPage } from './viewls/details.js';
import { editPage } from './viewls/edit.js';

window.api = api

const main = document.getElementById('main-content')
document.getElementById('logoutBtn').addEventListener('click' , onLogout)

page(decorateContex);
page('/' , homePage);
page('/catalog' , catalogPage);
page('/login' , loginPage);
page('/register' , registerPAge);
page('/create' , createPage);
page('/details/:id' , detailsPage );
page('/edit/:id'  , editPage);

onNavigation ()
page.start()


function decorateContex (ctx , next) {
    ctx.render = template => render (template , main )
    ctx.navigation = onNavigation 
    next()
}

function onNavigation () {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    }else{
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}

async function onLogout(){
    await logout();
    onNavigation ()
    page.redirect('/')
}