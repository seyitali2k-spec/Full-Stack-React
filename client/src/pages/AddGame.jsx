import { useState } from "react";
import axios from "axios";
import "./AddGame.css";

export default function AddGame() {
const [title, setTitle] = useState("");
const [platform, setPlatform] = useState("");
const [status, setStatus] = useState("Backlog");
const [rating, setRating] = useState("");
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);

function handleDrop(e) {
e.preventDefault();
const file = e.dataTransfer.files[0];
handleFile(file);
}

function handleFile(file) {
if (!file) return;

const reader = new FileReader();
reader.onloadend = () => {
setPreview(reader.result);
setImage(reader.result); 
};
reader.readAsDataURL(file);
}

function handleSubmit(e) {
e.preventDefault();

axios.post("http://localhost:5000/games", {
title,
platform,
status,
rating,
image,
});

setTitle("");
setPlatform("");
setStatus("Backlog");
setRating("");
setImage(null);
setPreview(null);
}

return (
<div className="add-container">
<h2>Add Game</h2>

<form onSubmit={handleSubmit} className="add-form">
<input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>
<input
placeholder="Platform"
value={platform}
onChange={(e) => setPlatform(e.target.value)}
/>
<select value={status} onChange={(e) => setStatus(e.target.value)}>
<option>Backlog</option>
<option>Playing</option>
<option>Completed</option>
</select>
<input
type="number"
placeholder="Rating"
value={rating}
onChange={(e) => setRating(e.target.value)}
/>
<div
className="drop-zone"
onDragOver={(e) => e.preventDefault()}
onDrop={handleDrop}
>
{preview ? (
<img src={preview} alt="preview" />
) : (
<p>Drag & Drop Cover Image</p>
)}
</div>

<button>Add Game</button>
</form>
</div>
  );
}