import { editSong, getById  } from "../api/data.js";
import { html } from "../lib.js";

const editT = ( song, onSubmit) => html`<section class="editPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" class="name" type="text" .value=${song.name}>

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${song.imgUrl}>

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" class="price" type="text" .value=${song.price}>

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${song.releaseDate}>

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" class="artist" type="text" .value=${song.artist}>

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" class="genre" type="text" .value=${song.genre}>

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" rows="10"
                cols="10" .value=${song.description}></textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>`;


export async function editPage (ctx) {

    const item = await getById(ctx.params.id)
    ctx.render(editT(item , onSubmit))

    async function onSubmit(e){
        e.preventDefault();
        

        const formData = new FormData(e.target);

        const name = formData.get('name').trim();
        const imgUrl = formData.get('imgUrl').trim();
        const price = formData.get('price').trim;
        const releaseDate = formData.get('releaseDate').trim();
        const genre = formData.get('genre').trim();
        const artist = formData.get('artist').trim();
        const description = formData.get('description').trim();

        if(name == '' || imgUrl =='' || price=='' || releaseDate==''|| genre == '' || artist == '' || description==''){
            return alert('All fields are require');
        }

        await editSong(ctx.params.id , {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        });

        ctx.page.redirect(`/details/${item._id}`)
    }
} 