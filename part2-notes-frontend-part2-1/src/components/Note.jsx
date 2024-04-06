const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      Your awesome note: {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
