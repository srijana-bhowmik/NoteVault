// Function to create a new note
async function createNote(){
    const API_URL='http://localhost:3000/notes';
    const title=document.getElementById('title').value;
    const content=document.getElementById('content').value; 

    if(title === ""){ 
        document.getElementById('msg').innerText="You must enter title!"; 
        return;
    }

    try{
        const res=await fetch(API_URL, {
            method: 'POST',                         
            headers:{
                'Content-Type': 'application/json'                 
            },
            body:JSON.stringify({title:title, content:content})    
        })

        if(res.ok){         
            document.getElementById('msg').innerText="Note created successfully!";
            setTimeout(()=>{
                window.location.href="view-notes.html";
            },1000);
        }
        else{
            document.getElementById('msg').innerText="Error creating note. Please try again.";
        }
    }
    catch(err){
        console.error('Error:', err);
        document.getElementById('msg').innerText="Server Error. Please try again.";
    }
}


if(document.getElementById("notes-list")){
    loadnotes();
}

// Function to load and display all notes
async function loadnotes(){
    const API_URL='http://localhost:3000/notes';
    const noteslist=document.getElementById('notes-list');
    try{
        const res=await fetch(API_URL,{method:'GET'});                 
        const all_notes=await res.json();                

        for(let i=0;i<all_notes.length;i++){
            const note=all_notes[i];
            const li=document.createElement('li');
            li.innerHTML=`
                <h3>${note.title}</h3>  
                <p>${note.content}</p>
                <div id=buttons>
                <button id="edit" onclick="goToEditNote('${note.id}')">Edit</button>
                <button id="delete" onclick="deletenote('${note.id}')">Delete</button>
                </div>
            `;

            noteslist.appendChild(li);
        }
    }
    catch(err){
        console.error('Error:', err);
    }
}


// Function to delete a note
async function deletenote(id){
    const API_URL=`http://localhost:3000/notes/${id}`;
    try{
        const confirm=window.confirm("Are you sure you want to delete this note?");
        if(!confirm){
            return;
        }
        const res=await fetch(API_URL,{
            method:'DELETE'
        });
        if(res.ok){ 
            alert("Note deleted successfully!"); 
            window.location.reload();
        }else{
            alert("Error deleting note. Please try again.");
        }
    }
    catch(err){
        console.error('Error:', err);
    }
}

async function back(){
    window.location.href="view-notes.html";
}



// Function to edit a note
function goToEditNote(id){
    window.location.href=`edit-notes.html?id=${id}`;
}
const urlparam = new URLSearchParams(window.location.search);
const noteid = urlparam.get('id');

if(noteid){
    loadNoteForEdit(noteid);
}

async function loadNoteForEdit(noteid){
    const API_URL = `http://localhost:3000/notes/${noteid}`;
    const res = await fetch(API_URL, { method: 'GET' });
    const note = await res.json();

    document.getElementById('title').value = note.title;
    document.getElementById('content').value = note.content;
}

async function updatenote(){
        const title=document.getElementById('title').value;
        const content=document.getElementById('content').value;

        if(title===""){
            document.getElementById('msg').innerText="Title cannot be empty!";
            return;
        }
        try{
            const API_URL=`http://localhost:3000/notes/${noteid}`;  
            const res=await fetch(API_URL,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({title:title,content:content})
            })
            if(res.ok){
                document.getElementById('msg').innerText="Note edited successfully!";
                setTimeout(()=>{
                    window.location.href="view-notes.html";
                },1000);
            }
            else{
                document.getElementById('msg').innerText="Note could not be found. Please try again.";
            }
        }catch(err){
            console.error('Error:', err);
        }
}
