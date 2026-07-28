export async function getAllNotes(req,res){
  res.status(200).json({message:"you just fetched notes"});
}

export async function createNote(req,res){
  res.status(201).json({message:"note created successfully"});
}

export async function updateNote(req,res){
  res.status(200).json({message:"note updated successfully"});
}

export async function deleteNote(req,res){
  res.status(200).json({message:"note deleted successfully"});
}