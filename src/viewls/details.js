import { deleteSong, detailsSong } from "../api/data.js";
import { html } from "../lib.js";

const detailsT = (song , isOwner , onDelete) => html`<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src=${song.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${song.name}</h1>
            <h3>Artist: ${song.artis}</h3>
            <h4>Genre: ${song.genre}</h4>
            <h4>Price: $${song.price}</h4>
            <h4>Date: ${song.releaseDate}</h4>
            <p>${song.description}</p>
        </div>

        ${isOwner ? html`<div class="actionBtn">
            <a href="/edit/${song._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>`: ''}

    </div>
</div>
</section>`;


export async function detailsPage (ctx) {
    const song = await detailsSong(ctx.params.id);

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const isOwner = userData && userData.id == song._ownerId

    ctx.render(detailsT(song , isOwner , onDelete))

    async function onDelete (){
        const choise = confirm('Are you sure wont delete that song')
        if(choise){
            await deleteSong(ctx.params.id);
            ctx.page.redirect('/catalog')
        }
    }
}