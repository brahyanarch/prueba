import NoteForm from "@/components/NoteForm";

async function loadNotes(){
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json()
  return data;
}

async function Homepage(){
  const notes = await loadNotes();
  console.log(notes);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>

      <NoteForm/>
      {notes.map((note) => (
        <div key={note.id} className="bg-slate-400 p-4 m-2">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          </div>
      ))}
      </div>

      <p className="text-white">David</p>
    </div>

  );



}



export default Homepage