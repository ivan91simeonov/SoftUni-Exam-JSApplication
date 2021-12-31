import { getAllAlbums } from "../api/data.js";
import { html } from "../lib.js";


const catalogT = item => html`<section id="catalogPage">
<h1>All Albums</h1>


${item.length == 0?html`<p>No Albums in Catalog!</p>`:item.map(itemT)
}


<!--No albums in catalog-->


</section>`;

const itemT = song => html`<div class="card-box">
<img src=${song.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${song.name}</p>
        <p class="artist">Artist: ${song.artist}</p>
        <p class="genre">Genre: ${song.genre}</p>
        <p class="price">Price:$${song.price}</p>
        <p class="date">Release Date: ${song.releaseDate}</p>
    </div>
    <div class="btn-group">
        <a href="/details/${song._id}" id="details">Details</a>
    </div>
</div>
</div>`


const userData = JSON.parse(sessionStorage.getItem('userData'));

export async function catalogPage(ctx) {
    
    const item = await getAllAlbums();

    ctx.render(catalogT(item))
}