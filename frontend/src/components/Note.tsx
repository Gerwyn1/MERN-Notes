import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
  className,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated at ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Updated at ${formatDate(createdAt)}`;
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={`${styleUtils.flexCenter}`}>
          {title}
          {
            <MdDelete
              className="text-muted ms-auto"
              onClick={(e) => {
                onDeleteNoteClicked(note);
                e.stopPropagation();
              }}
            />
          }
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
